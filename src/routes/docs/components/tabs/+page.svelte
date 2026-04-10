<script lang="ts">
  import Seo from "$lib/components/seo.svelte";
  import * as Tabs from "$lib/components/ui/tabs";
  import { Button } from "$lib/components/ui/button";
  import {
    DocsPage,
    PageHeader,
    ComponentPreview,
    CodeBlock,
    PropsTable,
    ComponentSource,
    Icon,
  } from "$lib/components/docs";

  const sizes = [
    { value: "fit-content" as const, label: "Fit Content" },
    { value: "full-width" as const, label: "Full Width" },
  ];

  const variants = [
    { value: "secondary" as const, label: "Secondary" },
    { value: "primary" as const, label: "Primary" },
    { value: "contained" as const, label: "Contained" },
    { value: "brand" as const, label: "Brand" },
  ];

  let size = $state<(typeof sizes)[number]["value"]>("fit-content");
  let variant = $state<(typeof variants)[number]["value"]>("secondary");
  let currentTab = $state("overview");

  function getTabsCode() {
    const sizeAttr = size !== "fit-content" ? ` size="${size}"` : "";
    const variantAttr = variant !== "secondary" ? ` variant="${variant}"` : "";
    return `<Tabs.Root value="overview">
  <Tabs.List${sizeAttr}${variantAttr}>
    <Tabs.Trigger ${variantAttr}  value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger ${variantAttr}  value="analytics">Analytics</Tabs.Trigger>
    <Tabs.Trigger ${variantAttr}  value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">Overview content</Tabs.Content>
  <Tabs.Content value="analytics">Analytics content</Tabs.Content>
  <Tabs.Content value="settings">Settings content</Tabs.Content>
</Tabs.Root>`;
  }

  const installationCode = `npx nnuikit add tabs

import * as Tabs from "$lib/components/ui/tabs";`;

  const quickStartCode = `<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
<\/script>

<Tabs.Root value="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
  <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
</Tabs.Root>`;

  const tabsProps = [
    {
      name: "value",
      type: "string",
      default: "-",
      description: "The active tab value (bindable).",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      default: "-",
      description: "Callback when active tab changes.",
    },
  ];

  const listProps = [
    {
      name: "size",
      type: "'fit-content' | 'full-width'",
      default: "'fit-content'",
      description: "Width behavior of the tab list.",
    },
    {
      name: "variant",
      type: "'secondary' | 'primary' | 'contained' | 'brand'",
      default: "'secondary'",
      description: "Visual style variant.",
    },
  ];
</script>

<Seo
  title="Tabs"
  description="An accessible set of layered sections of content displayed one at a time. Supports multiple visual variants and keyboard navigation."
/>

<DocsPage>
  <PageHeader
    title="Tabs"
    description="An accessible set of layered sections of content, known as tab panels, that are displayed one at a time."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource name="tabs" path="$lib/components/ui/tabs/" />
    </div>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Installation</h2>
      <CodeBlock code={installationCode} language="typescript" />
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
      <ComponentPreview code={quickStartCode}>
        {#snippet preview()}
          <div
            class="w-full max-w-sm mx-auto p-4 border rounded-xl bg-card shadow-sm"
          >
            <Tabs.Root value="tab1">
              <Tabs.List>
                <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content
                value="tab1"
                class="py-4 text-sm text-muted-foreground"
                >Content for Tab 1</Tabs.Content
              >
              <Tabs.Content
                value="tab2"
                class="py-4 text-sm text-muted-foreground"
                >Content for Tab 2</Tabs.Content
              >
            </Tabs.Root>
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
          Switch between size and variant configurations to see how they affect
          layout and styling.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 items-start">
        <div class="space-y-6">
          <div class="border rounded-xl bg-card shadow-sm p-12 min-h-[300px]">
            <Tabs.Root bind:value={currentTab}>
              <Tabs.List {size} {variant}>
                <Tabs.Trigger {size} {variant} value="overview"
                  >Overview</Tabs.Trigger
                >
                <Tabs.Trigger {size} {variant} value="analytics"
                  >Analytics</Tabs.Trigger
                >
                <Tabs.Trigger {size} {variant} value="settings"
                  >Settings</Tabs.Trigger
                >
              </Tabs.List>
              <Tabs.Content value="overview">
                <div class="py-6 space-y-3">
                  <h3 class="text-lg font-semibold">Overview</h3>
                  <p class="text-sm text-muted-foreground">
                    This is the overview tab content. Modern and clean layout
                    for your dashboard.
                  </p>
                </div>
              </Tabs.Content>
              <Tabs.Content value="analytics">
                <div class="py-6 space-y-3">
                  <h3 class="text-lg font-semibold">Analytics</h3>
                  <p class="text-sm text-muted-foreground">
                    Performance metrics and data visualizations are normally
                    here.
                  </p>
                </div>
              </Tabs.Content>
              <Tabs.Content value="settings">
                <div class="py-6 space-y-3">
                  <h3 class="text-lg font-semibold">Settings</h3>
                  <p class="text-sm text-muted-foreground">
                    Change your account preferences and global configuration.
                  </p>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
          <CodeBlock code={getTabsCode()} language="svelte" class="text-xs" />
        </div>

        <div class="p-6 space-y-8">
          <div class="space-y-4">
            <label for="demo" class="text-sm font-bold">Size</label>
            <div class="grid grid-cols-2 gap-2">
              {#each sizes as opt (opt.value)}
                <Button
                  variant={size === opt.value ? "primary" : "tertiary"}
                  size="sm"
                  onclick={() => (size = opt.value)}
                >
                  {opt.label}
                </Button>
              {/each}
            </div>
          </div>

          <div class="space-y-4">
            <label for="demo" class="text-sm font-bold">Variant</label>
            <div class="grid grid-cols-3 gap-2">
              {#each variants as opt (opt.value)}
                <Button
                  variant={variant === opt.value ? "primary" : "tertiary"}
                  size="sm"
                  onclick={() => (variant = opt.value)}
                >
                  {opt.label}
                </Button>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Visual Variants</h2>
        <p class="text-text-neutral-secondary">
          Explore different visual styles for tabs.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <div
          class="flex flex-col space-y-16 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Primary Underline</p>
          </div>
          <div class="p-4">
            <Tabs.Root value="v1">
              <Tabs.List variant="primary">
                <Tabs.Trigger variant="primary" value="v1">Active</Tabs.Trigger>
                <Tabs.Trigger variant="primary" value="v2"
                  >Inactive</Tabs.Trigger
                >
              </Tabs.List>
              <Tabs.Content
                value="v1"
                class="py-4 text-sm text-muted-foreground"
                >Primary uses an underline indicator.</Tabs.Content
              >
            </Tabs.Root>
          </div>
        </div>

        <div
          class="flex flex-col space-y-16 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Brand Underline</p>
          </div>
          <div class="p-4">
            <Tabs.Root value="b1">
              <Tabs.List variant="brand">
                <Tabs.Trigger variant="brand" value="b1">Active</Tabs.Trigger>
                <Tabs.Trigger variant="brand" value="b2">Inactive</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content
                value="b1"
                class="py-4 text-sm text-muted-foreground"
                >Brand uses the primary brand color for the underline indicator</Tabs.Content
              >
            </Tabs.Root>
          </div>
        </div>
      </div>
    </section>

    <!-- Accessibility -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Accessibility</h2>
      <div class="flex flex-col gap-2.5">
        {#each [
          'Keyboard: Arrow keys navigate between tabs',
          "ARIA: role='tablist' on list, role='tab' on triggers, role='tabpanel' on content",
          'Focus: focus-visible ring on keyboard navigation',
          'Activation: tabs activate on focus (automatic activation)'
        ] as item (item)}
          <div class="flex items-start gap-2.5 text-sm text-text-neutral-secondary">
            <Icon name="check" class="size-16 shrink-0 mt-0.5 text-text-brand-primary" />
            {item}
          </div>
        {/each}
      </div>
    </section>

    <!-- API Reference -->
    <section class="space-y-8">
      <h2 class="py-6 text-2xl font-bold tracking-tight border-b border-border-neutral-l4">API Reference</h2>
      <div class="space-y-20">
        <div>
          <h3 class="text-lg font-bold mb-4 px-4">Tabs.Root</h3>
          <PropsTable props={tabsProps} />
        </div>
        <div>
          <h3 class="text-lg font-bold mb-4 px-4">Tabs.List</h3>
          <PropsTable props={listProps} />
        </div>
      </div>

      <!-- bits-ui reference -->
      <div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 px-5 py-4">
        <p class="text-sm text-text-neutral-secondary">
          <strong class="text-text-neutral-primary">Built on bits-ui</strong> —
          Tabs uses <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">Tabs</code> from bits-ui for ARIA roles, keyboard navigation, and focus management.
          For the full primitive API, see the
          <a href="https://bits-ui.com/docs/components/tabs" target="_blank" rel="noopener noreferrer" class="text-text-brand-primary underline underline-offset-2">bits-ui Tabs docs</a>.
        </p>
      </div>
    </section>
  </div>
</DocsPage>
