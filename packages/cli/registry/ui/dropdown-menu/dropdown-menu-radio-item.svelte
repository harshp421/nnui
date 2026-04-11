<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	
	import { cn, type WithoutChild } from "$lib/utils/tailwindUtil.js";
    import IconCircle from "./icon-circle.svelte";

	let {
		ref = $bindable(null),
		class: className,
		children: childrenProp,
		...restProps
	}: WithoutChild<DropdownMenuPrimitive.RadioItemProps> = $props();
</script>

<DropdownMenuPrimitive.RadioItem
	bind:ref
	data-slot="dropdown-menu-radio-item"
	class={cn(
		"focus:bg-alpha-viceversa-black-25 focus:text-glass-text-primary outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pe-8 ps-32 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		className
	)}
	{...restProps}
>
	{#snippet children({ checked })}
		<span
			class="pointer-events-none [&>svg]:text-surface-brand-primary absolute inset-s-8 flex size-3.5 items-center justify-center"
		>
			{#if checked}
				<IconCircle className="size-2.5 fill-current" />
			{/if}
		</span>
		{@render childrenProp?.({ checked })}
	{/snippet}
</DropdownMenuPrimitive.RadioItem>
