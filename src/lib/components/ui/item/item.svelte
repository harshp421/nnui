<script lang="ts" module>
  import { tv, type VariantProps } from "tailwind-variants";

  export const itemVariants = tv({
    base: "group/item   gap-input-drag-drop-attachment-gap p-input-drag-drop-attachment-padding-all-sides [a]:hover:bg-accent/50 [a]:transition-colors focus-visible:border-ring focus-visible:ring-ring/50 flex flex-wrap items-center rounded-input-drag-drop-attachment-radius border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:ring-[3px]",
    variants: {
      variant: {
        attachment:
         "bg-darg-drop-attachment-default-surface border-darg-drop-attachment-default-border",
        "attachment-success":
          "bg-darg-drop-attachment-success-surface border-darg-drop-attachment-success-border",
        "attachment-error":
          "bg-darg-drop-attachment-error-surface border-darg-drop-attachment-error-border",
      },
    },
    defaultVariants: {
      variant: "attachment",
    },
  });

  export type ItemVariant = VariantProps<typeof itemVariants>["variant"];
</script>

<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils/tailwindUtil.js";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  let {
    ref = $bindable(null),
    class: className,
    child,
    variant,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    variant?: ItemVariant;
  } = $props();

  const mergedProps = $derived({
    class: cn(itemVariants({ variant }), className),
    "data-slot": "item",
    "data-variant": variant,
    ...restProps,
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div bind:this={ref} {...mergedProps}>
    {@render mergedProps.children?.()}
  </div>
{/if}
