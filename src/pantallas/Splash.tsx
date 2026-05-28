import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BotonPrincipal } from '../components/BotonPrincipal'
import css from './Splash.module.css'

const INTRO_VISTO_KEY = 'alacena:intro-visto'

export function Splash() {
  const navegar = useNavigate()
  const introVisto = localStorage.getItem(INTRO_VISTO_KEY) === 'true'

  const empezar = () => navegar(introVisto ? '/menu' : '/intro')

  return (
    <motion.div
      className={css.contenedor}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <span className={css.asterisco}>✱</span>
      <motion.h1
        className={css.logo}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', damping: 14 }}
      >
        La Alacena
      </motion.h1>
      <p className={css.subtitulo}>
        Crea tus propios cuentos con los personajes de la abuela
      </p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <BotonPrincipal onClick={empezar}>Empezar</BotonPrincipal>
      </motion.div>
    </motion.div>
  )
}
