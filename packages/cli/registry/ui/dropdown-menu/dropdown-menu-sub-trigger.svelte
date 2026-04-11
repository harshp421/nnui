<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import { cn } from "$lib/utils/tailwindUtil.js";
	import IconChevronright from "./icon-chevronright.svelte";
	

  let {
    ref = $bindable(null),
    class: className,
    inset,
    children,
    ...restProps
  }: DropdownMenuPrimitive.SubTriggerProps & {
    inset?: boolean;
  } = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
  bind:ref
  data-slot="dropdown-menu-sub-trigger"
  data-inset={inset}
  class={cn(
    "data-highlighted:bg-glass-surface-hover [&>svg]:text-glass-icon-active data-highlighted:text-glass-text-primary data-[state=open]:bg-glass-surface-hover data-[state=open]:text-glass-text-primary outline-hidden [&_svg:not([class*='text-'])]:text-glass-icon-active flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm data-[disabled]:pointer-events-none data-[inset]:ps-8 data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-16 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    className,
  )}
  {...restProps}
>
  {@render children?.()}

  <span class="pointer-events-none   absolute inset-e-4 flex size-3.5 items-center justify-center">
				  <IconChevronright class="size-3.5" />
	</span>
</DropdownMenuPrimitive.SubTrigger>
