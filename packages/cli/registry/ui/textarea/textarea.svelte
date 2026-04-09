<script lang="ts">
  import {
    cn,
    type WithElementRef,
    type WithoutChildren,
  } from "$lib/utils/tailwindUtil.js";
  import type { HTMLTextareaAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    "data-slot": dataSlot = "textarea",
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> = $props();
</script>

<textarea
  bind:this={ref}
  data-slot={dataSlot}
  class={cn(
    "flex min-h-input-long-text-height w-full rounded-input-long-text-radius border p-input-long-text-padding-all-sides gap-input-long-text-gap text-base outline-none transition-[color,box-shadow,background-color] disabled:cursor-not-allowed md:text-sm glass:backdrop-blur-md",
    // Default state
    "bg-input-box-default-surface border-input-box-default-border text-input-box-default-text placeholder:text-input-box-default-icon",
    // Hover state
    "hover:bg-input-box-hover-surface hover:border-input-box-hover-border hover:text-input-box-hover-text hover:placeholder:text-input-box-hover-icon",
    // Active (Focus) state
    "focus-visible:bg-input-box-active-surface focus-visible:border-input-box-active-border focus-visible:text-input-box-active-text focus-visible:placeholder:text-input-box-active-icon focus-visible:ring-[3px] focus-visible:ring-surface-brand-primary/50",
    // Disabled state
    "disabled:bg-input-box-disabled-surface disabled:border-input-box-disabled-border disabled:text-input-box-disabled-text disabled:placeholder:text-input-box-disabled-icon disabled:opacity-50",
    // Destructive (Invalid) state
    "aria-invalid:bg-input-box-destructive-surface aria-invalid:border-input-box-destructive-border aria-invalid:text-input-box-destructive-text aria-invalid:placeholder:text-input-box-destructive-icon aria-invalid:ring-surface-destructive-primary/20 dark:aria-invalid:ring-surface-destructive-primary/40",
    // Warning state
    "aria-[warning=true]:bg-input-box-warning-surface aria-[warning=true]:border-input-box-warning-border aria-[warning=true]:text-input-box-warning-text aria-[warning=true]:placeholder:text-input-box-warning-icon",
    className,
  )}
  bind:value
  {...restProps}
></textarea>
