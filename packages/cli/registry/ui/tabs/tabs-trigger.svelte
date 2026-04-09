<script lang="ts">
  import { Tabs as TabsPrimitive } from "bits-ui";
  import { cn } from "$lib/utils/tailwindUtil.js";

  // Define types for size and variant (must match TabsList)
  type Size = "fit-content" | "full-width";
  type Variant = "secondary" | "primary" | "contained" | "brand";

  let {
    ref = $bindable(null),
    size = $bindable<Size>("fit-content"),
    variant = $bindable<Variant>("secondary"),
    class: className,
    ...restProps
  }: TabsPrimitive.TriggerProps & {
    size?: Size;
    variant?: Variant;
  } = $props();

  const variantClasses = $derived.by(() => {
    switch (variant) {
      case "secondary":
        return {
          base: "transition-colors",
          active:
            "data-[state=active]:border-b-2 data-[state=active]:border-b-tab-active-normal-border data-[state=active]:text-tab-active-normal-text data-[state=active]:[&>svg]:text-tab-active-normal-icon shadow-none",
        };
      case "primary":
        return {
          base: "",
          active:
            "border-b-2 data-[state=active]:border-b-tab-active-normal-border data-[state=active]:text-tab-active-normal-text data-[state=active]:[&>svg]:text-tab-active-normal-icon shadow-none",
        };
      case "contained":
        return {
          base: "border border-tab-hover-border rounded-none first:rounded-l-[6px] last:rounded-r-[6px]",
          active:
            "data-[state=active]:bg-tab-active-normal-contained-surface data-[state=active]:text-tab-active-normal-text data-[state=active]:[&>svg]:text-tab-active-normal-icon shadow-none",
        };
      case "brand":
        return {
          base: "transition-colors",
          active:
            "data-[state=active]:border-b-2 data-[state=active]:border-b-tab-active-brand-border data-[state=active]:text-tab-active-brand-text data-[state=active]:[&>svg]:text-tab-active-brand-icon shadow-none",
        };
    }
  });
</script>

<TabsPrimitive.Trigger
  bind:ref
  data-slot="tabs-trigger"
  class={cn(
    "inline-flex flex-1 gap-tabs-gap p-tabs-padding-all-sides h-tabs-height items-center justify-center whitespace-nowrap  font-medium rounded-tabs-radius transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-brand-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    "text-tab-default-text [&>svg]:text-tab-default-icon [&>svg]:size-tabs-icon-size",
    "hover:bg-tab-hover-normal-surface hover:text-tab-hover-text hover:[&>svg]:text-tab-hover-icon hover:border-b-tab-hover-border",
    variantClasses.base,
    variantClasses.active,
    className,
  )}
  {...restProps}
/>
