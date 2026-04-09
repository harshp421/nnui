<script lang="ts">
	type IconName = 'check' | 'chevron-right' | 'arrow-right' | 'copy' | 'info' | 'x';

	let {
		name = 'check',
		class: className = 'size-4 shrink-0 text-text-brand-primary',
	}: {
		name?: IconName;
		class?: string;
	} = $props();

	const paths: Record<IconName, string> = {
		'check': 'M5 13l4 4L19 7',
		'chevron-right': 'M9 5l7 7-7 7',
		'arrow-right': 'M5 12h14m-7-7l7 7-7 7',
		'copy': 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',
		'info': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		'x': 'M6 18L18 6M6 6l12 12',
	};
</script>

<svg class={className} fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
	<path d={paths[name]} />
</svg>
