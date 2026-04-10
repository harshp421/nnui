<script lang="ts">
  import Progress, {
    type ProgressVariant,
  } from "$lib/components/ui/progress/progress.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import {
    DocsPage,
    Icon,
    PageHeader,
    ComponentPreview,
    CodeBlock,
    PropsTable,
    ComponentSource,
  } from "$lib/components/docs";
  import Seo from '$lib/components/seo.svelte';

  let value = $state(50);
  const max = 100;
  let animated = $state(false);
  let variant = $state<ProgressVariant>("default");

  const variantsList: { value: ProgressVariant; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "neutral", label: "Neutral" },
    { value: "red", label: "Red" },
    { value: "success", label: "Success" },
    { value: "blue", label: "Blue" },
    { value: "yellow", label: "Yellow" },
  ];

  function getProgressCode(v = value, vari = variant) {
    const variantAttr = vari !== "default" ? ` variant="${vari}"` : "";
    return `<Progress value={${v}} max={${max}}${variantAttr} />`;
  }

  const installationCode = `npx nnuikit add progress

import Progress from "$lib/components/ui/progress/progress.svelte";`;

  const progressProps = [
    {
      name: "value",
      type: "number",
      default: "-",
      description: "The current progress value.",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "The maximum value for the progress bar.",
    },
    {
      name: "variant",
      type: '"default" | "neutral" | "red" | "success" | "blue" | "yellow"',
      default: '"default"',
      description: "The color variant of the progress bar.",
    },
    {
      name: "class",
      type: "string",
      default: "-",
      description: "Custom CSS classes for the progress bar container.",
    },
  ];

  $effect(() => {
    if (animated) {
      const interval = setInterval(() => {
        value = (value + 1) % (max + 1);
      }, 50);
      return () => clearInterval(interval);
    }
  });
</script>

<Seo title="Progress" description="A progress bar component with multiple variants, sizes, animation support, and design tokens." />

<DocsPage>
  <PageHeader
    title="Progress"
    description="Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="progress"
        path="src/lib/components/ui/progress/progress.svelte"
      />
    </div>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Installation</h2>
      <CodeBlock
        code={installationCode}
        language="typescript"
        title="Installation"
      />
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
      <ComponentPreview code={`<Progress value={65} max={100} />`}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <Progress value={65} max={100} class="w-full max-w-sm" />
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
          Explore the progress component by adjusting the value, toggling
          animation, and switching between variants.
        </p>
      </div>

      <div class="w-full">
        <ComponentPreview code={getProgressCode()}>
          {#snippet preview()}
            <div
              class="flex flex-col items-center justify-center gap-8 py-10 w-full"
            >
              <Progress {value} {max} {variant} class="w-full max-w-sm" />
              <div class="text-sm font-medium tabular-nums">
                {value}% complete ({variant} variant)
              </div>
            </div>
          {/snippet}
        </ComponentPreview>

        <!-- Controls -->
        <div class="mt-8 grid gap-12 border-t pt-8 md:grid-cols-2">
          <div class="space-y-8">
            <div class="space-y-4">
              <h3 class="text-sm font-medium leading-none">Variant</h3>
              <div class="flex flex-wrap gap-2">
                {#each variantsList as v}
                  <Button
                    variant={variant === v.value ? "primary" : "tertiary"}
                    size="sm"
                    onclick={() => (variant = v.value)}
                  >
                    {v.label}
                  </Button>
                {/each}
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-sm font-medium leading-none">Presets</h3>
              <div class="flex flex-wrap gap-2">
                <Button
                  variant={value === 0 && !animated ? "primary" : "tertiary"}
                  size="sm"
                  onclick={() => {
                    value = 0;
                    animated = false;
                  }}
                >
                  0%
                </Button>
                <Button
                  variant={value === 50 && !animated ? "primary" : "tertiary"}
                  size="sm"
                  onclick={() => {
                    value = 50;
                    animated = false;
                  }}
                >
                  50%
                </Button>
                <Button
                  variant={value === 100 && !animated ? "primary" : "tertiary"}
                  size="sm"
                  onclick={() => {
                    value = 100;
                    animated = false;
                  }}
                >
                  100%
                </Button>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-sm font-medium leading-none">Options</h3>
            <div class="flex flex-col gap-6">
              <Button
                variant={animated ? "primary" : "tertiary"}
                size="sm"
                class="w-fit"
                onclick={() => (animated = !animated)}
              >
                {animated ? "Stop" : "Start"} Animation
              </Button>

              <div class="space-y-2">
                <label class="text-sm font-medium leading-none" for="v-range"
                  >Value</label
                >
                <input
                  id="v-range"
                  type="range"
                  min="0"
                  max="100"
                  bind:value
                  class="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  disabled={animated}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Variants</h2>
        <p class="text-text-neutral-secondary">
          Available color variants for different contextual needs.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each variantsList as v}
          <div
            class="group relative flex flex-col space-y-6 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div class="flex items-center gap-4">
              <p class="font-semibold text-foreground capitalize">{v.label}</p>
            </div>
            <div class="flex items-center justify-center py-4">
              <Progress value={65} variant={v.value} class="w-full" />
            </div>
            <CodeBlock
              code={`<Progress value={65} variant="${v.value}" />`}
              language="svelte"
              class="text-xs"
            />
          </div>
        {/each}
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Accessibility</h2>
      <div class="flex flex-col gap-2.5">
        {#each ["ARIA: role='progressbar' with aria-valuenow, aria-valuemin, aria-valuemax", "Label: aria-label describes the progress purpose", "Visual: color variants indicate status (brand, success, destructive)"] as item (item)}
          <div class="flex items-start gap-2.5 text-sm text-text-neutral-secondary">
            <Icon name="check" class="size-16 shrink-0 mt-0.5 text-text-brand-primary" />
            {item}
          </div>
        {/each}
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="py-6 text-2xl font-bold tracking-tight border-b border-border-neutral-l4">Props</h2>
      <PropsTable props={progressProps} />
    </section>
  </div>
</DocsPage>
