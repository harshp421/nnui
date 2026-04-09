<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { Drawer as DrawerPrimitive } from "vaul-svelte";
  import {
    DocsPage,
    PageHeader,
    ComponentPreview,
    CodeBlock,
    ComponentSource,
    PropsTable,
  } from "$lib/components/docs";

  const installationCode = `import * as Drawer from "$lib/components/ui/drawer";

// Optional: Additional Components
import Button from "$lib/components/ui/button/button.svelte";`;

  const quickStartCode = `<script>
  import { Drawer } from "vaul-svelte";
  import DrawerContent from "$lib/components/ui/drawer/drawer-content.svelte";
  import DrawerHeader from "$lib/components/ui/drawer/drawer-header.svelte";
  import DrawerFooter from "$lib/components/ui/drawer/drawer-footer.svelte";
  import DrawerTitle from "$lib/components/ui/drawer/drawer-title.svelte";
  import DrawerDescription from "$lib/components/ui/drawer/drawer-description.svelte";
${"</"+"script>"}

<Drawer.Root>
    <Drawer.Trigger class="your-button-classes">
        Open Drawer
    </Drawer.Trigger>
    <DrawerContent>
        <DrawerHeader>
            <DrawerTitle>Edit Profile</DrawerTitle>
            <DrawerDescription>
                Make changes to your profile here.
            </DrawerDescription>
        </DrawerHeader>
        <div class="p-5">
            <p>Drawer body content goes here.</p>
        </div>
        <DrawerFooter>
            <Drawer.Close class="your-button-classes">Cancel</Drawer.Close>
            <button class="your-button-classes">Save</button>
        </DrawerFooter>
    </DrawerContent>
</Drawer.Root>`;

  const nestedDrawerCode = `
<Drawer.Root>
    <DrawerPrimitive.Trigger class="...button styles...">
        Open Drawer
    </DrawerPrimitive.Trigger>
    <Drawer.Content>
        <Drawer.Header>
            <Drawer.Title>Parent Drawer</Drawer.Title>
            <Drawer.Description>
                This is the outer drawer. Open a nested one from here.
            </Drawer.Description>
        </Drawer.Header>
        <div class="p-5">
            <Drawer.NestedRoot>
                <DrawerPrimitive.Trigger class="...button styles...">
                    Open Nested Drawer
                </DrawerPrimitive.Trigger>
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>Nested Drawer</Drawer.Title>
                        <Drawer.Description>
                            This drawer is rendered inside the parent.
                        </Drawer.Description>
                    </Drawer.Header>
                    <div class="p-5">
                        <p class="text-text-neutral-secondary">
                            Nested drawer content. Dismissing this
                            returns to the parent drawer.
                        </p>
                    </div>
                    <Drawer.Footer>
                        <DrawerPrimitive.Close>
                            <Button variant="tertiary">Close Nested</Button>
                        </DrawerPrimitive.Close>
                    </Drawer.Footer>
                </Drawer.Content>
            </Drawer.NestedRoot>
        </div>
        <Drawer.Footer>
            <DrawerPrimitive.Close>
                <Button variant="tertiary">Close</Button>
            </DrawerPrimitive.Close>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>`;

  const directionCode = `
<Drawer.Root direction="right">
    <DrawerPrimitive.Trigger class="...button styles...">
        Open Right Drawer
    </DrawerPrimitive.Trigger>
    <Drawer.Content>
        <Drawer.Header>
            <Drawer.Title>Right Drawer</Drawer.Title>
            <Drawer.Description>
                This drawer slides in from the right edge.
            </Drawer.Description>
        </Drawer.Header>
        <div class="p-5 flex-1">
            <p class="text-text-neutral-secondary">
                Use the direction prop to control which edge the
                drawer slides in from: top, bottom, left, or right.
            </p>
        </div>
        <Drawer.Footer>
            <DrawerPrimitive.Close>
                <Button variant="tertiary">Close</Button>
            </DrawerPrimitive.Close>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>`;

  const drawerRootProps = [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "The controlled open state of the drawer.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      default: "-",
      description: "Event handler called when the open state changes.",
    },
    {
      name: "shouldScaleBackground",
      type: "boolean",
      default: "true",
      description:
        "Whether the background content should scale down when the drawer is open.",
    },
    {
      name: "direction",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"bottom"',
      description: "The direction from which the drawer slides in.",
    },
    {
      name: "activeSnapPoint",
      type: "number | string | null",
      default: "null",
      description: "The currently active snap point.",
    },
    {
      name: "snapPoints",
      type: "Array<number | string>",
      default: "-",
      description:
        "Array of snap points the drawer can rest at. Numbers are treated as pixel values, strings as CSS values.",
    },
  ];

  const drawerContentProps = [
    {
      name: "class",
      type: "string",
      default: "-",
      description: "Additional CSS classes to apply to the content container.",
    },
    {
      name: "portalProps",
      type: "DrawerPortalProps",
      default: "-",
      description: "Props passed down to the underlying DrawerPortal component.",
    },
  ];

  const drawerNestedRootProps = [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "The controlled open state of the nested drawer.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      default: "-",
      description: "Event handler called when the nested drawer open state changes.",
    },
    {
      name: "shouldScaleBackground",
      type: "boolean",
      default: "true",
      description:
        "Whether the parent drawer content should scale down when the nested drawer opens.",
    },
  ];
</script>

<DocsPage>
  <PageHeader
    title="Drawer"
    description="A touch-friendly panel that slides in from the edge of the screen with swipe-to-dismiss gestures."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="drawer"
        path="$lib/components/ui/drawer/drawer-content.svelte"
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
          A basic bottom drawer with a trigger button, header, body content, and
          footer with close and action buttons.
        </p>
      </div>
      <ComponentPreview code={quickStartCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <Drawer.Root>
              <DrawerPrimitive.Trigger class="inline-flex items-center justify-center rounded-button-medium-normal-radius bg-button-brand-default-surface px-button-medium-normal-padding-left-right py-button-medium-normal-padding-top-bottom text-sm font-medium text-button-brand-default-text hover:bg-button-brand-hover-surface transition-colors">
                Open Drawer
              </DrawerPrimitive.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Edit Profile</Drawer.Title>
                  <Drawer.Description>
                    Make changes to your profile here. Swipe down to dismiss.
                  </Drawer.Description>
                </Drawer.Header>
                <div class="p-5">
                  <p class="text-text-neutral-secondary">
                    Drawer body content goes here. This panel slides up from the
                    bottom of the screen and supports swipe-to-dismiss gestures.
                  </p>
                </div>
                <Drawer.Footer>
                  <DrawerPrimitive.Close class="inline-flex items-center justify-center rounded-button-medium-normal-radius border border-button-tertiary-default-border bg-button-tertiary-default-surface px-button-medium-normal-padding-left-right py-button-medium-normal-padding-top-bottom text-sm font-medium text-button-tertiary-default-text hover:bg-button-tertiary-hover-surface transition-colors">
                    Cancel
                  </DrawerPrimitive.Close>
                  <button class="inline-flex items-center justify-center rounded-button-medium-normal-radius bg-button-brand-default-surface px-button-medium-normal-padding-left-right py-button-medium-normal-padding-top-bottom text-sm font-medium text-button-brand-default-text hover:bg-button-brand-hover-surface transition-colors">
                    Save
                  </button>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Direction</h2>
        <p class="text-text-neutral-secondary">
          Use the <code>direction</code> prop on <code>Drawer.Root</code> to control
          which edge the drawer slides in from. Supports
          <code>"top"</code>, <code>"bottom"</code>, <code>"left"</code>, and
          <code>"right"</code>.
        </p>
      </div>
      <ComponentPreview code={directionCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <Drawer.Root direction="right">
              <DrawerPrimitive.Trigger class="inline-flex items-center justify-center rounded-button-medium-normal-radius bg-button-neutral-default-surface px-button-medium-normal-padding-left-right py-button-medium-normal-padding-top-bottom text-sm font-medium text-button-neutral-default-text hover:bg-button-neutral-hover-surface transition-colors">
                Open Right Drawer
              </DrawerPrimitive.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Right Drawer</Drawer.Title>
                  <Drawer.Description>
                    This drawer slides in from the right edge.
                  </Drawer.Description>
                </Drawer.Header>
                <div class="p-5 flex-1">
                  <p class="text-text-neutral-secondary">
                    Use the direction prop to control which edge the drawer
                    slides in from: top, bottom, left, or right.
                  </p>
                </div>
                <Drawer.Footer>
                  <DrawerPrimitive.Close class="inline-flex items-center justify-center rounded-button-medium-normal-radius border border-button-tertiary-default-border bg-button-tertiary-default-surface px-button-medium-normal-padding-left-right py-button-medium-normal-padding-top-bottom text-sm font-medium text-button-tertiary-default-text hover:bg-button-tertiary-hover-surface transition-colors">
                    Close
                  </DrawerPrimitive.Close>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Nested Drawers</h2>
        <p class="text-text-neutral-secondary">
          Use <code>Drawer.NestedRoot</code> inside a parent drawer to open a
          second drawer on top. Dismissing the nested drawer returns to the
          parent.
        </p>
      </div>
      <ComponentPreview code={nestedDrawerCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <Drawer.Root>
              <DrawerPrimitive.Trigger class="inline-flex items-center justify-center rounded-button-medium-normal-radius bg-button-brand-default-surface px-button-medium-normal-padding-left-right py-button-medium-normal-padding-top-bottom text-sm font-medium text-button-brand-default-text hover:bg-button-brand-hover-surface transition-colors">
                Open Drawer
              </DrawerPrimitive.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Parent Drawer</Drawer.Title>
                  <Drawer.Description>
                    This is the outer drawer. Open a nested one from here.
                  </Drawer.Description>
                </Drawer.Header>
                <div class="p-5">
                  <Drawer.NestedRoot>
                    <DrawerPrimitive.Trigger class="inline-flex items-center justify-center rounded-button-medium-normal-radius bg-button-neutral-default-surface px-button-medium-normal-padding-left-right py-button-medium-normal-padding-top-bottom text-sm font-medium text-button-neutral-default-text hover:bg-button-neutral-hover-surface transition-colors">
                      Open Nested Drawer
                    </DrawerPrimitive.Trigger>
                    <Drawer.Content>
                      <Drawer.Header>
                        <Drawer.Title>Nested Drawer</Drawer.Title>
                        <Drawer.Description>
                          This drawer is rendered inside the parent.
                        </Drawer.Description>
                      </Drawer.Header>
                      <div class="p-5">
                        <p class="text-text-neutral-secondary">
                          Nested drawer content. Dismissing this returns to the
                          parent drawer.
                        </p>
                      </div>
                      <Drawer.Footer>
                        <DrawerPrimitive.Close class="inline-flex items-center justify-center rounded-button-medium-normal-radius border border-button-tertiary-default-border bg-button-tertiary-default-surface px-button-medium-normal-padding-left-right py-button-medium-normal-padding-top-bottom text-sm font-medium text-button-tertiary-default-text hover:bg-button-tertiary-hover-surface transition-colors">
                          Close Nested
                        </DrawerPrimitive.Close>
                      </Drawer.Footer>
                    </Drawer.Content>
                  </Drawer.NestedRoot>
                </div>
                <Drawer.Footer>
                  <DrawerPrimitive.Close class="inline-flex items-center justify-center rounded-button-medium-normal-radius border border-button-tertiary-default-border bg-button-tertiary-default-surface px-button-medium-normal-padding-left-right py-button-medium-normal-padding-top-bottom text-sm font-medium text-button-tertiary-default-text hover:bg-button-tertiary-hover-surface transition-colors">
                    Close
                  </DrawerPrimitive.Close>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>

      <div class="space-y-20">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Drawer.Root</h3>
          <p class="text-text-neutral-secondary text-sm">
            The main container for the drawer, managing visibility and direction
            state. Wraps all other drawer sub-components.
          </p>
          <PropsTable props={drawerRootProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Drawer.Content</h3>
          <p class="text-text-neutral-secondary text-sm">
            The visual content of the drawer. Automatically renders inside a
            portal with an overlay backdrop.
          </p>
          <PropsTable props={drawerContentProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Drawer.NestedRoot</h3>
          <p class="text-text-neutral-secondary text-sm">
            A nested drawer root that can be placed inside a parent drawer's
            content to create stacked drawers.
          </p>
          <PropsTable props={drawerNestedRootProps} />
        </div>
      </div>
    </section>
  </div>
</DocsPage>
