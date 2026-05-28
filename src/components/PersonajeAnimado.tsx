import { motion, AnimatePresence } from 'framer-motion'
import type { Personaje } from '../tipos'

type Props = {
  personaje: Personaje
  paso: 1 | 2 | 3 | 4
  tamanio?: number
}

const POSES = ['inicio', 'problema', 'intento', 'resolucion'] as const

export function PersonajeAnimado({ personaje, paso, tamanio = 200 }: Props) {
  const claveActual = POSES[paso - 1]
  const src = personaje.poses[claveActual]

  return (
    <div style={{ width: tamanio, height: tamanio, position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={claveActual}
          src={src}
          alt={`${personaje.nombre} (${claveActual})`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            width: tamanio,
            height: tamanio,
            objectFit: 'contain',
            position: 'absolute',
            inset: 0,
          }}
        />
      </AnimatePresence>
    </div>
  )
}
