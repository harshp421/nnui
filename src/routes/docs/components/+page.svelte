<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { DocsPage, PageHeader } from '$lib/components/docs';

	const components = [
		{
			category: 'Form',
			items: [
				{ label: 'Button', href: '/docs/components/button', description: 'Variants, sizes, icon support, loading state.' },
				{ label: 'Checkbox', href: '/docs/components/checkbox', description: 'Checked, indeterminate, and disabled states.' },
				{ label: 'Input', href: '/docs/components/input-inputgroup', description: 'Text input with prefix, suffix, and input groups.' },
				{ label: 'Textarea', href: '/docs/components/textarea', description: 'Multi-line input with resize and character count.' },
				{ label: 'Radio Group', href: '/docs/components/radio-group', description: 'Single-select option group, keyboard accessible.' },
				{ label: 'Switch', href: '/docs/components/switch', description: 'Toggle between two states with smooth animation.' },
				{ label: 'Range Selector', href: '/docs/components/range-selector', description: 'Dual-thumb range slider for min/max value selection.' },
{ label: 'File Uploader', href: '/docs/components/file-uploader', description: 'Drag-and-drop file upload with progress and validation.' }
			]
		},
		{
			category: 'Data Display',
			items: [
				{ label: 'Avatar', href: '/docs/components/avatar', description: 'User image with fallback initials and status indicator.' },
				{ label: 'Badge', href: '/docs/components/badge', description: 'Compact label for status, counts, and categories.' },
				{ label: 'Breadcrumb', href: '/docs/components/breadcrumb', description: 'Navigation trail showing page hierarchy and location.' },
				{ label: 'Item', href: '/docs/components/item', description: 'Compound list item with media, content, and action slots.' },
				{ label: 'Tabs', href: '/docs/components/tabs', description: 'Tabbed interface for switching between content panels.' },
				{ label: 'Typography', href: '/docs/components/typography', description: 'Type scale, headings, and text utility reference.' }
			]
		},
		{
			category: 'Overlay',
			items: [
				{ label: 'Dialog', href: '/docs/components/dialog', description: 'Modal dialog with backdrop, focus trap, and animations.' },
{ label: 'Dropdown Menu', href: '/docs/components/dropdown-menu', description: 'Context and action menus with submenus and shortcuts.' },
				{ label: 'Sheet', href: '/docs/components/sheet', description: 'Side panel overlay for secondary content and forms.' },
				{ label: 'Toast', href: '/docs/components/toast', description: 'Temporary notification with variants and auto-dismiss.' },
				{ label: 'Tooltip', href: '/docs/components/tooltip', description: 'Contextual hint displayed on hover or focus.' }
			]
		},
		{
			category: 'Feedback',
			items: [
				{ label: 'Progress', href: '/docs/components/progress', description: 'Linear progress bar with labeled and animated variants.' },
				{ label: 'Skeleton', href: '/docs/components/skeleton', description: 'Loading placeholder that matches content shape.' }
			]
		},
		{
			category: 'Style',
			items: [
				{ label: 'Glass UI', href: '/docs/components/glass-ui', description: 'Frosted glass effects, shadows, and blur utilities.' },
				{ label: 'Mode Switch', href: '/docs/components/mode-switch', description: 'Light/dark mode toggle with system preference detection.' }
			]
		}
	];

	const total = components.reduce((n, s) => n + s.items.length, 0);
</script>

<Seo
	title="Components"
	description="Browse all nnuikit components — accessible, customizable Svelte 5 components built on a 3-layer design token system."
/>

<DocsPage>
	<PageHeader
		title="Components"
		description="Accessible, customizable components built for Svelte 5 and Tailwind CSS v4. Use the CLI to copy any component directly into your project."
	/>

	<div class="mt-8 flex flex-col gap-10">

		<!-- Stats row -->
		<div class="flex flex-wrap items-center gap-3">
			<span class="inline-flex items-center gap-1.5 rounded-full border border-border-neutral-l4 bg-surface-neutral-l1 px-3 py-1 text-xs font-medium text-text-neutral-secondary">
				<svg class="size-3 text-text-brand-primary" fill="currentColor" viewBox="0 0 8 8">
					<circle cx="4" cy="4" r="3" />
				</svg>
				{total} components
			</span>
			<span class="inline-flex items-center gap-1.5 rounded-full border border-border-neutral-l4 bg-surface-neutral-l1 px-3 py-1 text-xs font-medium text-text-neutral-secondary">
				Svelte 5
			</span>
			<span class="inline-flex items-center gap-1.5 rounded-full border border-border-neutral-l4 bg-surface-neutral-l1 px-3 py-1 text-xs font-medium text-text-neutral-secondary">
				Tailwind CSS v4
			</span>
			<span class="inline-flex items-center gap-1.5 rounded-full border border-border-neutral-l4 bg-surface-neutral-l1 px-3 py-1 text-xs font-medium text-text-neutral-secondary">
				Design tokens
			</span>
		</div>

		<!-- Component groups -->
		{#each components as group (group.category)}
			<section class="flex flex-col gap-4">
				<div class="flex items-center gap-3">
					<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">{group.category}</h2>
					<div class="h-px flex-1 bg-border-neutral-l4"></div>
					<span class="text-xs text-text-neutral-tertiary">{group.items.length}</span>
				</div>

				<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{#each group.items as item (item.href)}
						<a
							href={item.href}
							class="group flex flex-col gap-1.5 rounded-xl border border-border-neutral-l4 bg-surface-statics-vv-white p-5 transition-all hover:border-border-brand-l3 hover:bg-surface-brand-l1 hover:shadow-sm"
						>
							<div class="flex items-center justify-between">
								<h3 class="text-sm font-semibold text-text-neutral-primary transition-colors group-hover:text-text-brand-primary">
									{item.label}
								</h3>
								<svg
									class="size-5 text-text-neutral-tertiary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-text-brand-primary group-hover:opacity-100"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
								</svg>
							</div>
							<p class="text-xs leading-relaxed text-text-neutral-secondary">
								{item.description}
							</p>
						</a>
					{/each}
				</div>
			</section>
		{/each}

		<!-- CLI hint -->
		<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 px-5 py-4">
			<p class="text-sm text-text-neutral-secondary">
				Add any component with the CLI —
				<code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs text-text-neutral-primary">npx nnuikit add button</code>
				copies the source directly into your project.
				<a href="/docs/getting-started/installation" class="ml-1 text-text-brand-primary underline underline-offset-2">Installation guide →</a>
			</p>
		</div>

	</div>
</DocsPage>
