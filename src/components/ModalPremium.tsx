import { motion, AnimatePresence } from 'framer-motion'
import { BotonPrincipal } from './BotonPrincipal'
import css from './ModalPremium.module.css'

type Props = {
  abierto: boolean
  nombreItem: string
  onCerrar: () => void
}

export function ModalPremium({ abierto, nombreItem, onCerrar }: Props) {
  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          className={css.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onCerrar}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-premium-titulo"
        >
          <motion.div
            className={css.modal}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            onClick={e => e.stopPropagation()}
          >
            <div className={css.icono} aria-hidden>🔒</div>
            <h2 id="modal-premium-titulo" className={css.titulo}>
              ¡{nombreItem} es premium!
            </h2>
            <p className={css.descripcion}>
              Desbloquea todos los personajes, lugares y situaciones por <strong>$1.99/mes</strong>.
            </p>
            <BotonPrincipal onClick={onCerrar}>Lo veré después</BotonPrincipal>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
