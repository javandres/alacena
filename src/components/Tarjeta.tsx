import css from './Tarjeta.module.css'

type Props = {
  titulo: string
  subtitulo?: string
  imagen?: string
  icono?: string
  bloqueada?: boolean
  onClick: () => void
}

export function Tarjeta({ titulo, subtitulo, imagen, icono, bloqueada, onClick }: Props) {
  const clases = [css.tarjeta, bloqueada && css.bloqueada].filter(Boolean).join(' ')
  return (
    <button
      className={clases}
      onClick={onClick}
      aria-label={bloqueada ? `${titulo} (bloqueado, contenido premium)` : titulo}
    >
      {imagen ? (
        <img src={imagen} alt="" />
      ) : icono ? (
        <div className={css.icono} aria-hidden>{icono}</div>
      ) : null}
      <h3 className={css.titulo}>{titulo}</h3>
      {subtitulo && <p className={css.subtitulo}>{subtitulo}</p>}
      {bloqueada && <span className={css.candado} aria-hidden>🔒</span>}
    </button>
  )
}
