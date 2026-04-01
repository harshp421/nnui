<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import { cn } from "$lib/utils/tailwindUtil.js";

  let {
    ref = $bindable(null),
    class: className,
    portalProps,
    ...restProps
  }: DropdownMenuPrimitive.SubContentProps & {
    portalProps?: DropdownMenuPrimitive.PortalProps;
  } = $props();
</script>

<DropdownMenuPrimitive.Portal {...portalProps}>
  <DropdownMenuPrimitive.SubContent
    bind:ref
    data-slot="dropdown-menu-sub-content"
    class={cn(
      "bg-glass-blur-surface noise backdrop-blur-light border border-glass-blur-border text-alpha-viceversa-black-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-dropdown-menu-content-transform-origin) z-50 min-w-128 overflow-hidden rounded-12 p-8 shadow-[2px_2px_30px_0px_var(--color-alpha-pure-black-100)]",
      className,
    )}
    {...restProps}
  />
</DropdownMenuPrimitive.Portal>
