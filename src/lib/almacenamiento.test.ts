import { describe, it, expect, beforeEach } from 'vitest'
import { guardarCuento, listarCuentos, eliminarCuento, limpiarCuentos } from './almacenamiento'
import type { CuentoGuardado } from '../tipos'

const cuentoBase = (): Omit<CuentoGuardado, 'id' | 'fecha'> => ({
  personajeId: 'limon',
  lugarId: 'huerto',
  situacionId: 'encontro-amigo',
  texto: 'Había una vez un limón...',
})

describe('almacenamiento de cuentos', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('guarda y lista un cuento', () => {
    const guardado = guardarCuento(cuentoBase())
    expect(guardado.id).toBeTruthy()
    expect(guardado.fecha).toBeTruthy()

    const lista = listarCuentos()
    expect(lista).toHaveLength(1)
    expect(lista[0].id).toBe(guardado.id)
  })

  it('lista cuentos ordenados por fecha descendente', async () => {
    const a = guardarCuento(cuentoBase())
    await new Promise(r => setTimeout(r, 10))
    const b = guardarCuento(cuentoBase())

    const lista = listarCuentos()
    expect(lista[0].id).toBe(b.id)
    expect(lista[1].id).toBe(a.id)
  })

  it('elimina un cuento por id', () => {
    const a = guardarCuento(cuentoBase())
    const b = guardarCuento(cuentoBase())
    eliminarCuento(a.id)
    const lista = listarCuentos()
    expect(lista).toHaveLength(1)
    expect(lista[0].id).toBe(b.id)
  })

  it('limpia todos los cuentos', () => {
    guardarCuento(cuentoBase())
    guardarCuento(cuentoBase())
    limpiarCuentos()
    expect(listarCuentos()).toHaveLength(0)
  })

  it('mantiene un máximo de 100 cuentos (FIFO)', () => {
    for (let i = 0; i < 105; i++) {
      guardarCuento(cuentoBase())
    }
    expect(listarCuentos()).toHaveLength(100)
  })

  it('devuelve [] si el storage está corrupto', () => {
    localStorage.setItem('alacena:cuentos', 'no es JSON')
    expect(listarCuentos()).toEqual([])
  })
})
