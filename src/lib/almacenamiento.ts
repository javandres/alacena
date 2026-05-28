import { v4 as uuid } from 'uuid'
import type { CuentoGuardado } from '../tipos'

const KEY = 'alacena:cuentos'
const MAX = 100

function leer(): CuentoGuardado[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function escribir(cuentos: CuentoGuardado[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(cuentos))
  } catch {
    // storage lleno o no disponible — fallar silenciosamente, la UI maneja con toast
  }
}

export function guardarCuento(data: Omit<CuentoGuardado, 'id' | 'fecha'>): CuentoGuardado {
  const cuento: CuentoGuardado = {
    ...data,
    id: uuid(),
    fecha: new Date().toISOString(),
  }
  const actuales = leer()
  const nuevos = [cuento, ...actuales].slice(0, MAX)
  escribir(nuevos)
  return cuento
}

export function listarCuentos(): CuentoGuardado[] {
  return leer().sort((a, b) => b.fecha.localeCompare(a.fecha))
}

export function eliminarCuento(id: string): void {
  const filtrados = leer().filter(c => c.id !== id)
  escribir(filtrados)
}

export function limpiarCuentos(): void {
  localStorage.removeItem(KEY)
}
