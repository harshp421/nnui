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
  data-slot="item-footer"
  class={cn(
    "flex basis-full items-center justify-between gap-2",
    "group-data-[variant=default]/item:text-item-default-footer",
    "group-data-[variant=success]/item:text-item-success-footer",
    "group-data-[variant=error]/item:text-item-error-footer",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
