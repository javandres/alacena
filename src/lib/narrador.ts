type EstadoNarrador = 'idle' | 'hablando' | 'pausado'

const LANG_PRIORIDAD = ['es-ec', 'es-mx', 'es-es', 'es-us', 'es-'] as const

const NOMBRES_PREFERIDOS = [
  'paulina',
  'monica',
  'mónica',
  'soledad',
  'lucia',
  'lucía',
  'raquel',
  'paloma',
  'sabina',
  'helena',
  'elena',
  'google español',
  'google spanish',
  'microsoft sabina',
]

const ETIQUETAS_CALIDAD = ['premium', 'enhanced', 'natural', 'neural', 'wavenet', 'studio']

const NOMBRES_EVITAR = ['espeak', 'compact', 'squeak', 'supercompacts', 'bad news', 'bahh', 'bells']

let utteranceActual: SpeechSynthesisUtterance | null = null
let vozPreferida: SpeechSynthesisVoice | null = null
let promesaVoces: Promise<SpeechSynthesisVoice | undefined> | null = null
let listenerVocesRegistrado = false

export function narradorDisponible(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/** Puntúa una voz en español (mayor = mejor para narrar cuentos). */
export function puntuarVoz(voz: SpeechSynthesisVoice): number {
  const lang = voz.lang.toLowerCase()
  const nombre = voz.name.toLowerCase()

  if (!lang.startsWith('es')) return -1000

  let puntos = 0

  const idxLang = LANG_PRIORIDAD.findIndex(prefijo => lang.startsWith(prefijo))
  puntos += idxLang >= 0 ? (LANG_PRIORIDAD.length - idxLang) * 12 : 8

  for (const etiqueta of ETIQUETAS_CALIDAD) {
    if (nombre.includes(etiqueta)) puntos += 28
  }

  for (const preferido of NOMBRES_PREFERIDOS) {
    if (nombre.includes(preferido)) puntos += 32
  }

  for (const evitar of NOMBRES_EVITAR) {
    if (nombre.includes(evitar)) puntos -= 60
  }

  if (nombre.includes('google')) puntos += 18

  if (!voz.localService && (nombre.includes('premium') || nombre.includes('enhanced'))) {
    puntos += 12
  }

  if (voz.localService && nombre.includes('google')) puntos += 8

  if (voz.default && puntos < 20) puntos -= 5

  return puntos
}

export function elegirMejorVoz(voces: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const enEspanol = voces.filter(v => v.lang.toLowerCase().startsWith('es'))
  if (enEspanol.length === 0) return undefined
  return [...enEspanol].sort((a, b) => puntuarVoz(b) - puntuarVoz(a))[0]
}

function registrarListenerVoces(): void {
  if (!narradorDisponible() || listenerVocesRegistrado) return
  listenerVocesRegistrado = true

  const actualizar = () => {
    const voces = window.speechSynthesis.getVoices()
    if (voces.length === 0) return
    vozPreferida = elegirMejorVoz(voces) ?? null
    promesaVoces = null
  }

  window.speechSynthesis.addEventListener('voiceschanged', actualizar)
  actualizar()
}

/** Espera a que el navegador exponga las voces (crítico en iOS/Android). */
export function esperarVoces(): Promise<SpeechSynthesisVoice | undefined> {
  if (!narradorDisponible()) return Promise.resolve(undefined)

  registrarListenerVoces()

  if (vozPreferida) return Promise.resolve(vozPreferida)

  const actuales = window.speechSynthesis.getVoices()
  if (actuales.length > 0) {
    vozPreferida = elegirMejorVoz(actuales) ?? null
    return Promise.resolve(vozPreferida ?? undefined)
  }

  if (promesaVoces) return promesaVoces

  promesaVoces = new Promise(resolve => {
    let resuelto = false

    const finalizar = () => {
      if (resuelto) return
      resuelto = true
      const voces = window.speechSynthesis.getVoices()
      vozPreferida = voces.length > 0 ? elegirMejorVoz(voces) ?? null : null
      resolve(vozPreferida ?? undefined)
    }

    window.speechSynthesis.addEventListener('voiceschanged', finalizar, { once: true })
    window.speechSynthesis.getVoices()

    setTimeout(finalizar, 800)
  })

  return promesaVoces
}

/** Precarga voces al iniciar la app para que el primer cuento no use la voz por defecto. */
export function precargarVoces(): void {
  void esperarVoces()
}

export async function hablar(texto: string, onFin?: () => void): Promise<void> {
  if (!narradorDisponible()) return
  detener()

  const voz = await esperarVoces()
  const u = new SpeechSynthesisUtterance(texto)
  if (voz) {
    u.voice = voz
    u.lang = voz.lang
  } else {
    u.lang = 'es-MX'
  }
  u.rate = 0.88
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
  if (!narradorDisponible() || !utteranceActual || !window.speechSynthesis.speaking) return 'idle'
  if (window.speechSynthesis.paused) return 'pausado'
  return 'hablando'
}

/** Para depuración o ajustes futuros. */
export function vozActiva(): SpeechSynthesisVoice | null {
  return vozPreferida
}
