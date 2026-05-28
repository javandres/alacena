import type { Situacion } from '../tipos'

export const situaciones: Situacion[] = [
  {
    id: 'perdio-etiqueta',
    titulo: 'Perdió su etiqueta',
    problema: 'descubrió que su etiqueta había desaparecido sin dejar rastro',
    resolucion: 'Aprendió que su valor no estaba escrito en una etiqueta sino en lo que daba al mundo.',
    premium: false,
  },
  {
    id: 'encontro-amigo',
    titulo: 'Encontró un amigo',
    problema: 'apareció alguien completamente distinto buscando hacerse amigo',
    resolucion: 'Los demás aprendieron que un amigo nuevo no reemplaza a los viejos, los acompaña.',
    premium: false,
  },
  {
    id: 'miedo-cocinado',
    titulo: 'Tiene miedo de ser cocinado',
    problema: 'escuchó pasos en la cocina y supo que esa noche tocaba cena especial',
    resolucion: 'Comprendió que su propósito a veces da miedo, pero también es lo que lo hace único.',
    premium: false,
  },
  {
    id: 'cambiar-sabor',
    titulo: 'Quiere cambiar de sabor',
    problema: 'se cansó de saber siempre igual y empezó a soñar con ser otra cosa',
    resolucion: 'Descubrió que cambiar no es traicionarse, pero seguir siendo uno mismo también es válido.',
    premium: false,
  },
  {
    id: 'se-cayo',
    titulo: 'Se cayó',
    problema: 'tropezó y rodó hasta el suelo donde nadie podía verlo',
    resolucion: 'Entendió que pedir ayuda no es debilidad sino el primer paso para volver al estante.',
    premium: true,
  },
  {
    id: 'confundieron',
    titulo: 'Lo confundieron con otro',
    problema: 'lo llamaron por un nombre que no era el suyo y nadie pareció notarlo',
    resolucion: 'Aprendió a decir su nombre sin miedo, una y otra vez si hace falta.',
    premium: true,
  },
  {
    id: 'por-acabarse',
    titulo: 'Está por acabarse',
    problema: 'al mirarse, notó que ya quedaba muy poco de él',
    resolucion: 'Decidió que lo que quedaba lo daría con generosidad, sin lamentar lo perdido.',
    premium: true,
  },
  {
    id: 'ya-no-lo-usan',
    titulo: 'Ya no lo usan más',
    problema: 'se dio cuenta de que llevaba semanas sin que nadie lo tocara',
    resolucion: 'Comprendió que su valor no depende de ser usado, sino de estar disponible.',
    premium: true,
  },
]
