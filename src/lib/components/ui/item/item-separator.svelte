<script lang="ts">
	import { cn } from "$lib/utils/tailwindUtil.js";

	let {
		class: className,
		...restProps
	}: { class?: string; [key: string]: any } = $props();
</script>

<div
	data-slot="item-separator"
	class={cn("my-0 h-px w-full bg-border-neutral-l4", className)}
	role="separator"
	{...restProps}
></div>
