<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import Switch from "$lib/components/ui/switch/switch.svelte";
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

  const sizes = [
    { value: "sm" as const, label: "Small" },
    { value: "md" as const, label: "Medium" },
    { value: "lg" as const, label: "Large" },
  ];

  let checked = $state(false);
  let disabled = $state(false);
  let showIcon = $state(false); // visual only — not a component prop
  let size = $state<(typeof sizes)[number]["value"]>("md");

  function getSwitchCode() {
    const sizeAttr = size !== "md" ? ` size="${size}"` : "";
    const checkedAttr = checked ? " checked" : "";
    const disabledAttr = disabled ? " disabled" : "";
    const iconAttr = showIcon ? " showIcon" : "";

    return `<div class="flex items-center gap-3">\n  <Switch${sizeAttr}${checkedAttr}${disabledAttr}${iconAttr} />\n  <span class="text-sm font-medium">Enable notifications</span>\n</div>`;
  }

  const installationCode = `import Switch from "$lib/components/ui/switch/switch.svelte";`;

  const switchProps = [
    {
      name: "checked",
      type: "boolean",
      default: "false",
      description: "The controlled checked state of the switch.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the switch is disabled.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "The size of the switch.",
    },
    {
      name: "showIcon",
      type: "boolean",
      default: "false",
      description: "Whether to show the icon inside the thumb.",
    },
  ];
</script>

<Seo title="Switch" description="A toggle switch component using native checkbox input with accessible design. Multiple sizes and design token support." />

<DocsPage>
  <PageHeader
    title="Switch"
    description="A control that allows the user to toggle between checked and not checked."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="switch"
        path="$lib/components/ui/switch/switch.svelte"
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
      <ComponentPreview
        code={`<div class="flex items-center gap-3">
  <Switch />
  <span class="text-sm font-medium">Enable notifications</span>
</div>`}
      >
        {#snippet preview()}
          <div class="flex items-center justify-center p-10">
            <div class="flex items-center gap-3">
              <Switch />
              <span class="text-sm font-medium">Enable notifications</span>
            </div>
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
          Customize settings, sizes, and states.
        </p>
      </div>

      <div class="w-full">
        <ComponentPreview code={getSwitchCode()}>
          {#snippet preview()}
            <div class="flex flex-col items-center justify-center gap-8 py-10">
              {#key [size, disabled, showIcon]}
                <div class="flex items-center gap-3">
                  <Switch bind:checked {disabled} {size} />
                  <span class="text-sm font-medium" class:opacity-50={disabled}>
                    Enable notifications
                  </span>
                </div>
              {/key}
            </div>
          {/snippet}
        </ComponentPreview>

        <!-- Controls -->
        <div class="mt-8 grid gap-8 border-t pt-8 md:grid-cols-2">
          <div class="space-y-4">
            <h3 class="text-sm font-medium leading-none">Size</h3>
            <div class="flex flex-wrap gap-2">
              {#each sizes as s (s.value)}
                <Button
                  variant={size === s.value ? "primary" : "tertiary"}
                  size="sm"
                  onclick={() => (size = s.value)}
                >
                  {s.label}
                </Button>
              {/each}
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-sm font-medium leading-none">States</h3>
            <div class="flex flex-wrap gap-4">
              <label
                class="flex items-center space-x-2 text-sm font-medium leading-none"
              >
                <Checkbox bind:checked={showIcon} />
                <span>Show Icon</span>
              </label>
              <label
                class="flex items-center space-x-2 text-sm font-medium leading-none"
              >
                <Checkbox bind:checked={disabled} />
                <span>Disabled</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Sizes</h2>
        <p class="text-text-neutral-secondary">Different switch sizes.</p>
      </div>

      <div class="grid gap-8 md:grid-cols-3">
        {#each sizes as s (s.value)}
          <div
            class="group flex flex-col space-y-4 rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div class="flex items-center p-4 gap-4">
              <p class="font-semibold text-foreground">{s.label}</p>
            </div>

            <div class="flex min-h-[100px] items-center justify-center p-8">
              <Switch size={s.value} />
            </div>
            <CodeBlock
              code={`<Switch size="${s.value}" />`}
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
        {#each ["Native input: uses <input type='checkbox' role='switch'>", "Keyboard: Space toggles the switch", "ARIA: aria-checked reflects current state", "Disabled: native disabled attribute + visual indicator"] as item (item)}
          <div class="flex items-start gap-2.5 text-sm text-text-neutral-secondary">
            <Icon name="check" class="size-16 shrink-0 mt-0.5 text-text-brand-primary" />
            {item}
          </div>
        {/each}
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="py-6 text-2xl font-bold tracking-tight border-b border-border-neutral-l4">Props</h2>
      <PropsTable props={switchProps} />
    </section>
  </div>
</DocsPage>
