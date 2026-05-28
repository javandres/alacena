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
  imagen: '/personajes/limon.png',
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
  it('incluye los 4 actos identificables', () => {
    const cuento = generarCuento(personajeMock, lugarMock, situacionMock)
    expect(cuento).toContain('Limón')
    expect(cuento).toContain('verde con boina')
    expect(cuento).toContain('paseaba alegre')
    expect(cuento).toContain('el huerto soleado')
    expect(cuento).toContain('Entre las matas, algo pasó.')
    expect(cuento).toContain('apareció alguien nuevo')
    expect(cuento).toContain('contó un chiste')
    expect(cuento).toContain('Aprendieron a aceptarlo.')
    expect(cuento).toContain('aprendió a reír')
  })

  it('devuelve un string no vacío con al menos 4 párrafos', () => {
    const cuento = generarCuento(personajeMock, lugarMock, situacionMock)
    const parrafos = cuento.split(/\n\s*\n/).filter(p => p.trim().length > 0)
    expect(parrafos.length).toBeGreaterThanOrEqual(4)
  })

  it('es determinista para los mismos inputs', () => {
    const a = generarCuento(personajeMock, lugarMock, situacionMock)
    const b = generarCuento(personajeMock, lugarMock, situacionMock)
    expect(a).toBe(b)
  })
})
