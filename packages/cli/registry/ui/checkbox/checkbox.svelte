<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/tailwindUtil.js';
	import { CheckIcon, MinusIcon } from '@lucide/svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type CheckboxProps = Omit<WithElementRef<HTMLInputAttributes>, 'size'> & {
		checked?: boolean;
		indeterminate?: boolean;
		size?: 'sm' | 'md' | 'lg';
		label?: string;
	};

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = false,
		size = $bindable<'sm' | 'md' | 'lg'>('md'),
		disabled = false,
		class: className,
		label,
		...restProps
	}: CheckboxProps = $props();

	let inputRef = $state<HTMLInputElement | null>(null);

	$effect(() => {
		if (inputRef) {
			inputRef.indeterminate = indeterminate;
		}
	});
</script>

<label
	bind:this={ref}
	data-slot="checkbox"
	class={cn('group inline-flex shrink-0 items-center', disabled && 'cursor-not-allowed', label && 'gap-2')}
>
	<input
		bind:this={inputRef}
		bind:checked
		type="checkbox"
		class="peer sr-only"
		{disabled}
		{...restProps}
	/>

	<div
		class={cn(
			'border-checkbox---radio-default-border bg-checkbox---radio-default-surface',
			'peer-checked:border-none peer-checked:bg-checkbox---radio-checked peer-checked:text-alpha-pure-white-950',
			indeterminate && !checked && 'bg-checkbox---radio-default-surface',
			'group-hover:bg-checkbox---radio-hover',
			'peer-focus-visible:ring-2 peer-focus-visible:ring-surface-brand-l4 peer-focus-visible:ring-offset-2',
			'peer-aria-invalid:border-destructive peer-aria-invalid:ring-surface-destructive-l4',
			'peer-disabled:cursor-not-allowed peer-disabled:bg-checkbox---radio-disabled peer-disabled:text-alpha-pure-white-950',
			'peer-disabled:peer-checked:bg-checkbox---radio-disabled',
			'flex shrink-0 items-center justify-center border shadow-xs transition-shadow outline-none',
			size === 'sm' && 'rounded-checkbox---radio-small-radius size-checkbox---radio-small-size',
			size === 'md' && 'rounded-checkbox---radio-medium-radius size-checkbox---radio-medium-size',
			size === 'lg' && 'rounded-checkbox---radio-large-radius size-checkbox---radio-large-size',
			className
		)}
	>
		<div data-slot="checkbox-indicator" class="text-current transition-none">
			{#if checked && !indeterminate}
				<CheckIcon  size={size === 'sm' ? 8 : size === 'md' ? 12 : 16} />
			{:else if indeterminate}
				<MinusIcon size={size === 'sm' ? 8 : size === 'md' ? 12 : 16} />
			{/if}
		</div>	
	</div>

	{#if label}
		<span class={cn('select-none text-sm text-text-neutral-primary', disabled && 'opacity-50')}>{label}</span>
	{/if}
</label>
