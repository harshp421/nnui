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
    "group-data-[variant=attachment]/item:text-darg-drop-attachment-default-text-progress",
    "group-data-[variant=attachment-success]/item:text-darg-drop-attachment-success-text-progress",
    "group-data-[variant=attachment-error]/item:text-darg-drop-attachment-error-text-progress",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
