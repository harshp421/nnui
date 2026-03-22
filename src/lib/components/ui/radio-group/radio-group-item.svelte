<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/tailwindUtil.js';
	import { getContext } from 'svelte';
	import { RADIO_GROUP_CTX, type RadioGroupContext } from './context.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type RadioGroupItemProps = Omit<WithElementRef<HTMLInputAttributes>, 'size'> & {
		value: string;
	};

	let {
		ref = $bindable(null),
		class: className,
		value,
		disabled = false,
		...restProps
	}: RadioGroupItemProps = $props();

	const ctx = getContext<RadioGroupContext>(RADIO_GROUP_CTX);
	const isChecked = $derived(ctx.value === value);
</script>

<label
	bind:this={ref}
	data-slot="radio-group-item"
	class={cn('group inline-flex shrink-0 items-center', disabled && 'cursor-not-allowed')}
>
	<input
		type="radio"
		class="peer sr-only"
		name={ctx.name}
		{value}
		checked={isChecked}
		{disabled}
		onchange={() => ctx.select(value)}
		{...restProps}
	/>

	<div
		class={cn(
			'border-checkbox---radio-default-border bg-checkbox---radio-default-surface',
			'peer-checked:border-2 peer-checked:border-checkbox---radio-checked',
			'group-hover:bg-checkbox---radio-hover',
			'peer-focus-visible:ring-2 peer-focus-visible:ring-checkbox---radio-checked/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-base-vv-white',
			'peer-aria-invalid:ring-surface-destructive-l4/20 peer-aria-invalid:border-surface-destructive-l4',
			'peer-disabled:cursor-not-allowed peer-disabled:bg-checkbox---radio-disabled peer-disabled:opacity-50',
			'shadow-xs aspect-square shrink-0 rounded-full border outline-none transition-[color,box-shadow]',
			'flex items-center justify-center',
			ctx.size === 'sm' && 'size-checkbox---radio-small-size',
			ctx.size === 'md' && 'size-checkbox---radio-medium-size',
			ctx.size === 'lg' && 'size-checkbox---radio-large-size',
			className
		)}
	>
		{#if isChecked}
			<div
				class={cn(
					'rounded-full bg-checkbox---radio-checked',
					ctx.size === 'sm' && 'size-8',
					ctx.size === 'md' && 'size-12',
					ctx.size === 'lg' && 'size-16'
				)}
			></div>
		{/if}
	</div>
</label>
