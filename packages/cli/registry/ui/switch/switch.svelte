<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/tailwindUtil.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type SwitchProps = Omit<WithElementRef<HTMLInputAttributes>, 'size'> & {
		checked?: boolean;
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
	};

	let {
		ref = $bindable(null),
		class: className,
		checked = $bindable(false),
		size = $bindable<'sm' | 'md' | 'lg'>('md'),
		disabled = $bindable(false),
		...restProps
	}: SwitchProps = $props();

	const sizeConfig = {
		sm: {
			container:
				'w-toggle-season-switcher-small-width h-toggle-season-switcher-small-height p-toggle-season-switcher-small-padding',
			circle: 'size-toggle-season-switcher-icon-wrapper-size',
			offset:
				'translate-x-[calc(var(--size-toggle-season-switcher-small-width)-var(--size-toggle-season-switcher-small-padding)*2-var(--size-toggle-season-switcher-icon-wrapper-size))]'
		},
		md: {
			container:
				'w-toggle-season-switcher-medium-width h-toggle-season-switcher-medium-height p-toggle-season-switcher-medium-padding',
			circle: 'size-toggle-season-switcher-icon-wrapper-size',
			offset:
				'translate-x-[calc(var(--size-toggle-season-switcher-medium-width)-var(--size-toggle-season-switcher-medium-padding)*2-var(--size-toggle-season-switcher-icon-wrapper-size))]'
		},
		lg: {
			container:
				'w-toggle-season-switcher-large-width h-toggle-season-switcher-large-height p-toggle-season-switcher-large-padding',
			circle: 'size-toggle-season-switcher-icon-wrapper-size',
			offset:
				'translate-x-[calc(var(--size-toggle-season-switcher-large-width)-var(--size-toggle-season-switcher-large-padding)*2-var(--size-toggle-season-switcher-icon-wrapper-size))]'
		}
	};

	const config = $derived(sizeConfig[size]);
</script>

<label
	bind:this={ref}
	data-slot="switch"
	class={cn('group inline-flex items-center', disabled && 'cursor-not-allowed', className)}
>
	<input
		bind:checked
		type="checkbox"
		role="switch"
		class="peer sr-only"
		aria-checked={checked}
		{disabled}
		{...restProps}
	/>

	<div
		class={cn(
			'relative inline-flex items-center box-border rounded-full transition-colors duration-300',
			'peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-surface-brand-l4 peer-focus-visible:ring-offset-4',
			'peer-disabled:cursor-not-allowed peer-disabled:bg-toggles-switch-off-disabled',
			config.container,
			checked
				? 'bg-toggles-switch-on-default group-hover:bg-toggles-switch-on-hover'
				: 'bg-toggles-switch-off-default group-hover:bg-toggles-switch-off-hover',
			disabled && 'bg-toggles-switch-off-disabled'
		)}
	>
		<div
			class={cn(
				'absolute top-1/2 m-auto -translate-y-1/2 rounded-full shadow-md transition-transform duration-300 flex items-center justify-center',
				'bg-toggles-switch-handle-default',
				disabled && 'bg-toggles-switch-handle-disabled',
				config.circle,
				checked ? config.offset : 'translate-x-0'
			)}
		></div>
	</div>
</label>
