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
    "text-text-neutral-secondary line-clamp-2 text-balance text-xs font-normal leading-normal",
    "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
    "group-data-[variant=attachment]/item:text-darg-drop-attachment-default-text-file-size",
    "group-data-[variant=attachment-success]/item:text-darg-drop-attachment-success-text-file-size",
    "group-data-[variant=attachment-error]/item:text-darg-drop-attachment-error-text-file-size",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</p>
