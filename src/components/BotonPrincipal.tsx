import type { ButtonHTMLAttributes, ReactNode } from 'react'
import css from './BotonPrincipal.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: 'primario' | 'secundario'
  children: ReactNode
}

export function BotonPrincipal({ variante = 'primario', className, children, ...rest }: Props) {
  const clase = [css.boton, variante === 'secundario' && css.secundario, className]
    .filter(Boolean)
    .join(' ')
  return (
    <button className={clase} {...rest}>
      {children}
    </button>
  )
}
