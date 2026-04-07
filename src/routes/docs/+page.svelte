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

	<div class="flex flex-col gap-10 mt-16">

		<section class="flex flex-col gap-8 mt-16">
			<h2 class="text-2xl font-bold tracking-tight">What is nnuikit?</h2>
			<p class="text-base leading-relaxed text-text-neutral-secondary">
				nnuikit is <strong class="text-text-neutral-primary">not a traditional component library</strong>.
				Instead of importing pre-built components from a package, you use the CLI to copy
				component source code directly into your project. The result:
			</p>
			<ul class="flex flex-col gap-2">
				<li class="flex items-start gap-2.5 text-sm leading-relaxed text-text-neutral-secondary">
					<svg class="mt-0.5 size-16 shrink-0 text-text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					You own 100% of the component code — modify anything freely
				</li>
				<li class="flex items-start gap-2.5 text-sm leading-relaxed text-text-neutral-secondary">
					<svg class="mt-0.5 size-16 shrink-0 text-text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					No version lock-in or breaking changes from upstream updates
				</li>
				<li class="flex items-start gap-2.5 text-sm leading-relaxed text-text-neutral-secondary">
					<svg class="mt-0.5 size-16 shrink-0 text-text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					3-layer design token system — brand color, dark mode, and per-component overrides
				</li>
				<li class="flex items-start gap-2.5 text-sm leading-relaxed text-text-neutral-secondary">
					<svg class="mt-0.5 size-16 shrink-0 text-text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					Built for Svelte 5 with runes, Tailwind CSS v4, and full keyboard accessibility
				</li>
			</ul>
		</section>

		
	</div>
</DocsPage>
