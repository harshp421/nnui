<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Dialog from "$lib/components/ui/dialog";
  import {
    CodeBlock,
    ComponentPreview,
    ComponentSource,
    DocsPage,
    PageHeader,
    PropsTable,
  } from "$lib/components/docs";

  const installationCode = `import * as Dialog from "$lib/components/ui/dialog";

// Optional: Additional Components
import Button from "$lib/components/ui/button/button.svelte";`;

  const quickStartCode = `
<Dialog.Root>
    <Dialog.Trigger>
        <Button variant="primary">Open Dialog</Button>
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Default Dialog Structure</Dialog.Title>
            <Dialog.Description>
                This dialog uses the standard header, content, and footer sections.
            </Dialog.Description>
        </Dialog.Header>
        <div class="py-6 min-h-[100px] flex items-center justify-center border-y border-dashed">
            <p class="text-muted-foreground italic">
                Custom body content goes here.
            </p>
        </div>
        <Dialog.Footer>
            <Dialog.Close>
                <Button variant="tertiary">Cancel</Button>
                    </Dialog.Close>
                <Button variant="primary">Save Changes</Button>
            </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>`;

  const manualControlCode = `let open = $state(false);

<Dialog.Root bind:open>
    <Button onclick={() => (open = true)}>Manual Open</Button>
    <Dialog.Content>
        ...
    </Dialog.Content>
</Dialog.Root>`;

  const dialogRootProps = [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "The controlled open state of the dialog.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      default: "-",
      description: "Event handler called when the open state changes.",
    },
  ];

  const dialogContentProps = [
    {
      name: "showCloseButton",
      type: "boolean",
      default: "true",
      description:
        "Whether to show the default close (X) button in the corner.",
    },
    {
      name: "portalProps",
      type: "DialogPortalProps",
      default: "-",
      description: "Props passed down to the DialogPortal component.",
    },
  ];

  let manalOpen = $state(false);
</script>

<DocsPage>
  <PageHeader
    title="Dialog"
    description="A window overlaid on either the primary window or another dialog window, rendering the content underneath inert."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource name="dialog" path="src/lib/components/ui/dialog" />
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
          A basic dialog consists of a trigger, content area with header, body,
          and footer.
        </p>
      </div>
      <ComponentPreview code={quickStartCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <Dialog.Root>
              <Dialog.Trigger>
                <Button variant="primary">Open Dialog</Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Default Dialog Structure</Dialog.Title>
                  <Dialog.Description>
                    This dialog uses the standard header, content, and footer
                    sections.
                  </Dialog.Description>
                </Dialog.Header>
                <div
                  class="py-6 min-h-[100px] flex items-center justify-center border-y border-dashed bg-surface-neutral-l2"
                >
                  <p class="text-text-neutral-secondary italic">
                    Custom body content goes here.
                  </p>
                </div>
                <Dialog.Footer>
                  <Dialog.Close>
                    <Button variant="tertiary">Cancel</Button>
                  </Dialog.Close>
                  <Button variant="primary">Save Changes</Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Manual Control</h2>
        <p class="text-text-neutral-secondary">
          Use <code>bind:open</code> to control the dialog state programmatically.
        </p>
      </div>
      <ComponentPreview code={manualControlCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <Button variant="tertiary" onclick={() => (manalOpen = true)}>
              Control via State ({manalOpen ? "Open" : "Closed"})
            </Button>
            <Dialog.Root bind:open={manalOpen}>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Programmatic Control</Dialog.Title>
                  <Dialog.Description>
                    This dialog's visibility is managed via a Svelte state
                    variable.
                  </Dialog.Description>
                </Dialog.Header>
                <div class="py-4">
                  <p>
                    This can be useful for opening dialogs after some logic
                    completes.
                  </p>
                </div>
                <Dialog.Footer>
                  <Button variant="primary" onclick={() => (manalOpen = false)}
                    >Close me</Button
                  >
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">No Close Button</h2>
        <p class="text-text-neutral-secondary">
          You can hide the top-right close button by setting <code
            >showCloseButton</code
          >
          to <code>false</code>.
        </p>
      </div>
      <ComponentPreview
        code={`<Dialog.Content showCloseButton={false}>...</Dialog.Content>`}
      >
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <Dialog.Root>
              <Dialog.Trigger>
                <Button variant="secondary">Open Persistent Dialog</Button>
              </Dialog.Trigger>
              <Dialog.Content showCloseButton={false}>
                <Dialog.Header>
                  <Dialog.Title>No Close Icon</Dialog.Title>
                  <Dialog.Description>
                    The X button is hidden. You must provide another way to
                    close the dialog.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Footer>
                  <Dialog.Close>
                    <Button variant="primary">Got it</Button>
                  </Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>

      <div class="space-y-20">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Dialog.Root</h3>
          <p class="text-text-neutral-secondary text-sm">
            The main container for the dialog, managing visibility state.
          </p>
          <PropsTable props={dialogRootProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Dialog.Content</h3>
          <p class="text-text-neutral-secondary text-sm">
            The visual content of the dialog. Wraps everything inside a portal
            and overlay.
          </p>
          <PropsTable props={dialogContentProps} />
        </div>
      </div>
    </section>
  </div>
</DocsPage>
