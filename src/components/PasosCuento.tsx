import css from './PasosCuento.module.css'

type Props = {
  pasoActual: 1 | 2 | 3 | 4
}

export function PasosCuento({ pasoActual }: Props) {
  const pasos: Array<{ n: 1 | 2 | 3 | 4; etiqueta: string }> = [
    { n: 1, etiqueta: '1' },
    { n: 2, etiqueta: '2' },
    { n: 3, etiqueta: '3' },
    { n: 4, etiqueta: '✨' },
  ]
  return (
    <div className={css.contenedor} role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={pasoActual}>
      {pasos.map((p, i) => (
        <span key={p.n} style={{ display: 'contents' }}>
          <span
            className={[
              css.paso,
              pasoActual === p.n && css.activo,
              pasoActual > p.n && css.completado,
            ].filter(Boolean).join(' ')}
          >
            {p.etiqueta}
          </span>
          {i < pasos.length - 1 && (
            <span className={[css.linea, pasoActual > p.n && css.completada].filter(Boolean).join(' ')} />
          )}
        </span>
      ))}
    </div>
  )
}
