<script lang="ts" module>
  import { cn, type WithElementRef } from "$lib/utils/tailwindUtil.js";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ToastData, ToastVariant } from "./toast-state.svelte.js";

  export type ToastMode = "inline" | "expanded";

  export type ToastProps = WithElementRef<HTMLAttributes<HTMLDivElement>> &
    ToastData & {
      mode?: ToastMode;
      onDismissClick?: () => void;
      onMouseEnter?: () => void;
      onMouseLeave?: () => void;
    };
</script>

<script lang="ts">
  import IconCheck from "$lib/icons/icon-check.svelte";
  import IconAlertCircle from "$lib/icons/icon-alert-circle.svelte";
  import IconAlert from "$lib/icons/icon-alert.svelte";
  import IconInfo from "$lib/icons/icon-info.svelte";
  import { IconCross } from "$lib/icons/index.js";
  import { Button } from "$lib/components/ui/button";

  let {
    class: className,
    variant = "default",
    mode = "inline",
    title,
    description,
    dismissible = true,
    action,
    onDismissClick,
    onMouseEnter,
    onMouseLeave,
    ref = $bindable(null),
    ...restProps
  }: ToastProps = $props();

  const iconMap: Record<string, typeof IconCheck | null> = {
    success: IconCheck,
    error: IconAlertCircle,
    destructive: IconAlertCircle,
    warning: IconAlert,
    info: IconInfo,
    brand: IconInfo,
    default: null,
  };

  const IconComponent = $derived(variant ? iconMap[variant] : null);

  // ── Inline mode: single-row compact toast ─────────────────────────────
  // Uses --color-toasts-inline-{variant}-* tokens
  const inlineVariantClasses: Record<string, string> = {
    default:
      "bg-toasts-inline-neutral-surface border-toasts-inline-neutral-border text-toasts-inline-neutral-primary-text [&_[data-slot=toast-icon]]:text-toasts-inline-neutral-primary-icon [&_[data-slot=toast-desc]]:text-toasts-inline-neutral-secondary-text [&_[data-slot=toast-close]]:text-toasts-inline-neutral-secondary-icon",
    brand:
      "bg-toasts-inline-brand-surface border-toasts-inline-brand-border text-toasts-inline-brand-primary-text [&_[data-slot=toast-icon]]:text-toasts-inline-brand-primary-icon [&_[data-slot=toast-desc]]:text-toasts-inline-brand-secondary-text [&_[data-slot=toast-close]]:text-toasts-inline-brand-secondary-icon",
    success:
      "bg-toasts-inline-success-surface border-toasts-inline-success-border text-toasts-inline-success-primary-text [&_[data-slot=toast-icon]]:text-toasts-inline-success-primary-icon [&_[data-slot=toast-desc]]:text-toasts-inline-success-secondary-text [&_[data-slot=toast-close]]:text-toasts-inline-success-secondary-icon",
    info: "bg-toasts-inline-info-surface border-toasts-inline-info-border text-toasts-inline-info-primary-text [&_[data-slot=toast-icon]]:text-toasts-inline-info-primary-icon [&_[data-slot=toast-desc]]:text-toasts-inline-info-secondary-text [&_[data-slot=toast-close]]:text-toasts-inline-info-secondary-icon",
    warning:
      "bg-toasts-inline-warning-surface border-toasts-inline-warning-border text-toasts-inline-warning-primary-text [&_[data-slot=toast-icon]]:text-toasts-inline-warning-primary-icon [&_[data-slot=toast-desc]]:text-toasts-inline-warning-secondary-text [&_[data-slot=toast-close]]:text-toasts-inline-warning-secondary-icon",
    error:
      "bg-toasts-inline-destructive-surface border-toasts-inline-destructive-border text-toasts-inline-destructive-primary-text [&_[data-slot=toast-icon]]:text-toasts-inline-destructive-primary-icon [&_[data-slot=toast-desc]]:text-toasts-inline-destructive-secondary-text [&_[data-slot=toast-close]]:text-toasts-inline-destructive-secondary-icon",
    destructive:
      "bg-toasts-inline-destructive-surface border-toasts-inline-destructive-border text-toasts-inline-destructive-primary-text [&_[data-slot=toast-icon]]:text-toasts-inline-destructive-primary-icon [&_[data-slot=toast-desc]]:text-toasts-inline-destructive-secondary-text [&_[data-slot=toast-close]]:text-toasts-inline-destructive-secondary-icon",
  };

  // ── Expanded mode: multi-row toast with left accent border ────────────
  // Uses --color-toasts-expanded-{variant}-* tokens
  const expandedVariantClasses: Record<string, string> = {
    default:
      "bg-toasts-expanded-neutral-surface border-toasts-expanded-neutral-secondary-border border-l-4 border-l-toasts-expanded-neutral-primary-border text-toasts-expanded-neutral-primary-text [&_[data-slot=toast-icon]]:text-toasts-expanded-neutral-primary-icon [&_[data-slot=toast-desc]]:text-toasts-expanded-neutral-secondary-text [&_[data-slot=toast-close]]:text-toasts-expanded-neutral-secodnary-icon",
    brand:
      "bg-toasts-expanded-brand-surface border-toasts-expanded-brand-secondary-border border-l-4 border-l-toasts-expanded-brand-primary-border text-toasts-expanded-brand-primary-text [&_[data-slot=toast-icon]]:text-toasts-expanded-brand-primary-icon [&_[data-slot=toast-desc]]:text-toasts-expanded-brand-secondary-text [&_[data-slot=toast-close]]:text-toasts-expanded-brand-secodnary-icon",
    success:
      "bg-toasts-expanded-success-surface border-toasts-expanded-success-secondary-border border-l-4 border-l-toasts-expanded-success-primary-border text-toasts-expanded-success-primary-text [&_[data-slot=toast-icon]]:text-toasts-expanded-success-primary-icon [&_[data-slot=toast-desc]]:text-toasts-expanded-success-secondary-text [&_[data-slot=toast-close]]:text-toasts-expanded-success-secodnary-icon",
    info: "bg-toasts-expanded-info-surface border-toasts-expanded-info-secondary-border border-l-4 border-l-toasts-expanded-info-primary-border text-toasts-expanded-info-primary-text [&_[data-slot=toast-icon]]:text-toasts-expanded-info-primary-icon [&_[data-slot=toast-desc]]:text-toasts-expanded-info-secondary-text [&_[data-slot=toast-close]]:text-toasts-expanded-info-secodnary-icon",
    warning:
      "bg-toasts-expanded-warning-surface border-toasts-expanded-warning-secondary-border border-l-4 border-l-toasts-expanded-warning-primary-border text-toasts-expanded-warning-primary-text [&_[data-slot=toast-icon]]:text-toasts-expanded-warning-primary-icon [&_[data-slot=toast-desc]]:text-toasts-expanded-warning-secondary-text [&_[data-slot=toast-close]]:text-toasts-expanded-warning-secodnary-icon",
    error:
      "bg-toasts-expanded-destructive-surface border-toasts-expanded-destructive-secondary-border border-l-4 border-l-toasts-expanded-destructive-primary-border text-toasts-expanded-destructive-primary-text [&_[data-slot=toast-icon]]:text-toasts-expanded-destructive-primary-icon [&_[data-slot=toast-desc]]:text-toasts-expanded-destructive-secondary-text [&_[data-slot=toast-close]]:text-toasts-expanded-destructive-secodnary-icon",
    destructive:
      "bg-toasts-expanded-destructive-surface border-toasts-expanded-destructive-secondary-border border-l-4 border-l-toasts-expanded-destructive-primary-border text-toasts-expanded-destructive-primary-text [&_[data-slot=toast-icon]]:text-toasts-expanded-destructive-primary-icon [&_[data-slot=toast-desc]]:text-toasts-expanded-destructive-secondary-text [&_[data-slot=toast-close]]:text-toasts-expanded-destructive-secodnary-icon",
  };

  let variantClass = $derived(
    mode === "inline"
      ? inlineVariantClasses[variant ?? "default"]
      : expandedVariantClasses[variant ?? "default"],
  );
</script>

{#if mode === "inline"}
  <!-- ── Inline toast: compact single row ────────────────────────────── -->
  <div
    bind:this={ref}
    role={variant === "destructive" ? "alert" : "status"}
    aria-live={variant === "destructive" ? "assertive" : "polite"}
    aria-atomic="true"
    data-slot="toast"
    data-variant={variant}
    data-mode="inline"
    class={cn(
      "group pointer-events-auto relative flex w-full items-center",
      "h-toasts-inline-height p-toasts-inline-padding-all-sides gap-toasts-inline-card-gap rounded-toasts-inline-radius border",
      "shadow-lg drop-shadow-l3 transition-all glass:backdrop-blur-xl glass:backdrop-saturate-150",
      variantClass,
      className,
    )}
    onmouseenter={onMouseEnter}
    onmouseleave={onMouseLeave}
    {...restProps}
  >
    {#if IconComponent}
      <div class="shrink-0" data-slot="toast-icon">
        <IconComponent size={24} color="currentColor" />
      </div>
    {/if}

    <div class="flex-1 flex items-center gap-toasts-inline-text-gap min-w-0 overflow-hidden">
      {#if title}
        <span
          class="text-sm font-semibold truncate whitespace-nowrap"
          data-slot="toast-title"
        >
          {title}
        </span>
      {/if}
      {#if description}
        <span class="text-sm truncate whitespace-nowrap" data-slot="toast-desc">
          {description}
        </span>
      {/if}
    </div>

    {#if action}
      <Button variant="tertiary" size="sm" onclick={action.onClick}>
        {action.label}
      </Button>
    {/if}

    {#if dismissible}
      <button
        type="button"
        onclick={onDismissClick}
        aria-label="Close notification"
        data-slot="toast-close"
        class="shrink-0 rounded-6 p-4 transition-opacity opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <IconCross size={14} color="currentColor" />
      </button>
    {/if}
  </div>
{:else}
  <!-- ── Expanded toast: multi-row with left accent border ───────────── -->
  <div
    bind:this={ref}
    role={variant === "destructive" ? "alert" : "status"}
    aria-live={variant === "destructive" ? "assertive" : "polite"}
    aria-atomic="true"
    data-slot="toast"
    data-variant={variant}
    data-mode="expanded"
    class={cn(
      "group pointer-events-auto relative flex w-full",
      "p-toasts-expanded-padding-all-sides gap-toasts-expanded-card-gap rounded-toasts-expanded-radius border",
      "shadow-lg drop-shadow-l3 transition-all glass:backdrop-blur-xl glass:backdrop-saturate-150",
      variantClass,
      className,
    )}
    onmouseenter={onMouseEnter}
    onmouseleave={onMouseLeave}
    {...restProps}
  >
    {#if IconComponent}
      <div class="shrink-0 mt-2" data-slot="toast-icon">
        <IconComponent size={24} color="currentColor" />
      </div>
    {/if}

    <div class="flex-1 min-w-0 flex flex-col gap-toasts-expanded-text-gap">
      {#if title}
        <span
          class="text-sm font-semibold leading-tight"
          data-slot="toast-title"
        >
          {title}
        </span>
      {/if}
      {#if description}
        <span class="text-sm leading-tight" data-slot="toast-desc">
          {description}
        </span>
      {/if}
      {#if action}
        <div class="flex items-center gap-8 mt-8" data-slot="toast-actions">
          <Button variant="primary" size="sm" onclick={action.onClick}>
            {action.label}
          </Button>
          {#if dismissible}
            <Button variant="tertiary" size="sm" onclick={onDismissClick}>
              Dismiss
            </Button>
          {/if}
        </div>
      {/if}
    </div>

    {#if dismissible && !action}
      <button
        type="button"
        onclick={onDismissClick}
        aria-label="Close notification"
        data-slot="toast-close"
        class="shrink-0 rounded-6 p-4 transition-opacity opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <IconCross size={14} color="currentColor" />
      </button>
    {/if}
  </div>
{/if}
