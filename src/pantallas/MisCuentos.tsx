import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listarCuentos, eliminarCuento } from '../lib/almacenamiento'
import { personajes } from '../data/personajes'
import { lugares } from '../data/lugares'
import { situaciones } from '../data/situaciones'
import { generarCuento } from '../lib/generadorCuento'
import { BotonPrincipal } from '../components/BotonPrincipal'
import { CuentoDisplay } from '../components/CuentoDisplay'
import type { CuentoGuardado } from '../tipos'
import css from './MisCuentos.module.css'

function nombrePersonaje(id: string) {
  return personajes.find(p => p.id === id)?.nombre ?? id
}
function nombreLugar(id: string) {
  return lugares.find(l => l.id === id)?.nombre ?? id
}
function fechaCorta(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric' })
}

function reconstruirCuento(guardado: CuentoGuardado) {
  const personaje = personajes.find(p => p.id === guardado.personajeId)
  const lugar = lugares.find(l => l.id === guardado.lugarId)
  const situacion = situaciones.find(s => s.id === guardado.situacionId)
  if (!personaje || !lugar || !situacion) return null
  return { personaje, cuento: generarCuento(personaje, lugar, situacion) }
}

export function MisCuentos() {
  const navegar = useNavigate()
  const [cuentos, setCuentos] = useState<CuentoGuardado[]>([])
  const [seleccionado, setSeleccionado] = useState<CuentoGuardado | null>(null)

  useEffect(() => {
    setCuentos(listarCuentos())
  }, [])

  const eliminar = (id: string) => {
    if (!confirm('¿Eliminar este cuento?')) return
    eliminarCuento(id)
    setCuentos(listarCuentos())
    if (seleccionado?.id === id) setSeleccionado(null)
  }

  return (
    <div className={css.contenedor}>
      <div className={css.header}>
        <button className={css.volver} onClick={() => seleccionado ? setSeleccionado(null) : navegar('/menu')}>
          ← Atrás
        </button>
        <h1 className={css.titulo}>Mis Cuentos</h1>
      </div>

      {seleccionado ? (
        (() => {
          const recon = reconstruirCuento(seleccionado)
          if (!recon) return <p>No se pudo reconstruir el cuento.</p>
          return (
            <div className={css.detalle}>
              <CuentoDisplay personaje={recon.personaje} cuento={recon.cuento} autoIniciarNarrador />
              <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <BotonPrincipal variante="secundario" onClick={() => setSeleccionado(null)}>← Volver a la lista</BotonPrincipal>
              </div>
            </div>
          )
        })()
      ) : cuentos.length === 0 ? (
        <div className={css.vacio}>
          <div className={css.vacioIcono}>📖</div>
          <p>Aún no has creado cuentos.</p>
          <div style={{ marginTop: 16 }}>
            <BotonPrincipal onClick={() => navegar('/crear')}>¡Crear mi primer cuento!</BotonPrincipal>
          </div>
        </div>
      ) : (
        <div className={css.lista}>
          {cuentos.map(c => (
            <div
              key={c.id}
              className={css.item}
              onClick={() => setSeleccionado(c)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setSeleccionado(c)}
            >
              <span style={{ fontSize: 32 }} aria-hidden>📖</span>
              <span>
                <div className={css.itemTitulo}>
                  {nombrePersonaje(c.personajeId)} en {nombreLugar(c.lugarId)}
                </div>
                <div className={css.itemFecha}>{fechaCorta(c.fecha)}</div>
              </span>
              <button
                className={css.eliminar}
                onClick={e => { e.stopPropagation(); eliminar(c.id) }}
                aria-label="Eliminar cuento"
              >🗑</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
