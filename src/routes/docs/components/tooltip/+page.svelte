<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip";
  import Button from "$lib/components/ui/button/button.svelte";
  import Seo from "$lib/components/seo.svelte";
  import {
    CodeBlock,
    ComponentPreview,
    ComponentSource,
    DocsPage,
    Icon,
    PageHeader,
    PropsTable,
  } from "$lib/components/docs";

  const installationCode = `npx nnuikit add tooltip

import * as Tooltip from "$lib/components/ui/tooltip";`;

  const quickStartCode = `
<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button variant="tertiary">Hover me</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>This is a tooltip</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>`;

  const placementCode = `
<Tooltip.Provider>
  <div class="flex items-center gap-16">
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button variant="tertiary">Top</Button>
      </Tooltip.Trigger>
      <Tooltip.Content side="top">
        <p>Tooltip on top</p>
      </Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button variant="tertiary">Bottom</Button>
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom">
        <p>Tooltip on bottom</p>
      </Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button variant="tertiary">Left</Button>
      </Tooltip.Trigger>
      <Tooltip.Content side="left">
        <p>Tooltip on left</p>
      </Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button variant="tertiary">Right</Button>
      </Tooltip.Trigger>
      <Tooltip.Content side="right">
        <p>Tooltip on right</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </div>
</Tooltip.Provider>`;

  const delayCode = `
<Tooltip.Provider delayDuration={0}>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button variant="tertiary">No delay</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>Appears instantly</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>`;

  const providerProps = [
    {
      name: "delayDuration",
      type: "number",
      default: "700",
      description:
        "The duration in milliseconds from when the pointer enters the trigger until the tooltip opens.",
    },
    {
      name: "disableHoverableContent",
      type: "boolean",
      default: "false",
      description:
        "When true, prevents the tooltip content from remaining open when hovering over it.",
    },
    {
      name: "skipDelayDuration",
      type: "number",
      default: "300",
      description:
        "How much time a user has to enter another trigger without incurring a delay again.",
    },
  ];

  const rootProps = [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "The controlled open state of the tooltip.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      default: "-",
      description: "Event handler called when the open state changes.",
    },
    {
      name: "delayDuration",
      type: "number",
      default: "700",
      description:
        "Override the provider's delay duration for this specific tooltip instance.",
    },
    {
      name: "disableHoverableContent",
      type: "boolean",
      default: "false",
      description:
        "Override the provider's disableHoverableContent for this specific tooltip instance.",
    },
  ];

  const contentProps = [
    {
      name: "side",
      type: "'top' | 'right' | 'bottom' | 'left'",
      default: "'top'",
      description: "The preferred side of the trigger to render against.",
    },
    {
      name: "sideOffset",
      type: "number",
      default: "0",
      description: "The distance in pixels from the trigger.",
    },
    {
      name: "align",
      type: "'start' | 'center' | 'end'",
      default: "'center'",
      description: "The preferred alignment against the trigger.",
    },
    {
      name: "arrowClasses",
      type: "string",
      default: "-",
      description: "Additional CSS classes to apply to the tooltip arrow element.",
    },
    {
      name: "class",
      type: "string",
      default: "-",
      description: "Additional CSS classes to apply to the tooltip content.",
    },
  ];
</script>

<Seo
  title="Tooltip"
  description="A popup that displays information related to an element on hover or focus."
/>

<DocsPage>
  <PageHeader
    title="Tooltip"
    description="A popup that displays information related to an element on hover or focus."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="tooltip"
        path="$lib/components/ui/tooltip/tooltip-content.svelte"
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
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
        <p class="text-text-neutral-secondary">
          Wrap your triggers in a <code>Tooltip.Provider</code>, then use
          <code>Tooltip.Root</code>, <code>Tooltip.Trigger</code>, and
          <code>Tooltip.Content</code> to compose a tooltip.
        </p>
      </div>
      <ComponentPreview code={quickStartCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger>
                  <Button variant="tertiary">Hover me</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>This is a tooltip</p>
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Placement</h2>
        <p class="text-text-neutral-secondary">
          Use the <code>side</code> prop on <code>Tooltip.Content</code> to control
          where the tooltip appears relative to the trigger. Supports
          <code>top</code>, <code>bottom</code>, <code>left</code>, and
          <code>right</code>.
        </p>
      </div>
      <ComponentPreview code={placementCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <Tooltip.Provider>
              <div class="flex items-center gap-16 flex-wrap">
                <Tooltip.Root>
                  <Tooltip.Trigger>
                    <Button variant="tertiary">Top</Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content side="top">
                    <p>Tooltip on top</p>
                  </Tooltip.Content>
                </Tooltip.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger>
                    <Button variant="tertiary">Bottom</Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content side="bottom">
                    <p>Tooltip on bottom</p>
                  </Tooltip.Content>
                </Tooltip.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger>
                    <Button variant="tertiary">Left</Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content side="left">
                    <p>Tooltip on left</p>
                  </Tooltip.Content>
                </Tooltip.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger>
                    <Button variant="tertiary">Right</Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content side="right">
                    <p>Tooltip on right</p>
                  </Tooltip.Content>
                </Tooltip.Root>
              </div>
            </Tooltip.Provider>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Custom Delay</h2>
        <p class="text-text-neutral-secondary">
          Control the open delay using <code>delayDuration</code> on the
          <code>Tooltip.Provider</code> or individual <code>Tooltip.Root</code>.
          Set to <code>0</code> for instant tooltips.
        </p>
      </div>
      <ComponentPreview code={delayCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <Tooltip.Provider delayDuration={0}>
              <Tooltip.Root>
                <Tooltip.Trigger>
                  <Button variant="tertiary">No delay</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>Appears instantly</p>
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Accessibility</h2>
      <div class="flex flex-col gap-2.5">
        {#each [
          'Keyboard: focus trigger to show tooltip',
          'Screen reader: tooltip content is announced via aria-describedby',
          'Hover: appears on mouse hover with configurable delay',
          'Escape: pressing Escape dismisses the tooltip'
        ] as item (item)}
          <div class="flex items-start gap-2.5 text-sm text-text-neutral-secondary">
            <Icon name="check" class="size-16 shrink-0 mt-0.5 text-text-brand-primary" />
            {item}
          </div>
        {/each}
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="py-6 text-2xl font-bold tracking-tight border-b border-border-neutral-l4">API Reference</h2>

      <div class="space-y-20">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Tooltip.Provider</h3>
          <p class="text-text-neutral-secondary text-sm">
            Wraps your app or a section of it to provide shared tooltip
            configuration such as delay duration.
          </p>
          <PropsTable props={providerProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Tooltip.Root</h3>
          <p class="text-text-neutral-secondary text-sm">
            Contains all the parts of an individual tooltip. Manages visibility
            state.
          </p>
          <PropsTable props={rootProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Tooltip.Content</h3>
          <p class="text-text-neutral-secondary text-sm">
            The popup content that appears when the tooltip is open. Renders
            inside a portal with an arrow indicator.
          </p>
          <PropsTable props={contentProps} />
        </div>
      </div>

      <div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 px-5 py-4">
        <p class="text-sm text-text-neutral-secondary">
          <strong class="text-text-neutral-primary">Built on bits-ui</strong> —
          Tooltip uses <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">Tooltip</code> from bits-ui for positioning, portal rendering, and ARIA attributes.
          For the full primitive API (animations, forceMount, etc.), see the
          <a href="https://bits-ui.com/docs/components/tooltip" target="_blank" rel="noopener noreferrer" class="text-text-brand-primary underline underline-offset-2">bits-ui Tooltip docs</a>.
        </p>
      </div>
    </section>
  </div>
</DocsPage>
