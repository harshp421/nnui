<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import ModeSwitch from "$lib/components/ui/theme-switch/modeSwitch.svelte";
  import {
    CodeBlock,
    ComponentPreview,
    ComponentSource,
    DocsPage,
    PageHeader,
    PropsTable,
  } from "$lib/components/docs";

  const sizes = [
    { value: "sm" as const, label: "Small" },
    { value: "md" as const, label: "Medium" },
    { value: "lg" as const, label: "Large" },
  ];

  let isDark = $state(false);
  let size = $state<(typeof sizes)[number]["value"]>("lg");

  function getModeSwitchCode() {
    const sizeAttr = size !== "lg" ? ` size="${size}"` : "";
    const isDarkAttr = isDark ? " isDark={true}" : "";

    return `<ModeSwitch${sizeAttr}${isDarkAttr} />`;
  }

  const installationCode = `npx nnuikit add theme-switch

import { ModeSwitch } from "$lib/components/ui/theme-switch";`;

  const modeSwitchProps = [
    {
      name: "isDark",
      type: "boolean",
      default: "false",
      description:
        "The bindable theme state. Controls the dark mode class on document root.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"lg"',
      description: "The size variation of the switch.",
    },
    {
      name: "class",
      type: "string",
      default: "undefined",
      description: "Additional CSS classes to apply to the button container.",
    },
  ];
</script>

<DocsPage>
  <PageHeader
    title="Mode Switch"
    description="A toggle component specifically designed for switching between light and dark themes."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="mode-switch"
        path="$lib/components/shared/theme-switch/modeSwitch.svelte"
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
      <ComponentPreview code={`<ModeSwitch />`}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10">
            <ModeSwitch {isDark} />
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
          Toggle theme states and adjust switch sizes.
        </p>
      </div>

      <div class="w-full">
        <ComponentPreview code={getModeSwitchCode()}>
          {#snippet preview()}
            <div class="flex flex-col items-center justify-center gap-8 py-10">
              {#key [size]}
                <ModeSwitch bind:isDark {size} />
              {/key}
              <p class="text-sm font-medium">
                Current Mode: <span class="capitalize"
                  >{isDark ? "Dark" : "Light"}</span
                >
              </p>
            </div>
          {/snippet}
        </ComponentPreview>

        <!-- Controls -->
        <div class="mt-8 grid gap-8 border-t pt-8 md:grid-cols-2">
          <div class="space-y-4">
            <h3 class="text-sm font-medium leading-none">Size</h3>
            <div class="flex flex-wrap gap-2">
              {#each sizes as s}
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
        </div>
      </div>
    </section>

    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Sizes</h2>
        <p class="text-text-neutral-secondary">Available size variations.</p>
      </div>

      <div class="grid gap-8 md:grid-cols-3">
        {#each sizes as s}
          <div
            class="group flex flex-col space-y-4 rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div class="flex items-center p-4 gap-4">
              <p class="font-semibold text-foreground">{s.label}</p>
            </div>

            <div class="flex min-h-[100px] items-center justify-center p-8">
              <ModeSwitch size={s.value} {isDark} />
            </div>
            <CodeBlock
              code={`<ModeSwitch size="${s.value}" />`}
              language="svelte"
              class="text-xs"
            />
          </div>
        {/each}
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="py-6 text-2xl font-bold tracking-tight border-b">Props</h2>
      <PropsTable props={modeSwitchProps} />
    </section>
  </div>
</DocsPage>
