<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import DocsPage from '$lib/components/docs/docs-page.svelte';
	import PageHeader from '$lib/components/docs/page-header.svelte';
	import CodeBlock from '$lib/components/docs/code-block.svelte';
	import Icon from '$lib/components/docs/icon.svelte';
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
					<Icon name="check" class="size-16 shrink-0 mt-0.5 text-text-brand-primary" />
					You own 100% of the component code — modify anything freely
				</li>
				<li class="flex items-start gap-2.5 text-sm leading-relaxed text-text-neutral-secondary">
					<Icon name="check" class="size-16 shrink-0 mt-0.5 text-text-brand-primary" />
					No version lock-in or breaking changes from upstream updates
				</li>
				<li class="flex items-start gap-2.5 text-sm leading-relaxed text-text-neutral-secondary">
					<Icon name="check" class="size-16 shrink-0 mt-0.5 text-text-brand-primary" />
					3-layer design token system — brand color, dark mode, and per-component overrides
				</li>
				<li class="flex items-start gap-2.5 text-sm leading-relaxed text-text-neutral-secondary">
					<Icon name="check" class="size-16 shrink-0 mt-0.5 text-text-brand-primary" />
					Built for Svelte 5 with runes, Tailwind CSS v4, and full keyboard accessibility
				</li>
			</ul>
		</section>

		
	</div>
</DocsPage>
