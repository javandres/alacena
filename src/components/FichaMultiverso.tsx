import type { Personaje } from '../tipos'
import css from './FichaMultiverso.module.css'

type Props = { personaje: Personaje }

export function FichaMultiverso({ personaje: p }: Props) {
  return (
    <article className={css.ficha}>
      <img className={css.imagen} src={p.poses.inicio} alt={p.nombre} />
      <div className={css.cuerpo}>
        <h2 className={css.nombre}>{p.nombre}</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className={css.arquetipo}>{p.arquetipo}</span>
          {p.premium && <span className={`${css.arquetipo} ${css.premium}`}>Premium</span>}
        </div>

        <div className={css.campo}><span className={css.etiqueta}>Edad</span><span className={css.valor}>{p.bio.edad}</span></div>
        <div className={css.campo}><span className={css.etiqueta}>Rol</span><span className={css.valor}>{p.bio.rol}</span></div>
        <div className={css.campo}><span className={css.etiqueta}>Ocupación</span><span className={css.valor}>{p.bio.ocupacion}</span></div>
        <div className={css.campo}><span className={css.etiqueta}>Personalidad</span><span className={css.valor}>{p.bio.personalidad}</span></div>
        <div className={css.campo}><span className={css.etiqueta}>Conflicto interno</span><span className={css.valor}>{p.bio.conflictoInterno}</span></div>
        <div className={css.campo}><span className={css.etiqueta}>Conflicto externo</span><span className={css.valor}>{p.bio.conflictoExterno}</span></div>
        <div className={css.campo}><span className={css.etiqueta}>Temor</span><span className={css.valor}>{p.bio.temor}</span></div>
        <div className={css.campo}><span className={css.etiqueta}>¿Qué quiere?</span><span className={css.valor}>{p.bio.quiere}</span></div>
        <div className={css.campo}><span className={css.etiqueta}>¿Qué hará?</span><span className={css.valor}>{p.bio.haraParaObtenerlo}</span></div>
      </div>
    </article>
  )
}
