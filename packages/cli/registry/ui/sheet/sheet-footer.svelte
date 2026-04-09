<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils/tailwindUtil.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="sheet-footer"
	class={cn("mt-auto flex flex-col gap-8 p-16", className)}
	{...restProps}
>
	{@render children?.()}
</div>
