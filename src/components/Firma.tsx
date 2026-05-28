import css from './Firma.module.css'

export function Firma() {
  return (
    <footer className={css.firma} aria-label="Autora">
      <div className={css.ornamento} aria-hidden>
        <span className={css.linea} />
        <span className={css.florecita}>✦</span>
        <span className={css.linea} />
      </div>
      <p className={css.texto}>
        <span className={css.por}>Por</span>
        <span className={css.nombre}>Juliana García V</span>
      </p>
    </footer>
  )
}
