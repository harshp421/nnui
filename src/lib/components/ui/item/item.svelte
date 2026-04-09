<script lang="ts" module>
  import { tv, type VariantProps } from "tailwind-variants";

  export const itemVariants = tv({
    base: "group/item gap-item-gap p-item-padding flex flex-wrap items-center rounded-item-radius border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-surface-brand-primary/50",
    variants: {
      variant: {
        default:
          "bg-item-default-surface border-item-default-border",
        success:
          "bg-item-success-surface border-item-success-border",
        error:
          "bg-item-error-surface border-item-error-border",
      },
    },
    defaultVariants: {
      variant: "default",
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
    variant = "default",
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
