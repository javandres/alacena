import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { personajes } from '../data/personajes'
import { lugares } from '../data/lugares'
import { situaciones } from '../data/situaciones'
import { generarCuento } from '../lib/generadorCuento'
import type { CuentoGenerado } from '../lib/generadorCuento'
import { guardarCuento } from '../lib/almacenamiento'
import { PasosCuento } from '../components/PasosCuento'
import { Tarjeta } from '../components/Tarjeta'
import { BotonPrincipal } from '../components/BotonPrincipal'
import { ModalPremium } from '../components/ModalPremium'
import { CuentoDisplay } from '../components/CuentoDisplay'
import type { Personaje, Lugar, Situacion } from '../tipos'
import css from './CrearCuento.module.css'

type Paso = 1 | 2 | 3 | 4

export function CrearCuento() {
  const navegar = useNavigate()
  const [paso, setPaso] = useState<Paso>(1)
  const [personaje, setPersonaje] = useState<Personaje | null>(null)
  const [lugar, setLugar] = useState<Lugar | null>(null)
  const [situacion, setSituacion] = useState<Situacion | null>(null)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [itemBloqueado, setItemBloqueado] = useState('')
  const [cuento, setCuento] = useState<CuentoGenerado | null>(null)
  const [cargandoCuento, setCargandoCuento] = useState(false)
  const [guardado, setGuardado] = useState(false)

  const abrirModal = (nombre: string) => {
    setItemBloqueado(nombre)
    setModalAbierto(true)
  }

  const elegirPersonaje = (p: Personaje) => {
    if (p.premium) return abrirModal(p.nombre)
    setPersonaje(p)
    setPaso(2)
  }

  const elegirLugar = (l: Lugar) => {
    if (l.premium) return abrirModal(l.nombre)
    setLugar(l)
    setPaso(3)
  }

  const elegirSituacion = async (s: Situacion) => {
    if (s.premium) return abrirModal(s.titulo)
    setSituacion(s)
    setCargandoCuento(true)
    setPaso(4)
    await new Promise(r => setTimeout(r, 900))
    setCuento(generarCuento(personaje!, lugar!, s))
    setCargandoCuento(false)
  }

  const guardar = () => {
    if (!personaje || !lugar || !situacion || !cuento) return
    guardarCuento({
      personajeId: personaje.id,
      lugarId: lugar.id,
      situacionId: situacion.id,
      texto: cuento.texto,
    })
    setGuardado(true)
  }

  const reiniciar = () => {
    setPersonaje(null); setLugar(null); setSituacion(null)
    setCuento(null); setGuardado(false); setPaso(1)
  }

  const volverAtras = () => {
    if (paso === 1) return navegar('/menu')
    if (paso === 4) return reiniciar()
    setPaso((paso - 1) as Paso)
  }

  return (
    <div className={css.contenedor}>
      <div className={css.header}>
        <button className={css.volver} onClick={volverAtras} aria-label="Volver">
          ← Atrás
        </button>
        <PasosCuento pasoActual={paso} />
        <span style={{ width: 64 }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={paso}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          {paso === 1 && (
            <>
              <h2 className={css.titulo}>Elige tu protagonista</h2>
              <div className={css.grid}>
                {personajes.map(p => (
                  <Tarjeta
                    key={p.id}
                    titulo={p.nombre}
                    subtitulo={p.arquetipo}
                    imagen={p.poses.inicio}
                    bloqueada={p.premium}
                    onClick={() => elegirPersonaje(p)}
                  />
                ))}
              </div>
            </>
          )}

          {paso === 2 && (
            <>
              <h2 className={css.titulo}>¿Dónde transcurre la historia?</h2>
              <div className={css.grid}>
                {lugares.map(l => (
                  <Tarjeta
                    key={l.id}
                    titulo={l.nombre}
                    imagen={l.imagen}
                    bloqueada={l.premium}
                    onClick={() => elegirLugar(l)}
                  />
                ))}
              </div>
            </>
          )}

          {paso === 3 && (
            <>
              <h2 className={css.titulo}>¿Qué le pasa a {personaje?.nombre}?</h2>
              <div className={css.grid}>
                {situaciones.map(s => (
                  <Tarjeta
                    key={s.id}
                    titulo={s.titulo}
                    icono="✨"
                    bloqueada={s.premium}
                    onClick={() => elegirSituacion(s)}
                  />
                ))}
              </div>
            </>
          )}

          {paso === 4 && (
            cargandoCuento ? (
              <div className={css.cargando}>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
                >🌀</motion.span>
              </div>
            ) : cuento ? (
              <>
                <h2 className={css.titulo}>Tu cuento</h2>
                <CuentoDisplay personaje={personaje!} cuento={cuento} autoIniciarNarrador />
                <div className={css.controles}>
                  <BotonPrincipal variante="secundario" onClick={() => navegar('/menu')}>
                    🏠 Menú
                  </BotonPrincipal>
                  <BotonPrincipal variante="secundario" onClick={guardar} disabled={guardado}>
                    {guardado ? '✓ Guardado' : '💾 Guardar'}
                  </BotonPrincipal>
                  <BotonPrincipal onClick={reiniciar}>✨ Crear otro</BotonPrincipal>
                </div>
              </>
            ) : null
          )}
        </motion.div>
      </AnimatePresence>

      <ModalPremium
        abierto={modalAbierto}
        nombreItem={itemBloqueado}
        onCerrar={() => setModalAbierto(false)}
      />
    </div>
  )
}
