# La Alacena — Diseño Técnico del Demo PWA

**Autora**: Juliana García Vintimilla
**Proyecto escolar**: K-Launch, Unidad Educativa Kruger School, 2do BGU, Cuenca
**Fecha del documento**: 2026-05-27
**Versión**: 1.0 — Demo para K-Launch

---

## 1. Objetivo y contexto

**La Alacena** es un juego interactivo web (PWA) que fomenta la lectoescritura en niños de 6 a 12 años. El niño elige un personaje, un lugar y una situación, y la aplicación genera un cuento original con estructura narrativa clásica.

Esta versión es un **demo para la presentación del K-Launch**. Las metas son:

- Ser **jugable de principio a fin** (no es un prototipo de clic-falso)
- Verse **pulida y profesional** para impresionar a jueces y compañeros
- Mostrar el **modelo de negocio freemium** (con personajes/lugares premium visibles pero bloqueados, sin pagos reales)
- Funcionar **sin internet** durante la presentación (PWA, todo cacheado)
- **Cero costo operativo**: sin backend, sin base de datos, sin cuentas de usuario

Lo que **NO** está en alcance de esta versión:
- Pagos reales (Stripe, Paddle, IAP)
- Backend, base de datos remota o autenticación
- Cuentas de usuario sincronizadas entre dispositivos
- Producto B2B para colegios (panel docente)
- Generación de cuentos con IA externa (LLM)
- App nativa iOS/Android (la PWA cubre ambos al instalarse)

---

## 2. Decisiones de alto nivel

| Decisión | Elección | Por qué |
|---|---|---|
| Generación de cuentos | Plantillas narrativas con variables | Calidad consistente, control creativo total, funciona offline, sin dependencias externas |
| Stack frontend | React 18 + Vite + TypeScript | Estándar moderno, buena documentación, inversión transferible a otros proyectos |
| Estilo visual | "Storybook moderno" (Nunito sans-serif, gradientes cálidos, sombras suaves) | Amigable e infantil sin ser caricaturesco; deja brillar el arte hand-drawn de los personajes |
| Audio | Narrador (Web Speech API) + música ambiente + efectos | Pedagógicamente valioso (lectura asistida); muy "wow" para el demo |
| Persistencia | localStorage (sin backend) | Cero costo, funciona offline, demo confiable |
| Hosting | Vercel o Netlify (deploy desde Git) | Gratis para proyectos personales, deploy automático |
| Idioma | Español (Ecuador) | Audiencia objetivo |

---

## 3. Arquitectura

### 3.1 Stack técnico completo

- **React 18** + **TypeScript** — UI declarativa con tipado
- **Vite** — bundler y dev server rápidos
- **React Router v6** — navegación entre pantallas
- **vite-plugin-pwa** (Workbox) — service worker, manifest, install prompt
- **Framer Motion** — animaciones declarativas (intro, transiciones, micro-interacciones)
- **Howler.js** — música de fondo y efectos de sonido (control de volumen, fade)
- **Web Speech API** (`SpeechSynthesis`) — narración del cuento, sin costo
- **localStorage** (envuelto en `lib/almacenamiento.ts`) — cuentos guardados
- **Google Fonts** (Fraunces + Nunito) — tipografía
- **uuid** — IDs de cuentos guardados

### 3.2 Sin backend

Toda la lógica corre en el navegador. El bundle final es 100% estático (HTML + JS + CSS + assets). El service worker cachea todo en la primera visita para que la app funcione offline después.

### 3.3 Estructura de directorios

```
alacena/
├── public/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── apple-touch-icon.png
│   └── audio/
│       ├── musica-ambiente.mp3
│       ├── click.mp3
│       └── ding.mp3
├── src/
│   ├── assets/
│   │   ├── personajes/   # PNGs (limon, cebolla, manzanilla, sal, + premium en gris)
│   │   ├── lugares/      # JPGs ilustrados (cocina, alacena, huerto, refrigerador)
│   │   └── logo.svg
│   ├── data/
│   │   ├── personajes.ts
│   │   ├── lugares.ts
│   │   ├── situaciones.ts
│   │   └── intro.ts
│   ├── components/
│   │   ├── BotonPrincipal.tsx
│   │   ├── TarjetaPersonaje.tsx
│   │   ├── TarjetaLugar.tsx
│   │   ├── TarjetaSituacion.tsx
│   │   ├── TarjetaBloqueada.tsx
│   │   ├── ModalPremium.tsx
│   │   ├── PasosCuento.tsx
│   │   ├── ControlesAudio.tsx
│   │   └── FichaMultiverso.tsx
│   ├── pantallas/
│   │   ├── Splash.tsx
│   │   ├── Intro.tsx
│   │   ├── Menu.tsx
│   │   ├── CrearCuento.tsx
│   │   ├── MisCuentos.tsx
│   │   └── Multiverso.tsx
│   ├── lib/
│   │   ├── generadorCuento.ts
│   │   ├── narrador.ts
│   │   ├── audio.ts
│   │   └── almacenamiento.ts
│   ├── tipos/
│   │   └── index.ts        # types: Personaje, Lugar, Situacion, CuentoGuardado
│   ├── estilos/
│   │   ├── tema.css        # variables CSS de paleta y fuentes
│   │   └── global.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Pantallas y flujo

```
Splash ──> Intro (lore) ──> Menu Principal ──┬──> Crear Cuento (4 pasos)
                                              ├──> Mis Cuentos
                                              └──> Multiverso (fichas)
```

### 4.1 Splash
- Logo "La Alacena" centrado, animación de entrada (fade + scale)
- Botón grande "Empezar"
- Aparece solo 1 vez por sesión (luego va directo al menú)

### 4.2 Intro animada (lore)
- Texto del lore aparece línea por línea (efecto typewriter suave)
- Ilustración de la cocina al fondo con leve "respiración"
- Botón "Saltar" en esquina superior derecha
- Auto-avanza al menú al terminar

**Texto del lore** (de `data/intro.ts`):
> "En la casa de la abuela existe una alacena. En la alacena viven especias, condimentos y líquidos. Era un buen lugar para vivir… o lo era. La abuela dejó de cocinar, y la Sal y el Azúcar tomaron el poder. La tropa del Vinagre quiere devolverle la sazón a la alacena."

### 4.3 Menú principal
Tres botones grandes verticales:
- 📖 **Crear Cuento** → pantalla CrearCuento
- 📚 **Mis Cuentos** → pantalla MisCuentos
- 🌍 **Conoce los Personajes** → pantalla Multiverso

### 4.4 Crear Cuento (4 sub-pasos)

Barra de progreso superior `1 → 2 → 3 → ✨` que se ilumina en el paso actual.

**Paso 1 — Elige personaje**
- Grid 2×4 con tarjetas: 4 a color (free) + 4 en gris con candado 🔒 (premium)
- Click en free → siguiente paso. Click en premium → modal "Desbloquea con Premium $1.99"

**Paso 2 — Elige lugar**
- Mismo patrón: 4 free + 4 premium

**Paso 3 — Elige situación**
- Mismo patrón: 4 free + 4 premium

**Paso 4 — Cuento generado**
- Animación corta de "remolino de letras" (≤ 1s)
- Cuento aparece párrafo por párrafo, sincronizado con narrador TTS
- Botones inferiores: `▶ Re-leer` `💾 Guardar` `✨ Crear otro` `🏠 Menú`

### 4.5 Mis Cuentos
- Lista de cuentos guardados (de localStorage), ordenados por fecha descendente
- Cada item: thumbnail del personaje + título "<Personaje> en <Lugar>" + fecha
- Click → vista del cuento (mismo layout que paso 4) con botón "Re-leer"
- Botón "Eliminar" con confirmación
- Estado vacío: ilustración + texto "Aún no has creado cuentos. ¡Empieza ahora!"

### 4.6 Multiverso (fichas de personajes)
- Galería de los 8 personajes (free y premium con bio completa)
- Cada tarjeta: imagen + nombre + arquetipo
- Click → ficha expandida con:
  - Imagen grande
  - Edad, rol, ocupación
  - Descripción física, personalidad
  - Arquetipo (con descripción del concepto)
  - Conflictos internos y externos
  - "¿Qué quiere?" / "¿Qué hará para obtenerlo?"
  - Si es premium → badge "Premium" pero la ficha es accesible (mostrar el universo es parte del pitch)

---

## 5. Generación de cuentos (sistema narrativo)

### 5.1 Estructura de 4 actos

Cada cuento sigue esta plantilla:

```
ACTO 1 — Inicio:      Presenta al personaje en su lugar
ACTO 2 — Problema:    Surge la situación / conflicto
ACTO 3 — Intento:     El personaje intenta resolverlo según su arquetipo
ACTO 4 — Resolución:  Resuelve y reflexiona (mini-moraleja)
```

### 5.2 Cómo se rellena

| Elemento | Aporta a |
|---|---|
| Personaje | Voz/intro (acto 1), forma de intentar resolver (acto 3), estilo de reflexión (acto 4) |
| Lugar | Descripción del escenario (acto 1), influencia en el problema (acto 2) |
| Situación | El problema concreto (acto 2), resolución contextual (acto 4) |

### 5.3 Tipos (TypeScript)

```ts
type Arquetipo = 'bufón' | 'sabia' | 'sanadora' | 'inocente' | 'rebelde' | 'mago' | 'madre' | 'gobernante'

export type Personaje = {
  id: string
  nombre: string
  arquetipo: Arquetipo
  descripcionFisica: string
  voz: {
    intro: string       // acto 1, ej: "paseaba con su boina puesta de medio lado"
    intento: string     // acto 3, ej: "decidió hacer lo que mejor hace: contar un chiste"
    reflexion: string   // acto 4, ej: "aprendió que reírse también es una forma de curar"
  }
  imagen: string
  bio: {
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
  premium: boolean
}

export type Lugar = {
  id: string
  nombre: string
  descripcion: string  // acto 1, ej: "el huerto de la abuela donde la tierra olía a hierba mojada"
  influencia: string   // acto 2, ej: "Mientras caminaba entre las matas, escuchó una vocecita pequeña."
  imagen: string
  premium: boolean
}

export type Situacion = {
  id: string
  titulo: string       // ej: "Encontró un amigo"
  problema: string     // acto 2, ej: "una nueva mata de ajíes había llegado al huerto"
  resolucion: string   // acto 4, ej: "Los demás aprendieron que un amigo nuevo no reemplaza a los viejos."
  premium: boolean
}
```

### 5.4 Función generadora

```ts
export function generarCuento(p: Personaje, l: Lugar, s: Situacion): string {
  return `
    Era una tarde tibia y ${p.nombre}, ${p.descripcionFisica}, ${p.voz.intro} por ${l.descripcion}.

    ${l.influencia} Y entonces, ${s.problema}.

    ${p.nombre}, fiel a su arquetipo de ${p.arquetipo}, ${p.voz.intento}.

    ${s.resolucion} Al final del día, ${p.nombre} ${p.voz.reflexion}.
  `.trim()
}
```

### 5.5 Ejemplo de salida

Limón + Huerto + "Encontró un amigo":

> Era una tarde tibia y Limón, verde con su boina negra de medio lado, paseaba con su boina puesta de medio lado por el huerto de la abuela donde la tierra olía a hierba mojada.
>
> Mientras caminaba entre las matas, escuchó una vocecita pequeña. Y entonces, una nueva mata de ajíes había llegado al huerto.
>
> Limón, fiel a su arquetipo de bufón, decidió hacer lo que mejor hace: contar un chiste.
>
> Los demás aprendieron que un amigo nuevo no reemplaza a los viejos. Al final del día, Limón aprendió que reírse también es una forma de curar.

**Nota de polish**: en la versión final, los fragmentos de voz deben escribirse para fluir con la conjunción "Mientras caminaba…" sin sonar repetitivos. El generador puede tener pequeñas variantes de conectores (`Y entonces / De pronto / Sin que nadie lo esperara`).

---

## 6. Catálogo de contenido (demo)

### 6.1 Personajes — 8 total

**Free (jugables, 4):**
- 🍋 Limón — Bufón
- 🧅 Cebolla — Sabia
- 🌼 Manzanilla — Sanadora
- 🧂 Sal — Inocente / Co-villana

**Premium (visibles con candado y ficha completa en multiverso, 4):**
- 🍶 Vinagre — Rebelde / Héroe
- 🫒 Olea — Mago / Estratega
- 🍬 Azúcar — Madre / Co-villana
- 🧪 Bicarbonato — Gobernante / Villano

### 6.2 Lugares — 8 total

**Free (4):** Alacena · Cocina · Huerto · Refrigerador
**Premium (4):** Microondas · Horno · Mesa del comedor · Armario de limpieza

### 6.3 Situaciones — 8 total

**Free (4):** Perdió su etiqueta · Encontró un amigo · Tiene miedo de ser cocinado · Quiere cambiar de sabor
**Premium (4):** Se cayó · Lo confundieron con otro · Está por acabarse · Ya no lo usan más

### 6.4 Total de cuentos jugables

**4 personajes × 4 lugares × 4 situaciones = 64 combinaciones únicas**

### 6.5 Assets pendientes (responsabilidad de Juliana)

- Ilustraciones de **Huerto** y **Refrigerador** (Cocina y Alacena ya existen)
- Versiones "en gris con candado" de los 4 personajes premium
- Íconos/dibujos pequeños para las 8 situaciones (pueden ser emojis grandes)
- Audio: 1 track de música ambiente + 2-3 SFX (click, ding, transición) — puede usar Pixabay/Freesound (libre de derechos)
- Bios completas de Sal y Bicarbonato (las demás ya están en `Personajes proyecto alacena.docx`)

---

## 7. Estilo visual

### 7.1 Paleta

```css
:root {
  /* Primarios */
  --crema: #fff4dc;
  --terracota: #c97b46;
  --naranja: #ff9a3c;
  --naranja-oscuro: #d97a1f;
  --marron: #4a2b14;
  --marron-suave: #6b4a2a;

  /* Acentos */
  --verde-hierba: #7fb069;
  --amarillo: #ffd166;
  --rosa-tibio: #e8a598;

  /* Estados */
  --gris-bloqueado: #d4cfc4;
  --candado: #8a8580;
}
```

### 7.2 Tipografía

- **Títulos**: Fraunces (serif elegante), peso 700-900
- **UI y cuerpo**: Nunito, peso 400-800
- Tamaños mínimos: cuerpo 18px, cuento 22px, título de pantalla 32-48px
- Interlineado: 1.6 en bloques de cuento

### 7.3 Componentes visuales clave

- **Botones primarios**: fondo naranja, sombra inferior 4px en naranja-oscuro (efecto "se puede hundir"), border-radius 14px
- **Tarjetas**: fondo blanco/crema, sombra suave, border-radius 16px, hover eleva 2px
- **Tarjetas bloqueadas**: filtro grayscale, opacidad 0.7, ícono 🔒 en esquina
- **Modal premium**: backdrop oscurecido a 0.5, modal slide-up desde abajo, esquinas redondeadas 24px arriba

### 7.4 Animaciones (Framer Motion)

| Pantalla | Animación |
|---|---|
| Splash → Intro | Logo escala 1 → 0.5, sube al header |
| Intro lore | Texto aparece línea por línea (0.5s cada una), cocina con `breath` (scale 1 ↔ 1.02 en 4s) |
| Selección | Tarjetas entran en cascada (stagger 0.08s); al elegir, la elegida hace `scale 1.1`, las otras `opacity → 0` |
| Generación cuento | Loader "remolino de letras" 1s, luego cuento aparece párrafo por párrafo (cada uno `fade-in + slide-up` 0.4s) |
| Modal premium | Backdrop `fade-in 0.2s`, modal `slide-up 0.3s ease-out`; candado `shake` al click |

---

## 8. Audio

### 8.1 Narrador (Web Speech API)

- Voz: la mejor `es-ES` o `es-MX` disponible en el dispositivo (se elige automáticamente, con fallback)
- Velocidad: 0.95 (ligeramente más lento que normal, para niños)
- Pitch: 1.0
- Se inicia automáticamente al mostrar el cuento; se detiene al cambiar de pantalla
- Controles: `Pausar` / `Reanudar` / `Re-leer`

### 8.2 Música de fondo

- Track ambiental suave (≤ 2 min, en loop con fade) — sonido cálido tipo "cocina por la tarde"
- Volumen por defecto bajo (~30%), control en menú
- Comienza tras la primera interacción del usuario (los navegadores bloquean autoplay)

### 8.3 Efectos de sonido

- `click.mp3`: tap suave en botones (≤ 100ms)
- `ding.mp3`: paso completado (al avanzar entre pasos del cuento)
- `transicion.mp3`: cambio de pantalla (opcional)

---

## 9. Persistencia y almacenamiento

### 9.1 Cuentos guardados

```ts
export type CuentoGuardado = {
  id: string                    // uuid
  fecha: string                 // ISO 8601
  personajeId: string
  lugarId: string
  situacionId: string
  texto: string                 // cuento generado
}
```

- Storage key: `alacena:cuentos` (JSON array)
- Límite suave: 100 cuentos (más que suficiente para el demo); al exceder, eliminar el más viejo
- API en `lib/almacenamiento.ts`: `guardar(cuento)`, `listar()`, `eliminar(id)`, `limpiar()`

### 9.2 Estado de "ya viste el intro"

- Storage key: `alacena:intro-visto` (boolean)
- Si `true`, splash va directo al menú (saltea intro). Botón en menú permite reverla.

### 9.3 Preferencias de audio

- Storage key: `alacena:audio` → `{ musica: 0..1, efectos: 0..1, narrador: boolean }`

---

## 10. PWA — Configuración

### 10.1 `vite.config.ts` (extracto)

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'La Alacena',
        short_name: 'Alacena',
        description: 'Crea tus propios cuentos con los personajes de la abuela',
        lang: 'es',
        theme_color: '#c97b46',
        background_color: '#fff4dc',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,mp3,woff2}'],
      },
    }),
  ],
})
```

### 10.2 Instalable

Al visitar el sitio desde Chrome/Edge móvil → prompt automático "Agregar a pantalla de inicio". Una vez instalada, funciona como app nativa, sin barra de URL.

---

## 11. Accesibilidad

- **WCAG AA**: contrastes verificados (todos los pares texto/fondo cumplen 4.5:1 mínimo)
- **Focus visible**: outline naranja de 3px en todos los interactivos
- **Click targets**: mínimo 48×48px (dedos chicos)
- **Tab order**: lógico, navegable solo con teclado
- **ARIA**: labels en botones de íconos, `aria-live="polite"` en el área del cuento durante la generación
- **prefers-reduced-motion**: respetar — quitar animaciones grandes, mantener transiciones ≤ 200ms
- **Texto**: tamaño grande, no usar solo color para transmitir información (los items premium tienen candado además del gris)

---

## 12. Edge cases y manejo de errores

| Caso | Comportamiento |
|---|---|
| Navegador sin Web Speech API | Botón "Re-leer" deshabilitado con tooltip "Tu navegador no permite leer en voz alta" |
| Navegador sin localStorage (modo incógnito) | "Mis Cuentos" muestra mensaje "Activa el almacenamiento para guardar tus cuentos" |
| Offline después de primera carga | Funciona 100% (service worker cachea todo); música puede tardar en cargar la primera vez |
| Click en personaje/lugar/situación premium | Modal "Desbloquea con Premium $1.99" → solo botón "Lo veré después" (sin pago real) |
| Cuento muy largo | Scroll interno suave en el contenedor; narrador acompaña |
| Double-click / click rápido | Botones bloqueados durante animaciones (Framer Motion `whileTap`) |
| Eliminación de cuento guardado | Confirmación nativa antes de borrar |
| Audio bloqueado por autoplay policy | Música no inicia hasta primera interacción del usuario (estándar) |
| localStorage lleno (raro) | Try/catch en `guardar`; toast "No se pudo guardar, intenta eliminar cuentos viejos" |

---

## 13. Deploy

### 13.1 Hosting

- **Vercel** (recomendado) o **Netlify**: ambos gratuitos para proyectos personales, despliegue automático desde GitHub
- Setup: push a `main` → build automático → URL en `https://alacena.vercel.app` (o dominio custom)

### 13.2 Pasos de deploy

1. Crear repo en GitHub
2. Conectar Vercel/Netlify al repo
3. Configuración detectada automáticamente (Vite)
4. URL pública en < 5 minutos
5. (Opcional) Comprar dominio `laalacena.app` o similar para el K-Launch

---

## 14. Métricas de éxito del demo

El demo se considera exitoso si:

- ✅ Un juez puede tomar el dispositivo y crear un cuento sin instrucciones
- ✅ El cuento generado se siente "original" (no robótico ni repetitivo)
- ✅ El narrador lee con voz clara y entendible
- ✅ Las animaciones se sienten suaves (60 fps en un móvil promedio)
- ✅ Los items premium bloqueados se entienden como "más contenido disponible"
- ✅ Funciona offline (modo avión) sin errores
- ✅ Se instala como app desde el navegador en menos de 30 segundos

---

## 15. Resumen del trabajo por hacer

### Trabajo de Juliana (contenido)
1. Ilustrar Huerto y Refrigerador en estilo coherente con Cocina/Alacena
2. Crear versiones "en gris" de los 4 personajes premium
3. Escribir las 12 frases de voz (3 por personaje × 4 personajes free)
4. Escribir 8 fragmentos de lugar (2 por lugar × 4 lugares free)
5. Escribir 8 fragmentos de situación (2 por situación × 4 situaciones free)
6. Completar bios de Sal y Bicarbonato
7. Conseguir 1 música ambiente + 3 efectos (Pixabay/Freesound)

### Trabajo de implementación (a planificarse en el siguiente paso)
- Setup del proyecto (Vite + React + TS + PWA)
- Sistema de tipos y estructura de datos
- Generador de cuentos
- 6 pantallas (Splash, Intro, Menu, CrearCuento, MisCuentos, Multiverso)
- Componentes reutilizables (tarjetas, modal, controles)
- Integración de Web Speech API y Howler
- Animaciones con Framer Motion
- Persistencia en localStorage
- Configuración de PWA
- Deploy a Vercel

El plan de implementación detallado paso a paso se genera en el siguiente documento (a través de la skill `writing-plans`).
