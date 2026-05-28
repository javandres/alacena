import { describe, it, expect } from 'vitest'
import { generarCuento } from './generadorCuento'
import type { Personaje, Lugar, Situacion } from '../tipos'

const personajeMock: Personaje = {
  id: 'limon',
  nombre: 'Limón',
  arquetipo: 'bufón',
  descripcionFisica: 'verde con boina',
  voz: {
    intro: 'paseaba alegre',
    intento: 'contó un chiste',
    reflexion: 'aprendió a reír',
  },
  poses: {
    inicio: '/x/inicio.png',
    problema: '/x/problema.png',
    intento: '/x/intento.png',
    resolucion: '/x/resolucion.png',
  },
  bio: {} as never,
  premium: false,
}

const lugarMock: Lugar = {
  id: 'huerto',
  nombre: 'El Huerto',
  descripcion: 'el huerto soleado',
  influencia: 'Entre las matas, algo pasó.',
  imagen: '/lugares/huerto.jpg',
  premium: false,
}

const situacionMock: Situacion = {
  id: 'encontro-amigo',
  titulo: 'Encontró un amigo',
  problema: 'apareció alguien nuevo',
  resolucion: 'Aprendieron a aceptarlo.',
  premium: false,
}

describe('generarCuento', () => {
  it('incluye los 4 actos identificables en el texto', () => {
    const cuento = generarCuento(personajeMock, lugarMock, situacionMock)
    expect(cuento.texto).toContain('Limón')
    expect(cuento.texto).toContain('verde con boina')
    expect(cuento.texto).toContain('paseaba alegre')
    expect(cuento.texto).toContain('el huerto soleado')
    expect(cuento.texto).toContain('Entre las matas, algo pasó.')
    expect(cuento.texto).toContain('apareció alguien nuevo')
    expect(cuento.texto).toContain('contó un chiste')
    expect(cuento.texto).toContain('Aprendieron a aceptarlo.')
    expect(cuento.texto).toContain('aprendió a reír')
  })

  it('devuelve exactamente 4 actos', () => {
    const cuento = generarCuento(personajeMock, lugarMock, situacionMock)
    expect(cuento.actos).toHaveLength(4)
    cuento.actos.forEach(acto => {
      expect(acto.length).toBeGreaterThan(0)
    })
  })

  it('el texto combinado coincide con actos.join("\\n\\n")', () => {
    const cuento = generarCuento(personajeMock, lugarMock, situacionMock)
    expect(cuento.texto).toBe(cuento.actos.join('\n\n'))
  })

  it('es determinista para los mismos inputs', () => {
    const a = generarCuento(personajeMock, lugarMock, situacionMock)
    const b = generarCuento(personajeMock, lugarMock, situacionMock)
    expect(a.texto).toBe(b.texto)
    expect(a.actos).toEqual(b.actos)
  })
})
