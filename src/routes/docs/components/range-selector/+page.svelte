<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import RangeSelector from "$lib/components/ui/range-selector/range-selector.svelte";
  import {
    CodeBlock,
    ComponentPreview,
    ComponentSource,
    DocsPage,
    Icon,
    PageHeader,
    PropsTable,
  } from "$lib/components/docs";
  import Seo from '$lib/components/seo.svelte';

  const orientations = [
    { value: "horizontal" as const, label: "Horizontal" },
    { value: "vertical" as const, label: "Vertical" },
  ];

  let value = $state(50);
  let min = 0;
  let max = 100;
  let step = $state(1);
  let orientation = $state<"horizontal" | "vertical">("horizontal");
  let isRange = $state(false);
  let rangeValue = $state([25, 75]);

  function getRangeCode() {
    const val = isRange ? rangeValue : value;

    const orient = orientation === "vertical" ? ` orientation="vertical"` : "";
    const s = step !== 1 ? ` step={${step}}` : "";

    return `<script lang="ts">
  import RangeSelector from "$lib/components/ui/range-selector/range-selector.svelte";

  let rangeValue = $state(${JSON.stringify(val)});
<\/script>

<RangeSelector bind:value={rangeValue}${orient}${s} />`;
  }

  const installationCode = `npx nnuikit add range-selector

import RangeSelector from "$lib/components/ui/range-selector/range-selector.svelte";`;

  const rangeProps = [
    {
      name: "value",
      type: "number[]",
      default: "[0]",
      description: "The value array. Use two numbers for a range slider.",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "The minimum allowed value.",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "The maximum allowed value.",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "The stepping interval.",
    },
    {
      name: "orientation",
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: "The visual orientation of the slider.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable interactions.",
    },
  ];
</script>

<Seo title="Range Selector" description="A slider component for selecting single values or ranges with keyboard, touch, and ARIA support." />

<DocsPage>
  <PageHeader
    title="Range Selector"
    description="A slider component that allows users to select a single value or a range of values from a scale."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="range-selector"
        path="src/lib/components/ui/range-selector/range-selector.svelte"
      />
    </div>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Installation</h2>
      <CodeBlock code={installationCode} language="typescript" />
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
      <ComponentPreview code={`<RangeSelector value={30} type="single" />`}>
        {#snippet preview()}
          <div
            class="flex items-center justify-center p-12 w-full max-w-sm mx-auto"
          >
            <RangeSelector value={30} type="single" class="w-full" />
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-20">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">
          Interactive Playground
        </h2>
        <p class="text-text-neutral-secondary">
          Test single values, dual ranges, and vertical orientations.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 items-start">
        <div class="space-y-6">
          <div
            class="p-12 flex items-center justify-center {orientation ===
            'vertical'
              ? 'min-h-[400px]'
              : 'min-h-[250px]'}"
          >
            <div
              class={orientation === "vertical" ? "h-64" : "w-full max-w-sm"}
            >
              {#if isRange}
                <RangeSelector
                  bind:value={rangeValue}
                  {min}
                  {max}
                  {step}
                  {orientation}
                  type="multiple"
                  class={orientation === "vertical" ? "h-full" : "w-full"}
                />
              {:else}
                <RangeSelector
                  bind:value
                  {min}
                  {max}
                  {step}
                  {orientation}
                  type="single"
                  class={orientation === "vertical" ? "h-full" : "w-full"}
                />
              {/if}
            </div>
          </div>
          <div
            class="flex justify-center text-sm font-mono bg-muted/50 p-2 rounded"
          >
            Value: {JSON.stringify(isRange ? rangeValue : value)}
          </div>
          <CodeBlock code={getRangeCode()} language="svelte" class="text-xs" />
        </div>

        <div class="p-6 space-y-8">
          <div class="space-y-4">
            <label for="" class="text-sm font-bold">Mode</label>
            <div class="grid grid-cols-2 gap-2">
              <Button
                variant={!isRange ? "primary" : "tertiary"}
                size="sm"
                onclick={() => (isRange = false)}
              >
                Single Value
              </Button>
              <Button
                variant={isRange ? "primary" : "tertiary"}
                size="sm"
                onclick={() => (isRange = true)}
              >
                Dual Range
              </Button>
            </div>
          </div>

          <div class="space-y-4">
            <label for="" class="text-sm font-bold">Orientation</label>
            <div class="grid grid-cols-2 gap-2">
              {#each orientations as opt}
                <Button
                  variant={orientation === opt.value ? "primary" : "tertiary"}
                  size="sm"
                  onclick={() => (orientation = opt.value)}
                >
                  {opt.label}
                </Button>
              {/each}
            </div>
          </div>

          <div class="space-y-3 pt-4 border-t">
            <div class="flex justify-between items-center text-sm font-bold">
              <label for="">Step Interval</label>
              <span class="font-mono">{step}</span>
            </div>
            <input
              type="range"
              bind:value={step}
              min="1"
              max="10"
              class="w-full accent-primary"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Examples Section -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Examples</h2>
        <p class="text-text-neutral-secondary">
          Common patterns for range sliders.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <div class="flex flex-col p-6 rounded-xl space-y-6">
          <div>
            <h3 class="text-lg font-bold">Price Filtering</h3>
            <p class="text-sm text-text-neutral-secondary">
              Selecting a range between $20 and $80.
            </p>
          </div>
          <div class="px-4 py-8 rounded-lg">
            <RangeSelector value={[20, 80]} type="multiple" class="w-full" />
          </div>
        </div>

        <div class="flex flex-col p-6 rounded-xl space-y-6">
          <div>
            <h3 class="text-lg font-bold">Precise Increments</h3>
            <p class="text-sm text-text-neutral-secondary">
              Step interval of 0.5 for thermal control.
            </p>
          </div>
          <div class="px-4 py-8 rounded-lg">
            <RangeSelector
              value={22.5}
              step={0.5}
              max={30}
              min={15}
              type="single"
              class="w-full"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Accessibility</h2>
      <div class="flex flex-col gap-2.5">
        {#each ["Keyboard: Arrow keys adjust value, Home/End for min/max", "ARIA: role='slider' with aria-valuenow, aria-valuemin, aria-valuemax", "Touch: supports touch drag on mobile", "Tooltip: shows current value on hover/drag"] as item (item)}
          <div class="flex items-start gap-2.5 text-sm text-text-neutral-secondary">
            <Icon name="check" class="size-16 shrink-0 mt-0.5 text-text-brand-primary" />
            {item}
          </div>
        {/each}
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="py-6 text-2xl font-bold tracking-tight border-b border-border-neutral-l4">Props</h2>
      <PropsTable props={rangeProps} />
    </section>
  </div>
</DocsPage>
