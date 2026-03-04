# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Astro + Starlight** documentation site. The actual project lives in `claudessd-page/` — the root directory only contains a minimal `package.json`. All development commands should be run from `claudessd-page/`.

## Commands

Run from `claudessd-page/`:

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview the built site locally
```

## Architecture

- **Framework:** Astro with the Starlight documentation theme
- **Content:** All documentation lives in `src/content/docs/` as `.md` or `.mdx` files
- **Sidebar:** Configured in `astro.config.mjs` — the `sidebar` array controls navigation. All sections use manually listed items (no `autogenerate`)
- **Content collections:** Defined in `src/content.config.ts` using Starlight's `docsLoader` and `docsSchema`
- **Static assets:** Images referenced in content go in `src/assets/`; files served directly go in `public/`

## Content Structure

```
src/content/docs/
├── index.mdx                    # Home/splash page
├── claude-code/                 # 7 pages: intro, instalacion, sesiones, claude-md, modos-permisos, extensiones, referencia-comandos
├── sdd/                         # 3 pages: intro, fases, por-que-mejora
├── workflow/                    # 2 pages: patron-efectivo, ejemplo-paso-a-paso
├── casos-de-uso/                # 3 pages: caso-1-claude-md, caso-2-documentacion, caso-3-ui-shadcn
└── buenas-practicas/            # 2 pages: tips, errores-comunes
```

New pages are added as `.mdx` files under the appropriate section directory. The file path determines the URL slug. When adding a new page, also add it to the corresponding `sidebar` section in `astro.config.mjs`.

## Landing Page

`src/pages/index.astro` is a fully custom page (bypasses Starlight layout) that uses Tailwind CSS via CDN. It takes routing priority over `src/content/docs/index.mdx` for the `/` path.

**Astro script rule:** Any `<script>` that loads an external CDN or relies on browser globals must use `is:inline`, otherwise Astro bundles it as an ES module and breaks it:

```html
<!-- correct -->
<script is:inline src="https://cdn.tailwindcss.com..."></script>
<script is:inline>tailwind.config = { ... }</script>
```

## YAML Frontmatter

Colons inside `description` values must be quoted to avoid YAML parse errors:

```yaml
# Wrong
description: Claude Code: herramientas nativas

# Correct
description: "Claude Code: herramientas nativas"
```
