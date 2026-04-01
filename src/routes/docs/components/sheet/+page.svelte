<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet";
  import Button from "$lib/components/ui/button/button.svelte";
  import {
    DocsPage,
    PageHeader,
    ComponentPreview,
    CodeBlock,
    ComponentSource,
    PropsTable,
  } from "$lib/components/docs";

  const installationCode = `import * as Sheet from "$lib/components/ui/sheet";`;

  const quickStartCode = `<Sheet.Root>
  <Sheet.Trigger>
    <Button variant="primary">Open Sheet</Button>
  </Sheet.Trigger>
  <Sheet.Content>
    <Sheet.Header>
      <Sheet.Title>Sheet Title</Sheet.Title>
      <Sheet.Description>
        This is a side panel that slides in from the edge of the screen.
      </Sheet.Description>
    </Sheet.Header>
    <div class="flex-1 px-6 py-4">
      <p class="text-text-neutral-secondary text-sm">
        Place your secondary content, forms, or navigation here.
      </p>
    </div>
    <Sheet.Footer>
      <Sheet.Close>
        <Button variant="tertiary">Cancel</Button>
      </Sheet.Close>
      <Button variant="primary">Save</Button>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>`;

  const leftSheetCode = `<Sheet.Root>
  <Sheet.Trigger>
    <Button variant="secondary">Open Left</Button>
  </Sheet.Trigger>
  <Sheet.Content side="left">
    <Sheet.Header>
      <Sheet.Title>Left Sheet</Sheet.Title>
      <Sheet.Description>Slides in from the left edge.</Sheet.Description>
    </Sheet.Header>
    <div class="flex-1 px-6 py-4">
      <p class="text-text-neutral-secondary text-sm">
        Useful for navigation panels or sidebars.
      </p>
    </div>
  </Sheet.Content>
</Sheet.Root>`;

  const topSheetCode = `<Sheet.Root>
  <Sheet.Trigger>
    <Button variant="secondary">Open Top</Button>
  </Sheet.Trigger>
  <Sheet.Content side="top">
    <Sheet.Header>
      <Sheet.Title>Top Sheet</Sheet.Title>
      <Sheet.Description>Slides down from the top edge.</Sheet.Description>
    </Sheet.Header>
    <div class="px-6 py-4">
      <p class="text-text-neutral-secondary text-sm">
        Great for notifications, banners, or search overlays.
      </p>
    </div>
  </Sheet.Content>
</Sheet.Root>`;

  const bottomSheetCode = `<Sheet.Root>
  <Sheet.Trigger>
    <Button variant="secondary">Open Bottom</Button>
  </Sheet.Trigger>
  <Sheet.Content side="bottom">
    <Sheet.Header>
      <Sheet.Title>Bottom Sheet</Sheet.Title>
      <Sheet.Description>Slides up from the bottom edge.</Sheet.Description>
    </Sheet.Header>
    <div class="px-6 py-4">
      <p class="text-text-neutral-secondary text-sm">
        Common for mobile action sheets or contextual menus.
      </p>
    </div>
  </Sheet.Content>
</Sheet.Root>`;

  const sheetContentProps = [
    {
      name: "side",
      type: '"left" | "right" | "top" | "bottom"',
      default: '"right"',
      description:
        "The edge of the screen the sheet slides in from.",
    },
    {
      name: "class",
      type: "string",
      default: "-",
      description:
        "Additional CSS classes to apply to the sheet content container.",
    },
    {
      name: "portalProps",
      type: "SheetPortalProps",
      default: "-",
      description:
        "Props passed down to the underlying SheetPortal component.",
    },
  ];

  const sheetRootProps = [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "The controlled open state of the sheet.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      default: "-",
      description: "Event handler called when the open state changes.",
    },
  ];
</script>

<DocsPage>
  <PageHeader
    title="Sheet"
    description="A side panel that slides in from the edge of the screen for secondary content and forms."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="sheet"
        path="$lib/components/ui/sheet/sheet-content.svelte"
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
          A basic sheet consists of a trigger, content area with header,
          description, body, and footer. By default the sheet slides in from the
          right.
        </p>
      </div>
      <ComponentPreview code={quickStartCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <Sheet.Root>
              <Sheet.Trigger>
                <Button variant="primary">Open Sheet</Button>
              </Sheet.Trigger>
              <Sheet.Content>
                <Sheet.Header>
                  <Sheet.Title>Sheet Title</Sheet.Title>
                  <Sheet.Description>
                    This is a side panel that slides in from the edge of the
                    screen.
                  </Sheet.Description>
                </Sheet.Header>
                <div class="flex-1 px-6 py-4">
                  <p class="text-text-neutral-secondary text-sm">
                    Place your secondary content, forms, or navigation here.
                  </p>
                </div>
                <Sheet.Footer>
                  <Sheet.Close>
                    <Button variant="tertiary">Cancel</Button>
                  </Sheet.Close>
                  <Button variant="primary">Save</Button>
                </Sheet.Footer>
              </Sheet.Content>
            </Sheet.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Side Variants</h2>
        <p class="text-text-neutral-secondary">
          The sheet can slide in from any edge of the screen. Use the
          <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">side</code>
          prop on <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">Sheet.Content</code>
          to control the direction.
        </p>
      </div>

      <!-- Right (default) -->
      <div class="space-y-4">
        <h3 class="text-xl font-semibold">Right (default)</h3>
        <p class="text-text-neutral-secondary text-sm">
          The default side. Ideal for detail panels, settings, and edit forms.
        </p>
        <ComponentPreview code={quickStartCode}>
          {#snippet preview()}
            <div class="flex items-center justify-center p-10 w-full">
              <Sheet.Root>
                <Sheet.Trigger>
                  <Button variant="secondary">Open Right</Button>
                </Sheet.Trigger>
                <Sheet.Content side="right">
                  <Sheet.Header>
                    <Sheet.Title>Right Sheet</Sheet.Title>
                    <Sheet.Description>
                      Slides in from the right edge.
                    </Sheet.Description>
                  </Sheet.Header>
                  <div class="flex-1 px-6 py-4">
                    <p class="text-text-neutral-secondary text-sm">
                      Ideal for detail panels, settings, and edit forms.
                    </p>
                  </div>
                </Sheet.Content>
              </Sheet.Root>
            </div>
          {/snippet}
        </ComponentPreview>
      </div>

      <!-- Left -->
      <div class="space-y-4">
        <h3 class="text-xl font-semibold">Left</h3>
        <p class="text-text-neutral-secondary text-sm">
          Useful for navigation panels, sidebars, or table-of-contents overlays.
        </p>
        <ComponentPreview code={leftSheetCode}>
          {#snippet preview()}
            <div class="flex items-center justify-center p-10 w-full">
              <Sheet.Root>
                <Sheet.Trigger>
                  <Button variant="secondary">Open Left</Button>
                </Sheet.Trigger>
                <Sheet.Content side="left">
                  <Sheet.Header>
                    <Sheet.Title>Left Sheet</Sheet.Title>
                    <Sheet.Description>
                      Slides in from the left edge.
                    </Sheet.Description>
                  </Sheet.Header>
                  <div class="flex-1 px-6 py-4">
                    <p class="text-text-neutral-secondary text-sm">
                      Useful for navigation panels or sidebars.
                    </p>
                  </div>
                </Sheet.Content>
              </Sheet.Root>
            </div>
          {/snippet}
        </ComponentPreview>
      </div>

      <!-- Top -->
      <div class="space-y-4">
        <h3 class="text-xl font-semibold">Top</h3>
        <p class="text-text-neutral-secondary text-sm">
          Great for notifications, banners, or search overlays that drop down
          from the top of the viewport.
        </p>
        <ComponentPreview code={topSheetCode}>
          {#snippet preview()}
            <div class="flex items-center justify-center p-10 w-full">
              <Sheet.Root>
                <Sheet.Trigger>
                  <Button variant="secondary">Open Top</Button>
                </Sheet.Trigger>
                <Sheet.Content side="top">
                  <Sheet.Header>
                    <Sheet.Title>Top Sheet</Sheet.Title>
                    <Sheet.Description>
                      Slides down from the top edge.
                    </Sheet.Description>
                  </Sheet.Header>
                  <div class="px-6 py-4">
                    <p class="text-text-neutral-secondary text-sm">
                      Great for notifications, banners, or search overlays.
                    </p>
                  </div>
                </Sheet.Content>
              </Sheet.Root>
            </div>
          {/snippet}
        </ComponentPreview>
      </div>

      <!-- Bottom -->
      <div class="space-y-4">
        <h3 class="text-xl font-semibold">Bottom</h3>
        <p class="text-text-neutral-secondary text-sm">
          Common on mobile for action sheets, contextual menus, or confirmation
          panels that slide up from the bottom.
        </p>
        <ComponentPreview code={bottomSheetCode}>
          {#snippet preview()}
            <div class="flex items-center justify-center p-10 w-full">
              <Sheet.Root>
                <Sheet.Trigger>
                  <Button variant="secondary">Open Bottom</Button>
                </Sheet.Trigger>
                <Sheet.Content side="bottom">
                  <Sheet.Header>
                    <Sheet.Title>Bottom Sheet</Sheet.Title>
                    <Sheet.Description>
                      Slides up from the bottom edge.
                    </Sheet.Description>
                  </Sheet.Header>
                  <div class="px-6 py-4">
                    <p class="text-text-neutral-secondary text-sm">
                      Common for mobile action sheets or contextual menus.
                    </p>
                  </div>
                </Sheet.Content>
              </Sheet.Root>
            </div>
          {/snippet}
        </ComponentPreview>
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>

      <div class="space-y-20">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Sheet.Root</h3>
          <p class="text-text-neutral-secondary text-sm">
            The main container for the sheet, managing visibility state. Wraps
            the bits-ui Dialog primitive.
          </p>
          <PropsTable props={sheetRootProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Sheet.Content</h3>
          <p class="text-text-neutral-secondary text-sm">
            The visual panel of the sheet. Renders inside a portal with an
            overlay backdrop. Controls the slide direction via the
            <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">side</code>
            prop.
          </p>
          <PropsTable props={sheetContentProps} />
        </div>
      </div>
    </section>
  </div>
</DocsPage>
