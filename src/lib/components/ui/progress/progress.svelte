<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const progressVariants = tv({
		base: 'h-progress-bar-tube-hegiht w-full overflow-hidden flex-1 rounded-progress-bar-tube-radius transition-all',
		variants: {
			variant: {
				default: 'bg-progress-bar-progress-bar-brand',
				neutral: 'bg-progress-bar-progress-bar-neutral',
				red: 'bg-progress-bar-progress-bar-red',
				success: 'bg-progress-bar-progress-bar-success',
				blue: 'bg-progress-bar-progress-bar-blue',
				yellow: 'bg-progress-bar-progress-bar-yellow'
			}
		}
	});

	export type ProgressVariant = VariantProps<typeof progressVariants>['variant'];

	export type ProgressProps = {
		ref?: HTMLDivElement | null;
		class?: string;
		value?: number;
		max?: number;
		variant?: ProgressVariant;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils/tailwindUtil.js';

	let {
		ref = $bindable(null),
		class: className,
		max = 100,
		value = 0,
		variant = 'default',
		...restProps
	}: ProgressProps = $props();

	const percentage = $derived(Math.min(100, Math.max(0, (100 * (value ?? 0)) / (max ?? 1))));
</script>

<div
	bind:this={ref}
	data-slot="progress"
	role="progressbar"
	aria-valuenow={value}
	aria-valuemin={0}
	aria-valuemax={max}
	class={cn(
		'bg-progress-bar-track-bar relative h-progress-bar-tube-hegiht w-full overflow-hidden rounded-progress-bar-tube-radius',
		className
	)}
	{...restProps}
>
	<div
		data-slot="progress-indicator"
		class={cn(progressVariants({ variant }))}
		style="transform: translateX(-{100 - percentage}%)"
	></div>
</div>
