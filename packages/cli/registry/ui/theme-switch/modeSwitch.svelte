<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/tailwindUtil.js';
	import IconMoon from './icon-moon.svelte';
	import IconSun from './icon-sun.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type ModeSwitchProps = Omit<WithElementRef<HTMLInputAttributes>, 'size'> & {
		isDark?: boolean;
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
	};

	let {
		ref = $bindable(null),
		class: className,
		isDark = $bindable(false),
		size = 'md',
		disabled = false,
		...restProps
	}: ModeSwitchProps = $props();

	const sizeConfig = {
		sm: {
			container:
				'w-toggle-season-switcher-small-width h-toggle-season-switcher-small-height p-toggle-season-switcher-small-padding',
			icon: 'size-toggle-season-switcher-small-icon-size',
			circle: 'size-toggle-season-switcher-icon-wrapper-size',
			offset:
				'translate-x-[calc(var(--size-toggle-season-switcher-small-width)-var(--size-toggle-season-switcher-small-padding)*2-var(--size-toggle-season-switcher-icon-wrapper-size))]'
		},
		md: {
			container:
				'w-toggle-season-switcher-medium-width h-toggle-season-switcher-medium-height p-toggle-season-switcher-medium-padding',
			icon: 'size-toggle-season-switcher-medium-icon-size',
			circle: 'size-toggle-season-switcher-icon-wrapper-size',
			offset:
				'translate-x-[calc(var(--size-toggle-season-switcher-medium-width)-var(--size-toggle-season-switcher-medium-padding)*2-var(--size-toggle-season-switcher-icon-wrapper-size))]'
		},
		lg: {
			container:
				'w-toggle-season-switcher-large-width h-toggle-season-switcher-large-height p-toggle-season-switcher-large-padding',
			icon: 'size-toggle-season-switcher-large-icon-size',
			circle: 'size-toggle-season-switcher-icon-wrapper-size',
			offset:
				'translate-x-[calc(var(--size-toggle-season-switcher-large-width)-var(--size-toggle-season-switcher-large-padding)*2-var(--size-toggle-season-switcher-icon-wrapper-size))]'
		}
	};

	const config = $derived(sizeConfig[size]);

	let mounted = $state(false);

	onMount(() => {
		const saved = localStorage.getItem('theme');
		if (saved === 'dark') {
			isDark = true;
		} else if (saved === 'light') {
			isDark = false;
		} else {
			isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		document.documentElement.classList.toggle('dark', isDark);
		mounted = true;
	});

	$effect(() => {
		if (!mounted || !browser) return;
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	});
</script>

<label
	bind:this={ref}
	data-slot="mode-switch"
	class={cn('group inline-flex items-center', disabled && 'cursor-not-allowed', className)}
>
	<input
		bind:checked={isDark}
		type="checkbox"
		role="switch"
		class="peer sr-only"
		aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
		aria-checked={isDark}
		{disabled}
		{...restProps}
	/>

	<div
		class={cn(
			'relative inline-flex items-center box-border rounded-full border transition-colors duration-300',
			'peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-surface-brand-l4 peer-focus-visible:ring-offset-2',
			'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
			'border-toggles-dark-night-border',
			config.container,
			
		)}
	>
		<!-- Sun icon -->
		<div
			class={cn(
				'absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-300',
				config.icon,
        size === 'sm' ? 'left-[23%]' : size === 'md' ? 'left-[25%]' : 'left-[28%]',
				isDark
					? 'text-toggles-dark-night-icon-inactive'
					: 'text-toggles-dark-night-icon-active'
			)}
		>
			<IconSun fill="currentColor" />
		</div>

		<!-- Moon icon -->
		<div
			class={cn(
				'absolute top-1/2 right-[25%] z-10 translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-300',
				config.icon,
        size === 'sm' ? 'right-[23%]' : size === 'md' ? 'right-[23%]' : 'right-[26%]',
				isDark
					? 'text-toggles-dark-night-icon-active'
					: 'text-toggles-dark-night-icon-inactive'
			)}
		>
			<IconMoon fill="currentColor" />
		</div>

		<!-- Sliding indicator -->
		<div
			class={cn(
				'absolute top-1/2 -translate-y-1/2 rounded-full shadow-md transition-transform duration-300',
				'bg-toggles-dark-night-active-surface',
				config.circle,
				isDark ? config.offset : 'translate-x-0'
			)}
		></div>
	</div>
</label>
