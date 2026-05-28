import type { Personaje, Lugar, Situacion } from '../tipos'

export function generarCuento(p: Personaje, l: Lugar, s: Situacion): string {
  const acto1 = `Era una tarde tibia y ${p.nombre}, ${p.descripcionFisica}, ${p.voz.intro} por ${l.descripcion}.`
  const acto2 = `${l.influencia} Y entonces, ${s.problema}.`
  const acto3 = `${p.nombre}, fiel a su arquetipo de ${p.arquetipo}, ${p.voz.intento}.`
  const acto4 = `${s.resolucion} Al final del día, ${p.nombre} ${p.voz.reflexion}.`

  return [acto1, acto2, acto3, acto4].join('\n\n')
}
