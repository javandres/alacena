import { Howl } from 'howler'

let musica: Howl | null = null
const efectos: Record<string, Howl> = {}

const KEY_PREFS = 'alacena:audio'

type Prefs = { musica: number; efectos: number; narrador: boolean }
const PREFS_DEFAULT: Prefs = { musica: 0.3, efectos: 0.6, narrador: true }

export function leerPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(KEY_PREFS)
    if (!raw) return PREFS_DEFAULT
    return { ...PREFS_DEFAULT, ...JSON.parse(raw) }
  } catch {
    return PREFS_DEFAULT
  }
}

export function guardarPrefs(p: Partial<Prefs>): void {
  const actual = leerPrefs()
  const nuevo = { ...actual, ...p }
  localStorage.setItem(KEY_PREFS, JSON.stringify(nuevo))
  if (musica) musica.volume(nuevo.musica)
}

export function iniciarMusica(src: string): void {
  if (musica) return // ya iniciada
  const prefs = leerPrefs()
  musica = new Howl({
    src: [src],
    loop: true,
    volume: prefs.musica,
    html5: true,
  })
  musica.play()
}

export function detenerMusica(): void {
  if (musica) {
    musica.stop()
    musica.unload()
    musica = null
  }
}

export function reproducirEfecto(nombre: 'click' | 'ding' | 'transicion', src: string): void {
  const prefs = leerPrefs()
  if (!efectos[nombre]) {
    efectos[nombre] = new Howl({ src: [src], volume: prefs.efectos })
  }
  efectos[nombre].volume(prefs.efectos)
  efectos[nombre].play()
}
