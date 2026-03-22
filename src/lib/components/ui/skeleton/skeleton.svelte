<script lang="ts">
	import {
		cn,
		type WithElementRef,
		type WithoutChildren,
	} from "$lib/utils/tailwindUtil.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildren<	
		WithElementRef<HTMLAttributes<HTMLDivElement>>
	> = $props();
</script>

<div
	bind:this={ref}
	data-slot="skeleton"
	class={cn("bg-surface-neutral-l3 animate-pulse rounded-8", className)}
	{...restProps}
></div>
