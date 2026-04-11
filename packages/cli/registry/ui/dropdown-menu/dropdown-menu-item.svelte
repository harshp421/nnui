<script lang="ts">
  import { cn } from "$lib/utils/tailwindUtil.js";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    inset,
    variant = "default",
    ...restProps
  }: DropdownMenuPrimitive.ItemProps & {
    inset?: boolean;
    variant?: "default" | "destructive";
  } = $props();
</script>

<DropdownMenuPrimitive.Item
  bind:ref
  data-slot="dropdown-menu-item"
  data-inset={inset}
  data-variant={variant}
  class={cn(
    "data-highlighted:bg-glass-surface-hover [&>svg]:text-glass-icon-active data-highlighted:text-glass-text-primary data-[variant=destructive]:text-surface-destructive-primary data-[variant=destructive]:data-highlighted:bg-surface-destructive-primary/10 dark:data-[variant=destructive]:data-highlighted:bg-surface-destructive-primary/20 data-[variant=destructive]:data-highlighted:text-surface-destructive-primary data-[variant=destructive]:*:[svg]:!text-surface-destructive-primary [&_svg:not([class*='text-'])]:text-glass-icon-active outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-4 py-8 text-sm data-[disabled]:pointer-events-none data-[inset]:ps-8 data-[disabled]:opacity-50  [&_svg]:pointer-events-none [&_svg]:shrink-0",
    className,
  )}
  {...restProps}
/>
