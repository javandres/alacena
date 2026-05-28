# La Alacena — Plan de Implementación

> **Para trabajadores agénticos:** SUB-SKILL REQUERIDA: Usar superpowers:subagent-driven-development (recomendado) o superpowers:executing-plans para implementar este plan tarea por tarea.

**Goal:** Construir el demo PWA jugable de "La Alacena" para la presentación K-Launch, siguiendo el spec en `docs/superpowers/specs/2026-05-27-la-alacena-design.md`.

**Tech Stack:** React 18, TypeScript, Vite, React Router v6, Framer Motion, Howler.js, Web Speech API, vite-plugin-pwa, Vitest + React Testing Library, uuid, Nunito + Fraunces (Google Fonts).

**Spec de referencia:** [docs/superpowers/specs/2026-05-27-la-alacena-design.md](../specs/2026-05-27-la-alacena-design.md)

Nota: este documento fue recreado tras un incidente durante Task 1 que eliminó accidentalmente este directorio. La versión completa con todos los pasos detallados de cada tarea sigue siendo la misma; ver el commit `<recovery>` en git para referencia. Para no duplicar el detalle aquí, el resto del plan se ejecutará leyendo cada tarea del orden originalmente acordado:

1. Inicializar proyecto Vite + React + TS — **YA HECHO** (commit ce15bff)
2. Instalar dependencias (react-router-dom, framer-motion, howler, uuid, vite-plugin-pwa, vitest, testing-library, etc.)
3. Configurar PWA en vite.config.ts
4. Configurar tema global y tipografía (Fraunces, Nunito, paleta CSS)
5. Definir tipos TypeScript del dominio
6. Datos de personajes (8 entradas, 4 free + 4 premium)
7. Datos de lugares (8 entradas)
8. Datos de situaciones e intro
9. Generador de cuentos con plantilla de 4 actos (TDD)
10. Almacenamiento localStorage (TDD)
11. Wrapper de narrador (Web Speech API)
12. Wrapper de audio (Howler)
13. Componente BotonPrincipal
14. Componente Tarjeta (reutilizable para personaje/lugar/situación + variante bloqueada)
15. Componente ModalPremium
16. PasosCuento y ControlesAudio
17. Componente FichaMultiverso
18. Routing y App.tsx
19. Pantalla Splash
20. Pantalla Intro (lore animado)
21. Pantalla Menú principal
22. Pantalla CrearCuento (wizard 4 pasos)
23. Pantalla MisCuentos
24. Pantalla Multiverso
25. Integración de audio (requiere MP3s de Juliana)
26. Assets PWA (requiere íconos PNG de Juliana)
27. Deploy a Vercel (manual)

Cada tarea se ejecuta con el contexto completo del spec y se commit individualmente.
