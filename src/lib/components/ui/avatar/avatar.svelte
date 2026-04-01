<script lang="ts">
  import { Avatar as AvatarPrimitive } from "bits-ui";
  import { cn } from "$lib/utils/tailwindUtil.js";

  let {
    ref = $bindable(null),
    loadingStatus = $bindable("loading"),
    size = $bindable<"xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl">("md"),
    shape = $bindable<"rounded" | "pill" | "square">("rounded"),
    class: className,
    ...restProps
  }: AvatarPrimitive.RootProps & {
    size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    shape?: "rounded" | "pill" | "square";
  } = $props();
</script>

<AvatarPrimitive.Root
  bind:ref
  bind:loadingStatus
  data-slot="avatar"
  data-size={size}
  class={cn(
    "relative flex shrink-0 overflow-hidden bg-avatars-surface text-avatars-icon",
    "focus-visible:ring-2 focus-visible:ring-surface-brand-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-base-vv-white",
    size === "xxs" && "size-avatar-user-profile-xxs text-p-xxsmall",
    size === "xs" && "size-avatar-user-profile-xs text-p-xsmall",
    size === "sm" && "size-avatar-user-profile-s text-p-xsmall",
    size === "md" && "size-avatar-user-profile-m text-p-xsmall",
    size === "lg" && "size-avatar-user-profile-l text-p-small",
    size === "xl" && "size-avatar-user-profile-xl text-p-medium",
    size === "xxl" && "size-avatar-user-profile-xxl text-p-large",
    shape === "rounded" && "rounded-8",
    shape === "pill" && "rounded-full",
    shape === "square" && "rounded-0",
    className,
  )}
  {...restProps}
/>
