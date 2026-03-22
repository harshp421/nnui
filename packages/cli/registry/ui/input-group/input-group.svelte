<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils/tailwindUtil.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...props
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="input-group"
  role="group"
  class={cn(
    "group/input-group shadow-xs relative flex w-full items-center rounded-input-default-radius border outline-none transition-[color,box-shadow,background-color]",
    // Default state
    "bg-input-box-default-surface border-input-box-default-border",
    "has-[>textarea]:h-auto",

    // Variants based on alignment.

    "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
    // Hover state
    "hover:bg-input-box-hover-surface hover:border-input-box-hover-border",
    "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",

    // Focus state.
    "has-[[data-slot=input-group-control]:focus-visible]:bg-input-box-active-surface has-[[data-slot=input-group-control]:focus-visible]:border-input-box-active-border has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-surface-brand-primary/50",

    //warning state.
    "has-[[data-slot][aria-warning=true]]:bg-input-box-warning-surface has-[[data-slot][aria-warning=true]]:border-input-box-warning-border has-[[data-slot][aria-warning=true]]:ring-surface-warning-primary/50",
    // Error state.
    "has-[[data-slot][aria-invalid=true]]:bg-input-box-destructive-surface has-[[data-slot][aria-invalid=true]]:border-input-box-destructive-border has-[[data-slot][aria-invalid=true]]:ring-surface-destructive-primary/50",

    className,
  )}
  {...props}
>
  {@render children?.()}
</div>
