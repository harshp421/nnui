<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import DocsPage from '$lib/components/docs/docs-page.svelte';
	import PageHeader from '$lib/components/docs/page-header.svelte';
	import CodeBlock from '$lib/components/docs/code-block.svelte';
</script>

<Seo
	title="Introduction"
	description="nnuikit is a collection of accessible Svelte 5 components with a customizable design token system. Copy and paste components into your project."
/>

<DocsPage>
	<PageHeader
		title="Introduction"
		description="A collection of accessible, customizable Svelte 5 components. Use the CLI to copy component source directly into your project — you own every line of code."
	/>

	<div class="flex flex-col gap-10">

		<section class="flex flex-col gap-4">
			<h2 class="text-2xl font-bold tracking-tight">What is nnuikit?</h2>
			<p class="text-base leading-relaxed text-text-neutral-secondary">
				nnuikit is <strong class="text-text-neutral-primary">not a traditional component library</strong>.
				Instead of importing pre-built components from a package, you use the CLI to copy
				component source code directly into your project. The result:
			</p>
			<ul class="flex flex-col gap-2">
				<li class="flex items-start gap-2.5 text-sm leading-relaxed text-text-neutral-secondary">
					<svg class="mt-0.5 size-4 shrink-0 text-text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					You own 100% of the component code — modify anything freely
				</li>
				<li class="flex items-start gap-2.5 text-sm leading-relaxed text-text-neutral-secondary">
					<svg class="mt-0.5 size-4 shrink-0 text-text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					No version lock-in or breaking changes from upstream updates
				</li>
				<li class="flex items-start gap-2.5 text-sm leading-relaxed text-text-neutral-secondary">
					<svg class="mt-0.5 size-4 shrink-0 text-text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					3-layer design token system — brand color, dark mode, and per-component overrides
				</li>
				<li class="flex items-start gap-2.5 text-sm leading-relaxed text-text-neutral-secondary">
					<svg class="mt-0.5 size-4 shrink-0 text-text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					Built for Svelte 5 with runes, Tailwind CSS v4, and full keyboard accessibility
				</li>
			</ul>
		</section>

		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
			<div class="flex flex-col gap-1">
				<div class="flex gap-4">
					<div class="flex flex-col items-center">
						<div class="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">1</div>
						<div class="mt-1 w-px flex-1 bg-border-neutral-l4"></div>
					</div>
					<div class="flex flex-col gap-2 pb-6 min-w-0">
						<p class="text-sm font-medium text-text-neutral-primary">Initialize nnuikit</p>
						<p class="text-sm text-text-neutral-tertiary">Creates config, writes base design tokens, installs dependencies.</p>
						<CodeBlock code="npx nnuikit init" language="bash" />
					</div>
				</div>
				<div class="flex gap-4">
					<div class="flex flex-col items-center">
						<div class="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">2</div>
						<div class="mt-1 w-px flex-1 bg-border-neutral-l4"></div>
					</div>
					<div class="flex flex-col gap-2 pb-6 min-w-0">
						<p class="text-sm font-medium text-text-neutral-primary">Add components</p>
						<p class="text-sm text-text-neutral-tertiary">Copies component source into <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">src/lib/components/ui/</code>.</p>
						<CodeBlock code="npx nnuikit add button checkbox" language="bash" />
					</div>
				</div>
				<div class="flex gap-4">
					<div class="flex flex-col items-center">
						<div class="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">3</div>
					</div>
					<div class="flex flex-col gap-2 min-w-0">
						<p class="text-sm font-medium text-text-neutral-primary">Import and use</p>
						<CodeBlock
							code={`<script lang="ts">
  import { Button } from '$lib/components/ui/button';
</script>

<Button variant="primary">Click me</Button>`}
							language="svelte"
						/>
					</div>
				</div>
			</div>
		</section>

		<section class="flex flex-col gap-4">
			<h2 class="text-2xl font-bold tracking-tight">Available Components</h2>
			<p class="text-sm leading-relaxed text-text-neutral-secondary">Click a component to see its documentation, variants, and usage examples.</p>
			<div class="grid gap-3 md:grid-cols-2">
				<a
					href="/docs/components/button"
					class="group flex flex-col gap-1 rounded-xl border border-border-neutral-l4 p-5 transition-all hover:border-border-brand-l3 hover:bg-surface-brand-l1"
				>
					<h3 class="text-sm font-semibold text-text-neutral-primary group-hover:text-text-brand-primary">
						Button
					</h3>
					<p class="text-xs leading-relaxed text-text-neutral-secondary">
						Multiple variants, sizes, icon support, and accessible design.
					</p>
				</a>
				<a
					href="/docs/components/checkbox"
					class="group flex flex-col gap-1 rounded-xl border border-border-neutral-l4 p-5 transition-all hover:border-border-brand-l3 hover:bg-surface-brand-l1"
				>
					<h3 class="text-sm font-semibold text-text-neutral-primary group-hover:text-text-brand-primary">
						Checkbox
					</h3>
					<p class="text-xs leading-relaxed text-text-neutral-secondary">
						Multiple sizes, indeterminate state, and keyboard accessible.
					</p>
				</a>
			</div>
		</section>

	</div>
</DocsPage>
