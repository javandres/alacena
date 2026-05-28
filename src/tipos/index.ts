export type Arquetipo =
  | 'bufón'
  | 'sabia'
  | 'sanadora'
  | 'inocente'
  | 'rebelde'
  | 'mago'
  | 'madre'
  | 'gobernante'

export type BioPersonaje = {
  edad: string
  rol: string
  ocupacion: string
  personalidad: string
  conflictoInterno: string
  conflictoExterno: string
  temor: string
  quiere: string
  haraParaObtenerlo: string
}

export type Personaje = {
  id: string
  nombre: string
  arquetipo: Arquetipo
  descripcionFisica: string
  voz: {
    intro: string
    intento: string
    reflexion: string
  }
  imagen: string
  bio: BioPersonaje
  premium: boolean
}

export type Lugar = {
  id: string
  nombre: string
  descripcion: string
  influencia: string
  imagen: string
  premium: boolean
}

export type Situacion = {
  id: string
  titulo: string
  problema: string
  resolucion: string
  premium: boolean
}

export type CuentoGuardado = {
  id: string
  fecha: string
  personajeId: string
  lugarId: string
  situacionId: string
  texto: string
}

export type PreferenciasAudio = {
  musica: number
  efectos: number
  narrador: boolean
}
