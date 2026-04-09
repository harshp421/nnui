<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { DocsPage, PageHeader } from '$lib/components/docs';
</script>

<Seo
	title="Design Tracks"
	description="Switch your entire UI's visual language with one CSS class. Coming soon."
/>

<DocsPage>
	<PageHeader
		title="Design Tracks"
		description="One class. Every component transforms. Switch your entire UI's visual language — from flat to glass to clay — without touching a single component."
	/>

	<div class="mt-10 flex flex-col items-center gap-5 py-20 text-center">
		<div class="inline-flex items-center gap-2 rounded-full bg-surface-brand-l1 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-brand-primary">
			Coming Soon
		</div>
		<p class="max-w-md text-sm leading-relaxed text-text-neutral-secondary">
			Design Tracks will let you switch your entire UI's visual language with a single CSS class — Glassmorphism, Claymorphism, Neumorphism, Brutalist, and more. Every component adapts instantly.
		</p>
	</div>
</DocsPage>
