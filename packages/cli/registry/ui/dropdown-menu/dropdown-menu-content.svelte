<script lang="ts">
  import { cn } from "$lib/utils/tailwindUtil.js";
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    sideOffset = 4,
    portalProps,
    class: className,
    variant = "default",
    ...restProps
  }: DropdownMenuPrimitive.ContentProps & {
    portalProps?: DropdownMenuPrimitive.PortalProps;
    variant?: "default" | "glass";
  } = $props();
</script>

<!-- when applying backdrop filter the submenu content is not visible -->
<DropdownMenuPrimitive.Portal {...portalProps}>
  <DropdownMenuPrimitive.Content
    bind:ref
    data-slot="dropdown-menu-content"
    {sideOffset}
    class={cn(
      "bg-glass-blur-surface backdrop-blur-sm border border-glass-blur-border text-glass-text-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--bits-dropdown-menu-content-available-height) origin-(--bits-dropdown-menu-content-transform-origin) z-50 min-w-128 overflow-y-auto overflow-x-hidden rounded-12 p-8 shadow-[2px_2px_30px_0px_var(--color-alpha-pure-black-100)] inset-shadow-xs outline-none",

      className,
    )}
    {...restProps}
  />
</DropdownMenuPrimitive.Portal>
