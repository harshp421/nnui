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
  data-slot="item-title"
  class={cn(
    "flex w-fit items-center gap-2 text-sm font-medium leading-snug tracking-normal",
    "group-data-[variant=default]/item:text-item-default-title",
    "group-data-[variant=success]/item:text-item-success-title",
    "group-data-[variant=error]/item:text-item-error-title",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
