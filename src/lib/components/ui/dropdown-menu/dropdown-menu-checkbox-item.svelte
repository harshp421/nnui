<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils/tailwindUtil.js";
	import type { Snippet } from "svelte";
	import IconCheck from "./icon-check.svelte";
	import IconMinus from "./icon-minus.svelte";

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		children: childrenProp,
		...restProps
	}: DropdownMenuPrimitive.CheckboxItemProps & {
		indeterminate?: boolean;
		children?: Snippet;
	} = $props();
</script>

<DropdownMenuPrimitive.CheckboxItem
	bind:ref
	bind:checked
	data-slot="dropdown-menu-checkbox-item"
	class={cn(
		"focus:bg-alpha-viceversa-black-25 focus:text-glass-text-primary outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pe-8 ps-32 text-sm data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		className
	)}
	{...restProps}
>
	{#snippet children({ checked: isChecked })}
		<span
			class="pointer-events-none absolute start-8 flex size-3.5 items-center justify-center"
		>
			{#if indeterminate}
				<IconMinus className="size-3.5" />
			{:else if isChecked}
				<IconCheck className="size-3.5" />
			{/if}
		</span>
		{@render childrenProp?.()}
	{/snippet}
</DropdownMenuPrimitive.CheckboxItem>
