<script lang="ts">
  import Seo from "$lib/components/seo.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Input } from "$lib/components/ui/input";
  import * as Dialog from "$lib/components/ui/dialog";
  import {
    CodeBlock,
    ComponentPreview,
    ComponentSource,
    DocsPage,
    PageHeader,
    PropsTable,
    Icon,
  } from "$lib/components/docs";

  // Playground state
  let playgroundOpen = $state(false);
  let showCloseButton = $state(true);

  // Manual control demo
  let manualOpen = $state(false);

  function getPlaygroundCode() {
    const closeAttr = !showCloseButton ? `\n    showCloseButton={false}` : '';
    return `<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import Button from "$lib/components/ui/button/button.svelte";
${"</"+"script>"}

<Dialog.Root>
  <Dialog.Trigger>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  <Dialog.Content${closeAttr}>
    <Dialog.Header>
      <Dialog.Title>Edit Profile</Dialog.Title>
      <Dialog.Description>
        Make changes to your profile here.
      </Dialog.Description>
    </Dialog.Header>
    <div class="py-5">
      <!-- Your content here -->
    </div>
    <Dialog.Footer>
      <Dialog.Close>
        <Button variant="tertiary">Cancel</Button>
      </Dialog.Close>
      <Button variant="primary">Save</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`;
  }

  const installationCode = `npx nnuikit add dialog

# Dialog uses bits-ui under the hood
# Also add button for trigger/actions
npx nnuikit add button`;

  const importCode = `import * as Dialog from "$lib/components/ui/dialog";
import Button from "$lib/components/ui/button/button.svelte";`;

  const quickStartCode = `<Dialog.Root>
  <Dialog.Trigger>
    <Button variant="primary">Open Dialog</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>
        A short description of what this dialog does.
      </Dialog.Description>
    </Dialog.Header>
    <div class="py-5">
      <p>Your content goes here.</p>
    </div>
    <Dialog.Footer>
      <Dialog.Close>
        <Button variant="tertiary">Cancel</Button>
      </Dialog.Close>
      <Button variant="primary">Confirm</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`;

  const manualControlCode = `<script lang="ts">
  let open = $state(false);
${"</"+"script>"}

<Button onclick={() => (open = true)}>Open</Button>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Controlled Dialog</Dialog.Title>
      <Dialog.Description>
        Opened programmatically via state.
      </Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Button onclick={() => (open = false)}>Close</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`;

  const formDialogCode = `<Dialog.Root>
  <Dialog.Trigger>
    <Button>Edit Profile</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit Profile</Dialog.Title>
      <Dialog.Description>
        Update your name and email below.
      </Dialog.Description>
    </Dialog.Header>
    <form class="flex flex-col gap-4 py-5">
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium">Name</label>
        <Input placeholder="John Doe" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium">Email</label>
        <Input type="email" placeholder="john@example.com" />
      </div>
    </form>
    <Dialog.Footer>
      <Dialog.Close>
        <Button variant="tertiary">Cancel</Button>
      </Dialog.Close>
      <Button variant="primary">Save Changes</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`;

  const dialogContentProps = [
    { name: "showCloseButton", type: "boolean", default: "true", description: "Show/hide the close (X) button in the top corner." },
    { name: "class", type: "string", default: '""', description: "Additional CSS classes for the content container." },
    { name: "portalProps", type: "PortalProps", default: "-", description: "Props passed to the underlying Portal component." },
  ];

  const subComponents = [
    { name: "Dialog.Root", description: "Container that manages open/close state. Accepts open and onOpenChange props." },
    { name: "Dialog.Trigger", description: "Wraps the element that opens the dialog on click." },
    { name: "Dialog.Content", description: "The modal panel. Renders inside a portal with overlay and focus trap." },
    { name: "Dialog.Header", description: "Semantic header area for title and description." },
    { name: "Dialog.Title", description: "The dialog's heading. Required for accessibility." },
    { name: "Dialog.Description", description: "Supporting text below the title." },
    { name: "Dialog.Footer", description: "Action area at the bottom for buttons." },
    { name: "Dialog.Close", description: "Wraps a button that closes the dialog on click." },
    { name: "Dialog.Overlay", description: "Backdrop overlay. Rendered automatically by Content." },
  ];
</script>

<Seo
  title="Dialog"
  description="A modal dialog with backdrop overlay, focus trap, and keyboard dismiss. Built on bits-ui for full accessibility."
/>

<DocsPage>
  <PageHeader
    title="Dialog"
    description="A modal window overlaid on the page with backdrop, focus trap, and keyboard support. Built on bits-ui."
  />

  <div class="mt-28 flex flex-col gap-32">

    <div>
      <ComponentSource name="dialog" path="$lib/components/ui/dialog/dialog-content.svelte" />
    </div>

    <!-- Installation -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Installation</h2>
      <CodeBlock code={installationCode} language="bash" title="CLI" />
      <CodeBlock code={importCode} language="typescript" title="Import" />
    </section>

    <!-- Quick Start -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
      <ComponentPreview code={quickStartCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <Dialog.Root>
              <Dialog.Trigger>
                <Button variant="primary">Open Dialog</Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Dialog Title</Dialog.Title>
                  <Dialog.Description>
                    A short description of what this dialog does.
                  </Dialog.Description>
                </Dialog.Header>
                <div class="flex items-center justify-center py-10 border-y border-dashed border-border-neutral-l4">
                  <p class="text-sm text-text-neutral-tertiary italic">Your content goes here.</p>
                </div>
                <Dialog.Footer>
                  <Dialog.Close>
                    <Button variant="tertiary">Cancel</Button>
                  </Dialog.Close>
                  <Button variant="primary">Confirm</Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <!-- Interactive Playground -->
    <section class="space-y-20">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Interactive Playground</h2>
        <p class="text-text-neutral-secondary">Toggle options and see the generated code.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-5 items-start">
        <!-- Preview -->
        <div class="flex flex-col items-center justify-center gap-5 rounded-xl border border-border-neutral-l4 p-10">
          <Button variant="primary" onclick={() => (playgroundOpen = true)}>
            Open Dialog
          </Button>
          <p class="text-xs text-text-neutral-tertiary">
            Close button: {showCloseButton ? 'visible' : 'hidden'}
          </p>
          <Dialog.Root bind:open={playgroundOpen}>
            <Dialog.Content showCloseButton={showCloseButton}>
              <Dialog.Header>
                <Dialog.Title>Edit Profile</Dialog.Title>
                <Dialog.Description>
                  Make changes to your profile here.
                </Dialog.Description>
              </Dialog.Header>
              <form class="flex flex-col gap-3.5 py-5">
                <div class="flex flex-col gap-1.5">
                  <label class="text-sm font-medium text-text-neutral-primary">Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-sm font-medium text-text-neutral-primary">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
              </form>
              <Dialog.Footer>
                <Dialog.Close>
                  <Button variant="tertiary">Cancel</Button>
                </Dialog.Close>
                <Button variant="primary" onclick={() => (playgroundOpen = false)}>Save</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </div>

        <!-- Controls -->
        <div class="flex flex-col gap-7 rounded-xl border border-border-neutral-l4 p-5">
          <div class="flex flex-col gap-3">
            <span class="text-sm font-semibold text-text-neutral-primary">Options</span>
            <label class="flex items-center gap-2.5 text-sm text-text-neutral-secondary">
              <input type="checkbox" bind:checked={showCloseButton} class="accent-surface-brand-primary" />
              Show close button (X)
            </label>
          </div>
        </div>
      </div>

      <CodeBlock code={getPlaygroundCode()} language="svelte" title="Generated code" />
    </section>

    <!-- Examples -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Examples</h2>

      <div class="flex flex-col gap-7">
        <!-- Manual Control -->
        <div class="flex flex-col gap-3">
          <h3 class="text-base font-semibold text-text-neutral-primary">Programmatic control</h3>
          <p class="text-sm text-text-neutral-secondary">Use <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">bind:open</code> to open/close the dialog from code.</p>
          <ComponentPreview code={manualControlCode}>
            {#snippet preview()}
              <div class="flex items-center justify-center p-10 w-full">
                <Button variant="tertiary" onclick={() => (manualOpen = true)}>
                  Open via state ({manualOpen ? 'open' : 'closed'})
                </Button>
                <Dialog.Root bind:open={manualOpen}>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Controlled Dialog</Dialog.Title>
                      <Dialog.Description>Opened programmatically via state.</Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Footer>
                      <Button variant="primary" onclick={() => (manualOpen = false)}>Close</Button>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            {/snippet}
          </ComponentPreview>
        </div>

        <!-- Form Dialog -->
        <div class="flex flex-col gap-3">
          <h3 class="text-base font-semibold text-text-neutral-primary">Form dialog</h3>
          <p class="text-sm text-text-neutral-secondary">A common pattern — form inputs inside a dialog with cancel/save actions.</p>
          <ComponentPreview code={formDialogCode}>
            {#snippet preview()}
              <div class="flex items-center justify-center p-10 w-full">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button>Edit Profile</Button>
                  </Dialog.Trigger>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Edit Profile</Dialog.Title>
                      <Dialog.Description>Update your name and email below.</Dialog.Description>
                    </Dialog.Header>
                    <form class="flex flex-col gap-3.5 py-5">
                      <div class="flex flex-col gap-1.5">
                        <label class="text-sm font-medium text-text-neutral-primary">Name</label>
                        <Input placeholder="John Doe" />
                      </div>
                      <div class="flex flex-col gap-1.5">
                        <label class="text-sm font-medium text-text-neutral-primary">Email</label>
                        <Input type="email" placeholder="john@example.com" />
                      </div>
                    </form>
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
        </div>
      </div>
    </section>

    <!-- Accessibility -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Accessibility</h2>
      <div class="flex flex-col gap-2.5">
        {#each [
          'Focus trap: focus is locked inside the dialog when open',
          'Keyboard: Escape closes the dialog',
          'Click outside: clicking the overlay dismisses the dialog',
          'ARIA: role="dialog", aria-modal="true", aria-labelledby linked to title',
          'Screen reader: title and description are announced on open',
          'Focus restore: focus returns to the trigger element on close'
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

      <div class="flex flex-col gap-7">
        <div class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold">Dialog.Content</h3>
          <p class="text-sm text-text-neutral-secondary">The modal panel — only prop you typically customize.</p>
          <PropsTable props={dialogContentProps} />
        </div>

        <div class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold">Sub-components</h3>
          <div class="overflow-x-auto rounded-xl border border-border-neutral-l4">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-border-neutral-l4 bg-surface-neutral-l2">
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Component</th>
                  <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-neutral-l4">
                {#each subComponents as comp (comp.name)}
                  <tr>
                    <td class="px-5 py-3 font-mono text-xs text-text-brand-primary">{comp.name}</td>
                    <td class="px-5 py-3 text-xs text-text-neutral-secondary">{comp.description}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>

        <!-- bits-ui reference -->
        <div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 px-5 py-4">
          <p class="text-sm text-text-neutral-secondary">
            <strong class="text-text-neutral-primary">Built on bits-ui</strong> —
            Dialog uses <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">Dialog</code> from bits-ui for focus trapping, portal rendering, and ARIA attributes.
            For the full primitive API (animations, forceMount, etc.), see the
            <a href="https://bits-ui.com/docs/components/dialog" target="_blank" rel="noopener noreferrer" class="text-text-brand-primary underline underline-offset-2">bits-ui Dialog docs</a>.
          </p>
        </div>
      </div>
    </section>

  </div>
</DocsPage>
