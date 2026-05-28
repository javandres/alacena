import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import css from './Menu.module.css'

type Opcion = {
  icono: string
  titulo: string
  descripcion: string
  ruta: string
}

const OPCIONES: Opcion[] = [
  { icono: '📖', titulo: 'Crear Cuento', descripcion: 'Elige personaje, lugar y situación', ruta: '/crear' },
  { icono: '📚', titulo: 'Mis Cuentos', descripcion: 'Lee los cuentos que has creado', ruta: '/mis-cuentos' },
  { icono: '🌍', titulo: 'Conoce los Personajes', descripcion: 'Descubre el universo de la alacena', ruta: '/multiverso' },
]

export function Menu() {
  const navegar = useNavigate()
  return (
    <div className={css.contenedor}>
      <div className={css.header}>
        <h1 className={css.titulo}>La Alacena</h1>
        <p className={css.subtitulo}>¿Qué hacemos hoy?</p>
      </div>
      <div className={css.opciones}>
        {OPCIONES.map((o, i) => (
          <motion.button
            key={o.ruta}
            className={css.opcion}
            onClick={() => navegar(o.ruta)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <span className={css.icono} aria-hidden>{o.icono}</span>
            <span>
              <div>{o.titulo}</div>
              <div className={css.descripcion}>{o.descripcion}</div>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
