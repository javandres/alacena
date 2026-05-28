import { describe, it, expect } from 'vitest'
import { puntuarVoz, elegirMejorVoz } from './narrador'

function voz(
  partial: Partial<SpeechSynthesisVoice> & Pick<SpeechSynthesisVoice, 'name' | 'lang'>,
): SpeechSynthesisVoice {
  return {
    default: false,
    localService: true,
    voiceURI: partial.name,
    ...partial,
  }
}

describe('puntuarVoz', () => {
  it('prefiere español ecuatoriano sobre inglés', () => {
    const ec = voz({ name: 'Google español', lang: 'es-EC' })
    const en = voz({ name: 'Samantha', lang: 'en-US' })
    expect(puntuarVoz(ec)).toBeGreaterThan(puntuarVoz(en))
  })

  it('prefiere voces con nombre conocido sobre genéricas', () => {
    const paulina = voz({ name: 'Paulina', lang: 'es-MX' })
    const generica = voz({ name: 'Spanish Voice', lang: 'es-MX' })
    expect(puntuarVoz(paulina)).toBeGreaterThan(puntuarVoz(generica))
  })

  it('penaliza voces espeak', () => {
    const espeak = voz({ name: 'espeak Spanish', lang: 'es' })
    const google = voz({ name: 'Google español', lang: 'es-MX' })
    expect(puntuarVoz(google)).toBeGreaterThan(puntuarVoz(espeak))
  })

  it('prioriza es-MX sobre es genérico cuando ambas son buenas', () => {
    const mx = voz({ name: 'Google español', lang: 'es-MX' })
    const generico = voz({ name: 'Spanish', lang: 'es' })
    expect(puntuarVoz(mx)).toBeGreaterThan(puntuarVoz(generico))
  })
})

describe('elegirMejorVoz', () => {
  it('elige la voz con mayor puntuación', () => {
    const voces = [
      voz({ name: 'espeak Spanish', lang: 'es' }),
      voz({ name: 'Paulina', lang: 'es-MX' }),
      voz({ name: 'Samantha', lang: 'en-US' }),
    ]
    expect(elegirMejorVoz(voces)?.name).toBe('Paulina')
  })

  it('devuelve undefined si no hay voces en español', () => {
    const voces = [voz({ name: 'Samantha', lang: 'en-US' })]
    expect(elegirMejorVoz(voces)).toBeUndefined()
  })
})
