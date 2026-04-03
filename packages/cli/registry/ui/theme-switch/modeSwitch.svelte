<script lang="ts">
  import { cn } from "$lib/utils/tailwindUtil.js";
  import { IconMoon, IconSun } from "$lib/icons";
  import { onMount } from "svelte";

  let {
    class: className,
    size = "md",
    isDark = $bindable(false),
    ...restProps
  }: {
    class?: string;
    size?: "sm" | "md" | "lg";
    isDark: boolean;
    [key: string]: any;
  } = $props();

  const sizeConfig = {
    sm: {
      container:
        "w-toggle-season-switcher-small-width h-toggle-season-switcher-small-height rounded-toggle-season-switcher-small-radius p-toggle-season-switcher-small-padding gap-toggle-season-switcher-small-gap",
      icon: "size-toggle-season-switcher-small-icon-size",
      padding: "var(--spacing-toggle-season-switcher-small-padding)",
    },
    md: {
      container:
        "w-toggle-season-switcher-medium-width h-toggle-season-switcher-medium-height rounded-toggle-season-switcher-medium-radius p-toggle-season-switcher-medium-padding gap-toggle-season-switcher-medium-gap",
      icon: "size-toggle-season-switcher-medium-icon-size",
      padding: "var(--spacing-toggle-season-switcher-medium-padding)",
    },
    lg: {
      container:
        "w-toggle-season-switcher-large-width h-toggle-season-switcher-large-height rounded-toggle-season-switcher-large-radius p-toggle-season-switcher-large-padding gap-toggle-season-switcher-large-gap",
      icon: "size-toggle-season-switcher-large-icon-size",
      padding: "var(--spacing-toggle-season-switcher-large-padding)",
    },
  };

  const config = $derived(sizeConfig[size]);

  function toggleTheme() {
    isDark = !isDark;
  }

  onMount(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      isDark = true;
    } else if (saved === "light") {
      isDark = false;
    } else {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  });

  $effect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
</script>

<button
  type="button"
  onclick={toggleTheme}
  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
  class={cn(
    "relative inline-flex items-center border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    "border-toggles-dark-night-border",
    config.container,
    className,
  )}
  {...restProps}
>
  <!-- Sun icon (light mode) -->
  <div
    class={cn(
      "absolute top-1/2 z-30 -translate-y-1/2 translate-x-4 transition-all duration-300 flex items-center justify-center ",
      config.icon,
      isDark
        ? "text-toggles-dark-night-icon-inactive"
        : "text-toggles-dark-night-icon-active",
    )}
  >
    <IconSun fill={"currentColor"} />
  </div>

  <!-- Moon icon (dark mode) -->
  <div
    class={cn(
      "absolute z-30 top-1/2 -translate-y-1/2 -translate-x-2 transition-all duration-300 flex items-center justify-center ",
      config.icon,
      isDark
        ? "text-toggles-dark-night-icon-active"
        : "text-toggles-dark-night-icon-inactive",
    )}
    style="right: {config.padding};"
  >
    <IconMoon fill={"currentColor"} />
  </div>

  <!-- Toggle indicator (background pill) -->
  <div
    class={cn(
      "absolute top-1/2 z-20 -translate-y-1/2 rounded-full bg-toggles-dark-night-active-surface shadow-md transition-all duration-300 size-toggle-season-switcher-icon-wrapper-size",
    )}
    style:left={isDark
      ? `calc(100% - var(--spacing-toggle-season-switcher-selector) - ${config.padding})`
      : config.padding}
  ></div>
</button>
