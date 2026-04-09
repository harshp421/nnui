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

<DrawerPrimitive.Trigger bind:ref data-slot="drawer-trigger" class={className} {...restProps}>
	<slot />
</DrawerPrimitive.Trigger>
