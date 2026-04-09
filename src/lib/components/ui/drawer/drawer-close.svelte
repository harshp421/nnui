<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		children,
		class: className,
		...restProps
	}: HTMLButtonAttributes & {
		ref?: HTMLButtonElement | null;
		children?: any;
	} = $props();
</script>

<DrawerPrimitive.Close bind:ref data-slot="drawer-close" class={className} {...restProps}>
	<slot />
</DrawerPrimitive.Close>
