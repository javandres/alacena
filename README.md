# La Alacena

Juego interactivo web (PWA) para fomentar la lectoescritura en niños de 6 a 12 años. El jugador elige un personaje, un lugar y una situación; la app genera un cuento original con estructura narrativa clásica (inicio, problema, intento y resolución). Incluye narración por voz, música ambiente y cuentos guardados en el dispositivo.

Demo escolar para **K-Launch** — Unidad Educativa Kruger School, Cuenca.

**Por:** Juliana García V

## Stack

| Área | Tecnología |
|------|------------|
| UI | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build | [Vite 5](https://vitejs.dev/) |
| Rutas | [React Router](https://reactrouter.com/) |
| PWA / offline | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox) |
| Animaciones | [Framer Motion](https://www.framer.com/motion/) |
| Audio | [Howler.js](https://howlerjs.com/) + Web Speech API (narrador) |
| Persistencia | `localStorage` (sin backend) |
| Tipografía | Google Fonts (Fraunces, Nunito) |
| Tests | [Vitest](https://vitest.dev/) + Testing Library |

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # build de producción
npm run test:run # tests
```

## Docker Compose

Requiere la red externa `ubica_network` (Nginx Proxy Manager u otro reverse proxy en esa red).

```bash
docker compose up -d --build
```

En Proxy Manager, apunta el host al contenedor **`alacena-web`** puerto **80** (red `ubica_network`).

Para probar en local sin proxy, añade temporalmente `ports: ["8080:80"]` al servicio `web`.
