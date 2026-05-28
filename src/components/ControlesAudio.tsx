import { useEffect, useState } from 'react'
import css from './ControlesAudio.module.css'
import { hablar, pausar, reanudar, detener, narradorDisponible } from '../lib/narrador'

type Props = {
  texto: string
  autoIniciar?: boolean
}

export function ControlesAudio({ texto, autoIniciar = false }: Props) {
  const [estado, setEstado] = useState<'idle' | 'hablando' | 'pausado'>('idle')
  const disponible = narradorDisponible()

  useEffect(() => {
    if (autoIniciar && disponible) {
      setEstado('hablando')
      hablar(texto, () => setEstado('idle'))
    }
    return () => detener()
  }, [texto, autoIniciar, disponible])

  if (!disponible) {
    return (
      <div className={css.contenedor}>
        <button className={css.boton} disabled title="Tu navegador no permite leer en voz alta">
          🔇
        </button>
      </div>
    )
  }

  return (
    <div className={css.contenedor} role="group" aria-label="Controles del narrador">
      {estado === 'idle' && (
        <button
          className={css.boton}
          aria-label="Leer cuento"
          onClick={() => { setEstado('hablando'); hablar(texto, () => setEstado('idle')) }}
        >▶</button>
      )}
      {estado === 'hablando' && (
        <button className={css.boton} aria-label="Pausar" onClick={() => { setEstado('pausado'); pausar() }}>⏸</button>
      )}
      {estado === 'pausado' && (
        <button className={css.boton} aria-label="Reanudar" onClick={() => { setEstado('hablando'); reanudar() }}>▶</button>
      )}
      <button className={css.boton} aria-label="Detener" onClick={() => { setEstado('idle'); detener() }}>⏹</button>
    </div>
  )
}
