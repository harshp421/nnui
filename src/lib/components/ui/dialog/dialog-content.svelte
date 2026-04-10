<script lang="ts">
  import { cn, type WithoutChildrenOrChild } from "$lib/utils/tailwindUtil.js";
  import { Dialog as DialogPrimitive } from "bits-ui";
  import type { ComponentProps, Snippet } from "svelte";
  import DialogPortal from "./dialog-portal.svelte";
  import * as Dialog from "./index.js";
  import IconCross from "./icon-cross.svelte";

  let {
    ref = $bindable(null),
    class: className,
    portalProps,
    children,
    showCloseButton = true,
    ...restProps
  }: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DialogPortal>>;
    children: Snippet;
    showCloseButton?: boolean;
  } = $props();
</script>

<DialogPortal {...portalProps}>
  <Dialog.Overlay />
  <DialogPrimitive.Content
    bind:ref
    data-slot="dialog-content"
    class={cn(
      "rounded-modal-radius bg-modal-surface border border-modal-border shadow-lg glass:backdrop-blur-xl glass:backdrop-saturate-150",
      "fixed inset-s-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
      "grid w-full max-w-[calc(100%-2rem)] sm:w-modal-width",
      "max-h-modal-max-height overflow-hidden",
      "gap-modal-gap ",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",
      className,
    )}
    {...restProps}
  >
  <div class="p-modal-content-padding">
      {@render children?.()}
  </div>
    {#if showCloseButton}
      <DialogPrimitive.Close
        class="absolute end-16 top-16 flex items-center justify-center rounded-6 text-modal-header-secondary-text opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-brand-primary disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-20 [&_svg]:pointer-events-none [&_svg]:shrink-0"
      >
        <IconCross />
        <span class="sr-only">Close</span>
      </DialogPrimitive.Close>
    {/if}
  </DialogPrimitive.Content>
</DialogPortal>
