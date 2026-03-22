<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/tailwindUtil.js';
	import { setContext } from 'svelte';
	import { RADIO_GROUP_CTX, type RadioGroupContext } from './context.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type RadioGroupProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		value?: string;
		size?: 'sm' | 'md' | 'lg';
		name?: string;
	};

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(''),
		size = $bindable<'sm' | 'md' | 'lg'>('md'),
		name,
		children,
		...restProps
	}: RadioGroupProps = $props();

	setContext<RadioGroupContext>(RADIO_GROUP_CTX, {
		get size() {
			return size;
		},
		get value() {
			return value;
		},
		get name() {
			return name;
		},
		select(val: string) {
			value = val;
		}
	});
</script>

<div
	bind:this={ref}
	data-slot="radio-group"
	role="radiogroup"
	class={cn('grid gap-3', className)}
	{...restProps}
>
	{@render children?.()}
</div>
