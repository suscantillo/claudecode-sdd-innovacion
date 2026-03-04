# Registro de Desarrollo

Historial de todos los cambios realizados en el proyecto `claudessd-page` durante la sesión de trabajo con Claude Code.

---

## 1. Inicialización del proyecto

**Archivo creado:** `CLAUDE.md` (raíz del repositorio)

Archivo de contexto persistente para Claude Code. Documenta los comandos de desarrollo, la arquitectura del proyecto y las convenciones críticas para que futuras instancias puedan trabajar sin re-explicar el contexto.

---

## 2. Estructura de páginas de documentación

**Archivos creados:** 17 páginas MDX bajo `claudessd-page/src/content/docs/`

Se creó la estructura completa de contenido del sitio, organizada en 5 secciones:

### `claude-code/` — 7 páginas
| Archivo | Contenido |
|---------|-----------|
| `intro.mdx` | Qué es Claude Code, el loop agéntico y las herramientas nativas |
| `instalacion.mdx` | Instalación por plataforma y autenticación |
| `sesiones.mdx` | Sesiones, git worktrees y la ventana de contexto |
| `claude-md.mdx` | CLAUDE.md: niveles, estructura y límites reales |
| `modos-permisos.mdx` | Plan Mode, checkpoints y modos de operación |
| `extensiones.mdx` | Skills, Subagents, MCP servers y Hooks |
| `referencia-comandos.mdx` | Cheat sheet completo de comandos y flags |

### `sdd/` — 3 páginas
| Archivo | Contenido |
|---------|-----------|
| `intro.mdx` | Qué es SDD, diferencia con vibe coding |
| `fases.mdx` | Las 4 fases (Explorar → Planificar → Implementar → Commit) con plantillas |
| `por-que-mejora.mdx` | Por qué SDD produce mejor código con IA |

### `workflow/` — 2 páginas
| Archivo | Contenido |
|---------|-----------|
| `patron-efectivo.mdx` | El patrón efectivo de trabajo con ejemplos de prompt |
| `ejemplo-paso-a-paso.mdx` | Caso real: tabla de incidentes construida con SDD |

### `casos-de-uso/` — 3 páginas
| Archivo | Contenido |
|---------|-----------|
| `caso-1-claude-md.mdx` | CLAUDE.md como cerebro del equipo en FastAPI + React |
| `caso-2-documentacion.mdx` | Documentación automática con Plan Mode |
| `caso-3-ui-shadcn.mdx` | De wireframe a componente shadcn/ui |

### `buenas-practicas/` — 2 páginas
| Archivo | Contenido |
|---------|-----------|
| `tips.mdx` | Tips y recomendaciones para sacar el máximo provecho |
| `errores-comunes.mdx` | Anti-patrones: copy-paste ciego, prompts vagos, aprobar sin revisar |

---

## 3. Configuración del sidebar

**Archivo modificado:** `claudessd-page/astro.config.mjs`

- Título del sitio cambiado de `"My Docs"` a `"Claude Code + SDD"`
- URL de GitHub actualizada al repositorio real
- Sidebar completamente reescrito con las 5 secciones y sus 17 páginas, todas listadas manualmente (sin `autogenerate`)

---

## 4. Fix: error de YAML en frontmatter

**Archivo corregido:** `src/content/docs/claude-code/extensiones.mdx`

**Problema:** El parser YAML de Astro interpreta los dos puntos (`:`) dentro de un valor como el inicio de una nueva clave, rompiendo el frontmatter.

```yaml
# ❌ Causa error: "bad indentation of a mapping entry"
description: Extensiones de Claude Code: Skills, Subagents, MCP servers, Hooks y Plugins.

# ✅ Correcto: entrecomillar el valor
description: "Extensiones de Claude Code: Skills, Subagents, MCP servers, Hooks y Plugins."
```

---

## 5. Landing page personalizada

**Archivo creado:** `claudessd-page/src/pages/index.astro`

Se creó una página de inicio completamente personalizada que **no usa el layout de Starlight**, dando control total sobre el diseño.

### Por qué no se usó `index.mdx`

`src/content/docs/index.mdx` con Starlight tiene estas limitaciones insalvables:
- Siempre renderiza dentro del layout de Starlight (header propio, estructura fija)
- `template: splash` solo elimina el sidebar, no el resto del chrome
- Sin control del `<head>` — no se puede inyectar CDN, fuentes externas ni config de tema
- No permite HTML/CSS arbitrario para layouts complejos (sticky header propio, dot-grid, secciones custom)

### Cómo funciona la prioridad de rutas en Astro

`src/pages/index.astro` toma prioridad sobre las rutas generadas por el content collection de Starlight para la ruta `/`. La página de docs queda disponible en otras rutas (`/claude-code/intro`, etc.).

### Stack de la landing
- **Tailwind CSS** vía CDN (`https://cdn.tailwindcss.com`)
- **Google Fonts** — Inter (tipografía), Material Symbols Outlined (iconos)
- **Paleta de colores:** primary `#f4371a` (rojo), background-dark `#221210`

### Secciones de la landing
1. **Header** — sticky, con blur backdrop, logo, breadcrumb de navegación, botón GitHub, CTA "Get Started"
2. **Hero** — dot-grid background, badge "Innovación", h1 grande, subtítulo, botón CTA, terminal mock animado
3. **Core Capabilities** — 3 cards con hover effect (shadow + translate-y + barra inferior animada)
4. **Built for Modern Teams** — grid 2 columnas: lista de features + terminal mock con `animate-pulse`
5. **Footer** — logo, links, copyright

---

## 6. Fix: scripts sin procesar en Astro

**Archivo modificado:** `src/pages/index.astro`

**Problema:** Astro procesa todos los `<script>` tags como módulos ES — los analiza, bundlea e intenta resolver imports. El CDN de Tailwind no es un módulo ES: carga en runtime del navegador y expone `tailwind` como variable global. Al bundlearlo, Astro lo rompe y la página queda sin estilos.

**Fix:** Añadir el atributo `is:inline` a los scripts que no deben ser procesados:

```html
<!-- ❌ Astro lo bundlea → sin estilos -->
<script src="https://cdn.tailwindcss.com..."></script>
<script>tailwind.config = { ... }</script>

<!-- ✅ Astro lo emite tal cual al HTML final -->
<script is:inline src="https://cdn.tailwindcss.com..."></script>
<script is:inline>tailwind.config = { ... }</script>
```

**Regla:** cualquier `<script>` que dependa de variables globales del browser o cargue desde un CDN externo debe usar `is:inline`.

---

## 7. Efectos interactivos en el hero

**Archivo modificado:** `src/pages/index.astro`

Se añadieron dos efectos al pasar el mouse por el hero:

### Efecto 1: Spotlight

Un glow rojo suave sigue el cursor sobre el dot-grid del hero.

**Implementación:**
- CSS custom properties `--mouse-x` y `--mouse-y` en el elemento `#hero-section`
- Un `div.hero-spotlight` con `background: radial-gradient(700px circle at var(--mouse-x) var(--mouse-y), rgba(244,55,26,0.10), transparent 65%)`
- `opacity: 0` por defecto, `opacity: 1` en `:hover` con `transition: 0.5s`
- JS: `mousemove` listener calcula la posición relativa del cursor y actualiza las custom properties

```js
heroSection.addEventListener('mousemove', (e) => {
  const rect = heroSection.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  heroSection.style.setProperty('--mouse-x', x + '%');
  heroSection.style.setProperty('--mouse-y', y + '%');
});
```

### Efecto 2: Tilt 3D

La card del hero visual (`#hero-card`) se inclina en 3D siguiendo el cursor, máximo ±6°.

**Implementación:**
- JS: `mousemove` listener calcula `dx`/`dy` normalizados (−1 a 1) respecto al centro de la card
- Aplica `transform: perspective(1000px) rotateX(Xdeg) rotateY(Ydeg) scale(1.01)`
- En `mouseleave` vuelve a `rotateX(0) rotateY(0) scale(1)` suavemente (transition 0.12s)
- CSS: `will-change: transform` para optimizar el repaint

```js
heroCard.addEventListener('mousemove', (e) => {
  const rect = heroCard.getBoundingClientRect();
  const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
  const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
  heroCard.style.transform =
    `perspective(1000px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg) scale(1.01)`;
});
```

---

## Estado actual del proyecto

```
claudessd-page/
├── astro.config.mjs          # Sidebar con 5 secciones y 17 páginas
├── src/
│   ├── pages/
│   │   └── index.astro       # Landing page personalizada (Tailwind CDN + efectos JS)
│   └── content/docs/
│       ├── index.mdx         # (inactivo en /)
│       ├── claude-code/      # 7 páginas
│       ├── sdd/              # 3 páginas
│       ├── workflow/         # 2 páginas
│       ├── casos-de-uso/     # 3 páginas
│       └── buenas-practicas/ # 2 páginas
CLAUDE.md                     # Contexto para Claude Code
DESARROLLO.md                 # Este archivo
```
