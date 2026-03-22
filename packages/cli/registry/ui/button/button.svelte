<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils/tailwindUtil';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';
	export const buttonVariants = tv({
		base: "inline-flex shrink-0 items-center justify-center whitespace-nowrap text-sm font-medium outline-none transition-all disabled:pointer-events-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-16 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				primary: [
					'bg-button-brand-default-surface text-button-brand-default-text [&>svg]:text-button-brand-default-icon',
					'hover:bg-button-brand-hover-surface hover:text-button-brand-hover-text hover:[&>svg]:text-button-brand-hover-icon',
					'focus-visible:bg-button-brand-focused-surface focus-visible:text-button-brand-focused-text focus-visible:[&>svg]:text-button-brand-focused-icon',
					'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-vv-white focus-visible:ring-button-brand-focused-surface/50',
					'disabled:bg-button-brand-disabled-surface disabled:text-button-brand-disabled-text disabled:[&>svg]:text-button-brand-disabled-icon'
				].join(' '),
				destructive: [
					'bg-button-destructive-default-surface text-button-destructive-default-text [&>svg]:text-button-destructive-default-icon',
					'hover:bg-button-destructive-hover-surface hover:text-button-destructive-hover-text hover:[&>svg]:text-button-destructive-hover-icon',
					'focus-visible:bg-button-destructive-focused-surface focus-visible:text-button-destructive-focused-text focus-visible:[&>svg]:text-button-destructive-focused-icon',
					'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-vv-white focus-visible:ring-button-destructive-focused-surface/50',
					'disabled:bg-button-destructive-disabled-surface disabled:text-button-destructive-disabled-text disabled:[&>svg]:text-button-destructive-disabled-icon'
				].join(' '),
				warning: [
					'bg-button-warning-default-surface text-button-warning-default-text [&>svg]:text-button-warning-default-icon',
					'hover:bg-button-warning-hover-surface hover:text-button-warning-hover-text hover:[&>svg]:text-button-warning-hover-icon',
					'focus-visible:bg-button-warning-focused-surface focus-visible:text-button-warning-focused-text focus-visible:[&>svg]:text-button-warning-focused-icon',
					'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-vv-white focus-visible:ring-button-warning-focused-surface/50',
					'disabled:bg-button-warning-disabled-surface disabled:text-button-warning-disabled-text disabled:[&>svg]:text-button-warning-disabled-icon'
				].join(' '),
				info: [
					'bg-button-info-default-surface text-button-info-default-text [&>svg]:text-button-info-default-icon',
					'hover:bg-button-info-hover-surface hover:text-button-info-hover-text hover:[&>svg]:text-button-info-hover-icon',
					'focus-visible:bg-button-info-focused-surface focus-visible:text-button-info-focused-text focus-visible:[&>svg]:text-button-info-focused-icon',
					'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-vv-white focus-visible:ring-button-info-focused-surface/50',
					'disabled:bg-button-info-disabled-surface disabled:text-button-info-disabled-text disabled:[&>svg]:text-button-info-disabled-icon'
				].join(' '),
				secondary: [
					'bg-button-neutral-default-surface text-button-neutral-default-text [&>svg]:text-button-neutral-default-icon',
					'hover:bg-button-neutral-hover-surface hover:text-button-neutral-hover-text hover:[&>svg]:text-button-neutral-hover-icon',
					'focus-visible:bg-button-neutral-focused-surface focus-visible:text-button-neutral-focused-text focus-visible:[&>svg]:text-button-neutral-focused-icon',
					'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-vv-white focus-visible:ring-button-neutral-focused-surface/50',
					'disabled:bg-button-neutral-disabled-surface disabled:text-button-neutral-disabled-text disabled:[&>svg]:text-button-neutral-disabled-icon'
				].join(' '),
				tertiary: [
					'bg-button-tertiary-default-surface text-button-tertiary-default-text [&>svg]:text-button-tertiary-default-icon',
					'border border-button-tertiary-default-border',
					'hover:bg-button-tertiary-hover-surface hover:text-button-tertiary-hover-text hover:[&>svg]:text-button-tertiary-hover-icon hover:border-button-tertiary-hover-border',
					'focus-visible:bg-button-tertiary-focused-surface focus-visible:text-button-tertiary-focused-text focus-visible:[&>svg]:text-button-tertiary-focused-icon focus-visible:border-button-tertiary-focused-border',
					'focus-visible:ring-2 focus-visible:ring-button-tertiary-hover-surface',
					'disabled:bg-button-tertiary-disabled-surface disabled:text-button-tertiary-disabled-text disabled:[&>svg]:text-button-tertiary-disabled-icon disabled:border-button-tertiary-disabled-border'
				].join(' '),
				orphan: [
					'bg-button-orphan-default-surface text-button-orphan-default-text [&>svg]:text-button-orphan-default-icon border-none',
					'hover:bg-button-orphan-hover-surface hover:text-button-orphan-hover-text hover:[&>svg]:text-button-orphan-hover-icon',
					'focus-visible:bg-button-orphan-focused-surface focus-visible:text-button-orphan-focused-text focus-visible:[&>svg]:text-button-orphan-focused-icon',
					'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-vv-white focus-visible:ring-button-orphan-hover-surface',
					'disabled:bg-button-orphan-disabled-surface disabled:text-button-orphan-disabled-text disabled:[&>svg]:text-button-orphan-disabled-icon'
				].join(' '),
				link: [
					'bg-button-link-default-surface text-button-link-default-text [&>svg]:text-button-link-default-icon border-none underline-offset-4 hover:underline',
					'hover:bg-button-link-hover-surface hover:text-button-link-hover-text hover:[&>svg]:text-button-link-hover-icon',
					'focus-visible:bg-button-link-focused-surface focus-visible:text-button-link-focused-text focus-visible:[&>svg]:text-button-link-focused-icon',
					'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-vv-white focus-visible:ring-button-link-hover-surface',
					'disabled:bg-button-link-disabled-surface disabled:text-button-link-disabled-text disabled:[&>svg]:text-button-link-disabled-icon'
				].join(' '),
				glass: [
					'bg-glass-surface-default text-glass-text-primary [&>svg]:text-glass-icon-default border border-glass-border-l1',
					'hover:bg-glass-surface-hover hover:text-glass-text-primary hover:[&>svg]:text-glass-icon-hover',
					'focus-visible:bg-glass-surface-active focus-visible:text-glass-icon-active',
					'disabled:bg-glass-surface-disabled disabled:text-glass-text-tertiary disabled:[&>svg]:text-glass-icon-disabled'
				].join(' ')
			},
			size: {
				default:
					'h-button-medium-normal-height min-w-button-medium-normal-min-width gap-button-medium-normal-gap rounded-button-medium-normal-radius px-button-medium-normal-padding-left-right py-button-medium-normal-padding-top-bottom',
				sm: 'h-button-small-height min-w-button-small-min-width gap-button-small-gap rounded-button-small-radius px-button-small-padding-left-right py-button-small-padding-top-bottom',
				lg: 'h-button-large-normal-height min-w-button-large-normal-min-width gap-button-large-normal-gap rounded-button-large-normal-radius px-button-large-normal-padding-left-right py-button-large-normal-padding-top-bottom',
				icon: "size-button-medium-normal-height rounded-button-medium-normal-radius p-0 [&_svg:not([class*='size-'])]:size-button-medium-link-icon-size",
				'icon-sm':
					"size-button-small-height rounded-button-small-radius p-0 [&_svg:not([class*='size-'])]:size-button-small-link-icon-size",
				'icon-md':
					"size-button-medium-normal-height rounded-button-medium-normal-radius p-0 [&_svg:not([class*='size-'])]:size-button-medium-link-icon-size",
				'icon-lg':
					"size-button-large-normal-height rounded-button-large-normal-radius p-0 [&_svg:not([class*='size-'])]:size-button-large-link-icon-size"
			},
			fullyRounded: {
				true: 'rounded-full'
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'default',
			fullyRounded: false
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
	export type ButtonFullyRounded = VariantProps<typeof buttonVariants>['fullyRounded'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			fullyRounded?: ButtonFullyRounded;
			Icon?: typeof import('svelte').SvelteComponent | null;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'primary',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		fullyRounded = false,
		disabled,
		children,
		Icon,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size, fullyRounded }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size, fullyRounded }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{#if Icon}
			<Icon />
		{/if}
		{@render children?.()}
	</button>
{/if}
