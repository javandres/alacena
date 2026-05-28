import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { personajes } from '../data/personajes'
import { Tarjeta } from '../components/Tarjeta'
import { FichaMultiverso } from '../components/FichaMultiverso'
import { BotonPrincipal } from '../components/BotonPrincipal'
import type { Personaje } from '../tipos'
import css from './Multiverso.module.css'

export function Multiverso() {
  const navegar = useNavigate()
  const [seleccionado, setSeleccionado] = useState<Personaje | null>(null)

  return (
    <div className={css.contenedor}>
      <div className={css.header}>
        <button className={css.volver} onClick={() => seleccionado ? setSeleccionado(null) : navegar('/menu')}>
          ← Atrás
        </button>
        <h1 className={css.titulo}>Multiverso</h1>
      </div>

      <AnimatePresence mode="wait">
        {seleccionado ? (
          <motion.div
            key="ficha"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <FichaMultiverso personaje={seleccionado} />
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <BotonPrincipal variante="secundario" onClick={() => setSeleccionado(null)}>
                Ver todos los personajes
              </BotonPrincipal>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="galeria"
            className={css.galeria}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {personajes.map(p => (
              <Tarjeta
                key={p.id}
                titulo={p.nombre}
                subtitulo={p.arquetipo}
                imagen={p.imagen}
                onClick={() => setSeleccionado(p)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
