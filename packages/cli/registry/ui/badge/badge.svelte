<script lang="ts" module>
  import { type VariantProps, tv } from "tailwind-variants";
  export const badgeVariants = tv({
    base: "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap font-medium transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-20 [&_[data-slot=avatar-root]]:transition-all",
    variants: {
      variant: {
        // Primary/Brand variants
        primary:
          "bg-badge-brand-default-surface text-badge-brand-default-text [&>svg]:text-badge-brand-default-icon",
        "primary-bordered":
          "bg-badge-brand-bordered-surface text-badge-brand-bordered-text [&>svg]:text-badge-brand-bordered-icon border border-badge-brand-bordered-border",
        "primary-solid":
          "bg-badge-brand-solid-surface text-badge-brand-solid-text [&>svg]:text-badge-brand-solid-icon",

        // Neutral variants
        neutral:
          "bg-badge-neutral-default-surface text-badge-neutral-default-text [&>svg]:text-badge-neutral-default-icon",
        "neutral-bordered":
          "bg-badge-neutral-bordered-surface text-badge-neutral-bordered-text [&>svg]:text-badge-neutral-bordered-icon border border-badge-neutral-bordered-border",
        "neutral-solid":
          "bg-badge-neutral-solid-surface text-badge-neutral-solid-text [&>svg]:text-badge-neutral-solid-icon",

        // Destructive variants
        destructive:
          "bg-badge-destructive-default-surface text-badge-destructive-default-text [&>svg]:text-badge-destructive-default-icon",
        "destructive-bordered":
          "bg-badge-destructive-bordered-surface text-badge-destructive-bordered-text [&>svg]:text-badge-destructive-bordered-icon border border-badge-destructive-bordered-border",
        "destructive-solid":
          "bg-badge-destructive-solid-surface text-badge-destructive-solid-text [&>svg]:text-badge-destructive-solid-icon",

        // Warning variants
        warning:
          "bg-badge-warnig-default-surface text-badge-warnig-default-text [&>svg]:text-badge-warnig-default-icon",
        "warning-bordered":
          "bg-badge-warnig-bordered-surface text-badge-warnig-bordered-text [&>svg]:text-badge-warnig-bordered-icon border border-badge-warnig-bordered-border",
        "warning-solid":
          "bg-badge-warnig-solid-surface text-badge-warnig-solid-text [&>svg]:text-badge-warnig-solid-icon",

        // Success variants
        success:
          "bg-badge-success-default-surface text-badge-success-default-text [&>svg]:text-badge-success-default-icon",
        "success-bordered":
          "bg-badge-success-bordered-surface text-badge-success-bordered-text [&>svg]:text-badge-success-bordered-icon border border-badge-success-bordered-border",
        "success-solid":
          "bg-badge-success-solid-surface text-badge-success-solid-text [&>svg]:text-badge-success-solid-icon",

        // Info variants
        info: "bg-badge-info-default-surface text-badge-info-default-text [&>svg]:text-badge-info-default-icon",
        "info-bordered":
          "bg-badge-info-bordered-surface text-badge-info-bordered-text [&>svg]:text-badge-info-bordered-icon border border-badge-info-bordered-border",
        "info-solid":
          "bg-badge-info-solid-surface text-badge-info-solid-text [&>svg]:text-badge-info-solid-icon",
      },
      size: {
        sm: "h-badge-small-size rounded-badge-small-radius-semirounded gap-badge-small-gap p-badge-small-padding-all-sides text-[0.625rem] [&_[data-slot=avatar]]:size-badge-small-icon-size [&>svg]:size-badge-small-icon-size",
        md: "h-badge-medium-size rounded-badge-medium-radius-semirounded gap-badge-medium-gap p-badge-medium-padding-all-sides text-sm [&_[data-slot=avatar]]:size-badge-medium-icon-size [&>svg]:size-badge-medium-icon-size",
        lg: "h-badge-large-size rounded-badge-large-radius-semirounded gap-badge-large-gap p-badge-large-padding-all-sides [&_[data-slot=avatar]]:size-badge-large-icon-size [&>svg]:size-badge-large-icon-size",
      },
      rounded: {
        true: "rounded-full",
        false: "",
      },
    },
    compoundVariants: [
      // Small size with rounded variants
      {
        size: "sm",
        rounded: false,
        class: "rounded-badge-small-radius-semirounded",
      },
      {
        size: "sm",
        rounded: true,
        class: "rounded-badge-small-radius-fully-rounded",
      },
      // Medium size with rounded variants
      {
        size: "md",
        rounded: false,
        class: "rounded-badge-medium-radius-semirounded",
      },
      {
        size: "md",
        rounded: true,
        class: "rounded-badge-medium-radius-fully-rounded",
      },
      // Large size with rounded variants
      {
        size: "lg",
        rounded: false,
        class: "rounded-badge-large-radius-semirounded",
      },
      {
        size: "lg",
        rounded: true,
        class: "rounded-full",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: false,
    },
  });
  export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
  export type BadgeSize = VariantProps<typeof badgeVariants>["size"];
  export type BadgeRounded = VariantProps<typeof badgeVariants>["rounded"];
</script>

<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "$lib/utils/utils";
  import type { WithElementRef } from "bits-ui";

  let {
    ref = $bindable(null),
    href,
    class: className,
    variant = "primary",
    size = "md",
    rounded = false,
    children,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> & {
    variant?: BadgeVariant;
    size?: BadgeSize;
    rounded?: BadgeRounded;
  } = $props();

  const badgeClasses = $derived(
    cn(badgeVariants({ variant, size, rounded }), className),
  );
</script>

<svelte:element
  this={href ? "a" : "span"}
  bind:this={ref}
  data-slot="badge"
  data-badge-rounded={rounded}
  {href}
  class={badgeClasses}
  {...restProps}
>
  {@render children?.()}
</svelte:element>

<style>
</style>
