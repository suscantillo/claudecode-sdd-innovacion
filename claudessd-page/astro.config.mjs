// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Claude Code + SDD',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/suscantillo/claudecode-sdd-innovacion' }],
			customCss: ['./src/styles/custom.css'],
			components: {
				PageTitle: './src/components/starlight/PageTitle.astro',
			},
			sidebar: [
				{
					label: 'Claude Code',
					items: [
						{ label: '¿Qué es Claude Code?', slug: 'claude-code/intro' },
						{ label: 'Instalación', slug: 'claude-code/instalacion' },
						{ label: 'Sesiones, Worktrees y Contexto', slug: 'claude-code/sesiones' },
						{ label: 'CLAUDE.md', slug: 'claude-code/claude-md' },
						{ label: 'Modos y Permisos', slug: 'claude-code/modos-permisos' },
						{ label: 'Skills, Subagents, MCP y Hooks', slug: 'claude-code/extensiones' },
						{ label: 'Referencia de Comandos', slug: 'claude-code/referencia-comandos' },
					],
				},
				{
					label: 'SDD',
					items: [
						{ label: '¿Qué es SDD?', slug: 'sdd/intro' },
						{ label: 'Las 4 Fases de SDD', slug: 'sdd/fases' },
						{ label: 'Por qué SDD mejora el código de IA', slug: 'sdd/por-que-mejora' },
					],
				},
				{
					label: 'Workflow',
					items: [
						{ label: 'Patrón Efectivo de Trabajo', slug: 'workflow/patron-efectivo' },
						{ label: 'Ejemplo Paso a Paso', slug: 'workflow/ejemplo-paso-a-paso' },
					],
				},
				{
					label: 'Casos de Uso',
					items: [
						{ label: 'CLAUDE.md como cerebro del equipo', slug: 'casos-de-uso/caso-1-claude-md' },
						{ label: 'Documentación automática con Plan Mode', slug: 'casos-de-uso/caso-2-documentacion' },
						{ label: 'De wireframe a componente shadcn/ui', slug: 'casos-de-uso/caso-3-ui-shadcn' },
					],
				},
				{
					label: 'Buenas Prácticas',
					items: [
						{ label: 'Tips y Recomendaciones', slug: 'buenas-practicas/tips' },
						{ label: 'Errores Comunes', slug: 'buenas-practicas/errores-comunes' },
					],
				},
			],
		}),
	],
});
