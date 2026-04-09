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
    "flex w-fit items-center gap-2 text-sm tracking-normal font-medium leading-snug",
    "group-data-[variant=attachment]/item:text-darg-drop-attachment-default-text-file-title",
    "group-data-[variant=attachment-success]/item:text-darg-drop-attachment-success-text-file-title",
    "group-data-[variant=attachment-error]/item:text-darg-drop-attachment-error-text-file-title",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
