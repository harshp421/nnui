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
	data-slot="dialog-footer"
	class={cn(
		"flex flex-col-reverse sm:flex-row sm:justify-end",
		"bg-modal-footer-surface p-modal-footer-padding",
		"gap-modal-footer-footer-gap",
		"border-t border-modal-footer-border-top",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
