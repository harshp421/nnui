<script lang="ts">
  import { Slider as SliderPrimitive } from "bits-ui";
  import { cn, type WithoutChildrenOrChild } from "$lib/utils/tailwindUtil.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";

  let {
    ref = $bindable(null),
    value = $bindable(),
    orientation = "horizontal",
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<SliderPrimitive.RootProps> = $props();
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<SliderPrimitive.Root
  bind:ref
  bind:value={value as never}
  data-slot="slider"
  {orientation}
  class={cn(
    "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col ",
    className,
  )}
  {...restProps}
>
  {#snippet children({ thumbs })}
    <span
      data-orientation={orientation}
      data-slot="slider-track"
      class={cn(
        "bg-range-selector-track--bar rounded-range-selector-tube-water-tube-radius relative grow overflow-hidden data-[orientation=horizontal]:h-range-selector-tube-water-tube-hegiht data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5",
      )}
    >
      <SliderPrimitive.Range
        data-slot="slider-range"
        class={cn(
          "bg-range-selector-value-bar-default h-range-selector-tube-water-water-hegiht rounded-range-selector-tube-water-water-radius data-disabled:bg-range-selector-value-bar-disabled focus-within:bg-range-selector-handle-active-surface focus-within:border-range-selector-handle-active-border absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
        )}
      />
    </span>
    <Tooltip.Provider delayDuration={0}>
    {#each thumbs as thumb (thumb)}
      <Tooltip.Root>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <SliderPrimitive.Thumb
              {...props}
              data-slot="slider-thumb"
              index={thumb}
              class="data-disabled:invisible h-range-selector-handle-height w-range-selector-handle-width active:border-range-selector-handle-active-border border-range-selector-handle-default-border bg-range-selector-handle-active-surface   focus-visible:outline-hidden block size-16 shrink-0 rounded-range-selector-handle-radius border shadow-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50"
            />
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content sideOffset={4}>
          {Array.isArray(value) ? value[thumb] : value}
        </Tooltip.Content>
      </Tooltip.Root>
    {/each}
    </Tooltip.Provider>
  {/snippet}
</SliderPrimitive.Root>
