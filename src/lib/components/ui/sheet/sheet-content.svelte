<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";
	export const sheetVariants = tv({
		base: "bg-sheet-surface px-12 border border-sheet-border text-sheet-text data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-16 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 glass:backdrop-blur-xl glass:backdrop-saturate-150",
		variants: {
			side: {
				top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
				bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
				left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 start-0 h-full w-3/4 border-e sm:max-w-sm",
				right: "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 end-0 h-full w-3/4 border-s sm:max-w-sm",
			},
		},
		defaultVariants: {
			side: "right",
		},
	});

	export type Side = VariantProps<typeof sheetVariants>["side"];
</script>

<script lang="ts">
	import { Dialog as SheetPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";
	import SheetOverlay from "./sheet-overlay.svelte";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils/tailwindUtil.js";
    import IconCross from "./icon-cross.svelte";

	let {
		ref = $bindable(null),
		class: className,
		side = "right",
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
		portalProps?: SheetPrimitive.PortalProps;
		side?: Side;
		children: Snippet;
	} = $props();
</script>

<SheetPrimitive.Portal {...portalProps}>
	<SheetOverlay />
	<SheetPrimitive.Content
		bind:ref
		data-slot="sheet-content"
		class={cn(sheetVariants({ side }), className)}
		{...restProps}
	>
		
			{@render children?.()}
		
		<SheetPrimitive.Close
			class="absolute end-16 top-16 rounded-6 text-sheet-close-icon transition-opacity hover:text-sheet-close-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-brand-primary/50 disabled:pointer-events-none"
		>
			<IconCross className="size-16" />
			<span class="sr-only">Close</span>
		</SheetPrimitive.Close>
	</SheetPrimitive.Content>
</SheetPrimitive.Portal>
