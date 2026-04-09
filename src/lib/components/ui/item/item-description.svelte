<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils/tailwindUtil.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
  bind:this={ref}
  data-slot="item-description"
  class={cn(
    "line-clamp-2 text-balance text-xs font-normal leading-normal text-text-neutral-secondary",
    "group-data-[variant=default]/item:text-item-default-description",
    "group-data-[variant=success]/item:text-item-success-description",
    "group-data-[variant=error]/item:text-item-error-description",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</p>
