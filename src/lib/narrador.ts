type EstadoNarrador = 'idle' | 'hablando' | 'pausado'

let utteranceActual: SpeechSynthesisUtterance | null = null

export function narradorDisponible(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function elegirVoz(): SpeechSynthesisVoice | undefined {
  const voces = window.speechSynthesis.getVoices()
  const esEs = voces.find(v => v.lang.startsWith('es-ES'))
  if (esEs) return esEs
  const esMx = voces.find(v => v.lang.startsWith('es-MX'))
  if (esMx) return esMx
  return voces.find(v => v.lang.startsWith('es'))
}

export function hablar(texto: string, onFin?: () => void): void {
  if (!narradorDisponible()) return
  detener()
  const u = new SpeechSynthesisUtterance(texto)
  const voz = elegirVoz()
  if (voz) u.voice = voz
  u.lang = 'es-ES'
  u.rate = 0.95
  u.pitch = 1.0
  u.onend = () => {
    utteranceActual = null
    onFin?.()
  }
  utteranceActual = u
  window.speechSynthesis.speak(u)
}

export function pausar(): void {
  if (narradorDisponible() && window.speechSynthesis.speaking) {
    window.speechSynthesis.pause()
  }
}

export function reanudar(): void {
  if (narradorDisponible() && window.speechSynthesis.paused) {
    window.speechSynthesis.resume()
  }
}

export function detener(): void {
  if (narradorDisponible()) {
    window.speechSynthesis.cancel()
    utteranceActual = null
  }
}

export function estadoActual(): EstadoNarrador {
  if (!narradorDisponible() || !window.speechSynthesis.speaking) return 'idle'
  if (window.speechSynthesis.paused) return 'pausado'
  return 'hablando'
}
