<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		rounded = 'rounded',
		className = '',
		children
	}: {
		rounded?: 'rounded' | 'semi-rounded' | 'square';
		className?: string;
		children?: Snippet;
	} = $props();

	const radiusMap = {
		rounded: 'rounded-full',
		'semi-rounded': 'rounded-lg',
		square: 'rounded-none'
	};
</script>

<span
	class="inline-flex items-center justify-center size-8 shrink-0 {radiusMap[rounded]} {className}"
>
	{#if children}
		{@render children()}
	{/if}
</span>
