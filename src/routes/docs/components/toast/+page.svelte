<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { toast } from "$lib/components/ui/toast";
  import type { ToastMode } from "$lib/components/ui/toast";
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

  const variants = [
    { value: "default" as const, label: "Default" },
    { value: "success" as const, label: "Success" },
    { value: "destructive" as const, label: "Destructive" },
    { value: "warning" as const, label: "Warning" },
    { value: "info" as const, label: "Info" },
    { value: "brand" as const, label: "Brand" },
  ];

  const modes: { value: ToastMode; label: string }[] = [
    { value: "inline", label: "Inline" },
    { value: "expanded", label: "Expanded" },
  ];

  let selectedVariant = $state<(typeof variants)[number]["value"]>("success");
  let selectedMode = $state<ToastMode>("inline");
  let counter = 0;

  function showToast() {
    counter++;
    toast.add({
      title: `${selectedVariant.charAt(0).toUpperCase() + selectedVariant.slice(1)} Toast`,
      description: `This is a ${selectedVariant} toast notification #${counter}`,
      variant: selectedVariant,
      mode: selectedMode,
    });
  }

  function getToastCode() {
    const variantAttr =
      selectedVariant !== "default" ? ` variant="${selectedVariant}"` : "";
    return `toast.add({
  title: "Notification Title",
  description: "Your notification message here",${variantAttr ? `\n  ${variantAttr.trim()},` : ""}
});`;
  }

  const installationCode = `import { Toaster, toast } from "$lib/components/ui/toast";`;

  const quickStartCode = `<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Toaster, toast } from "$lib/components/ui/toast";

  function showNotification() {
    toast.success("Changes saved successfully!");
  }
<\/script>

<!-- Add Toaster to your root +layout.svelte (once) -->
<Toaster position="top-right" mode="inline" />

<!-- Trigger toast from anywhere -->
<Button onclick={showNotification}>Show Toast</Button>
`;

  const toasterProps = [
    {
      name: "position",
      type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
      default: "'top-right'",
      description: "Position of the toast container on screen.",
    },
    {
      name: "mode",
      type: "'inline' | 'expanded'",
      default: "'inline'",
      description: "Default mode for all toasts. 'inline' is compact single-row, 'expanded' is multi-row with left accent border. Individual toasts can override.",
    },
    {
      name: "maxToasts",
      type: "number",
      default: "4",
      description: "Maximum number of visible toasts at once.",
    },
    {
      name: "class",
      type: "string",
      default: "-",
      description: "Additional CSS classes for the container.",
    },
  ];

  const toastDataProps = [
    {
      name: "title",
      type: "string",
      default: "-",
      description: "Optional title for the toast.",
    },
    {
      name: "description",
      type: "string",
      default: "-",
      description: "Main message content.",
    },
    {
      name: "variant",
      type: "'default' | 'brand' | 'success' | 'destructive' | 'warning' | 'info'",
      default: "'default'",
      description: "Visual style variant.",
    },
    {
      name: "mode",
      type: "'inline' | 'expanded'",
      default: "'inline'",
      description: "Toast layout mode. 'inline' is compact single-row. 'expanded' is multi-row with left accent border and action buttons below.",
    },
    {
      name: "duration",
      type: "number",
      default: "5000",
      description: "Auto-dismiss duration in ms. Set to 0 for persistent.",
    },
    {
      name: "dismissible",
      type: "boolean",
      default: "true",
      description: "Whether the toast can be manually dismissed.",
    },
    {
      name: "action",
      type: "{ label: string; onClick: () => void }",
      default: "-",
      description: "Optional action button configuration.",
    },
    {
      name: "onDismiss",
      type: "() => void",
      default: "-",
      description: "Callback when toast is dismissed.",
    },
  ];

  const toastMethods = [
    {
      name: "toast.add(data)",
      type: "(data: ToastData) => string",
      default: "-",
      description: "Add a new toast and return its ID.",
    },
    {
      name: "toast.success(message, options?)",
      type: "(message: string, options?: Partial<ToastData>) => string",
      default: "-",
      description: "Show a success toast.",
    },
    {
      name: "toast.error(message, options?)",
      type: "(message: string, options?: Partial<ToastData>) => string",
      default: "-",
      description: "Show an error toast.",
    },
    {
      name: "toast.warning(message, options?)",
      type: "(message: string, options?: Partial<ToastData>) => string",
      default: "-",
      description: "Show a warning toast.",
    },
    {
      name: "toast.info(message, options?)",
      type: "(message: string, options?: Partial<ToastData>) => string",
      default: "-",
      description: "Show an info toast.",
    },
    {
      name: "toast.custom(options)",
      type: "(options: Omit<ToastData, 'id'>) => string",
      default: "-",
      description: "Create a fully customized toast with all properties.",
    },
    {
      name: "toast.dismiss(id)",
      type: "(id: string) => void",
      default: "-",
      description: "Dismiss a specific toast by ID.",
    },
    {
      name: "toast.dismissAll()",
      type: "() => void",
      default: "-",
      description: "Dismiss all active toasts.",
    },
  ];

  const multipleToast = `
{
    toast.success("First notification");
    setTimeout(() => toast.info("Second notification"), 200);
    setTimeout(() => toast.warning("Third notification"), 400);
}`;
</script>

<Seo
  title="Toast"
  description="A succinct message that is displayed temporarily to provide feedback about an action or event."
/>

<DocsPage>
  <PageHeader
    title="Toast"
    description="A succinct message that is displayed temporarily to provide feedback about an action or event."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="toast"
        path="$lib/components/ui/toast/"
      />
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
          <div class="space-y-4">
            <p class="text-sm text-muted-foreground">
              Click the button to trigger a toast notification.
            </p>
            <Button
              onclick={() =>
                toast.success("Your changes have been saved successfully!")}
            >
              Show Toast
            </Button>
          </div>
        </div>
      {/snippet}
    </ComponentPreview>
  </section>

    <section class="space-y-20">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Interactive Playground</h2>
        <p class="text-text-neutral-secondary">
          Customize variant and mode to see how toasts appear. Position is set on the
          <code class="relative rounded bg-surface-neutral-l2 px-[0.3rem] py-[0.2rem] font-mono text-sm">Toaster</code>
          in the root layout.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 items-start">
        <div class="space-y-6">
          <div
            class="border rounded-xl bg-card shadow-sm p-12 min-h-[300px] flex items-center justify-center"
          >
            <div class="text-center space-y-4">
              <p class="text-sm text-muted-foreground">
                Click the button to trigger a {selectedMode} toast.
              </p>
              <Button onclick={showToast} variant="primary" size="lg">
                Show {selectedVariant.charAt(0).toUpperCase() +
                  selectedVariant.slice(1)} Toast
              </Button>
            </div>
          </div>
          <CodeBlock
            code={getToastCode()}
            language="typescript"
            class="text-xs"
          />
        </div>

        <div class="p-6 space-y-8">
          <div class="space-y-4">
            <label for="demo" class="text-sm font-bold">Variant</label>
            <div class="grid grid-cols-3 gap-2">
              {#each variants as opt}
                <Button
                  variant={selectedVariant === opt.value ? "primary" : "tertiary"}
                  size="sm"
                  onclick={() => (selectedVariant = opt.value)}
                >
                  {opt.label}
                </Button>
              {/each}
            </div>
          </div>

          <div class="space-y-4">
            <label for="demo" class="text-sm font-bold">Mode</label>
            <div class="grid grid-cols-2 gap-2">
              {#each modes as opt}
                <Button
                  variant={selectedMode === opt.value ? "primary" : "tertiary"}
                  size="sm"
                  onclick={() => (selectedMode = opt.value)}
                >
                  {opt.label}
                </Button>
              {/each}
            </div>
          </div>

        </div>
      </div>
    </section>

    
    <section class="space-y-20">
  <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Visual Variants</h2>
        <p class="text-text-neutral-secondary">
          Explore different visual styles for toasts.
        </p>
      </div>
        <div
          class="flex flex-col space-y-16 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Success</p>
          </div>
          <div class="p-8">
            <Button
              onclick={() => toast.success("Operation completed successfully!")}
              variant="primary"
            >
              Show Success
            </Button>
          </div>
        </div>

        <div
          class="flex flex-col space-y-16 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Error</p>
          </div>
          <div class="p-8">
            <Button
              onclick={() =>
                toast.error("Something went wrong. Please try again.")}
              variant="destructive"
            >
              Show Error
            </Button>
          </div>
        </div>

        <div
          class="flex flex-col space-y-16 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Warning</p>
          </div>
          <div class="p-8">
            <Button
              onclick={() => toast.warning("Your session will expire soon.")}
              variant="warning"
            >
              Show Warning
            </Button>
          </div>
        </div>

        <div
          class="flex flex-col space-y-16 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Info</p>
          </div>
          <div class="p-8">
            <Button
              onclick={() => toast.info("New features are now available.")}
              variant="info"
            >
              Show Info
            </Button>
          </div>
        </div>

        <div
          class="flex flex-col space-y-16 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Brand (Custom)</p>
          </div>
          <div class="p-8">
            <Button
              variant="primary"
              onclick={() =>
                toast.custom({
                  title: "Welcome!",
                  description: "Explore our new branded experience.",
                  variant: "brand",
                  duration: 5000,
                })}
            >
              Show Brand Toast
            </Button>
          </div>
        </div>
    </section>
     
  

    <!-- ── Inline vs Expanded ─────────────────────────────────────────── -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Inline vs Expanded</h2>
        <p class="text-text-neutral-secondary">
          Two layout modes matching the Figma design system. <strong>Inline</strong> is a compact
          single-row notification. <strong>Expanded</strong> is a multi-row card with a left color accent border
          and action buttons below the description.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col space-y-16 rounded-xl border bg-card p-6 shadow-sm">
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Inline Mode</p>
          </div>
          <div class="flex flex-wrap gap-8 p-8">
            {#each variants as v}
              <Button
                variant="tertiary"
                size="sm"
                onclick={() => toast.add({ title: `${v.label}`, description: "Alert content", variant: v.value, mode: "inline" })}
              >
                {v.label}
              </Button>
            {/each}
          </div>
          <CodeBlock
            code={`toast.add({
  title: "Alert title",
  description: "Alert content",
  variant: "success",
  mode: "inline",
});`}
            language="typescript"
            class="text-xs"
          />
        </div>

        <div class="flex flex-col space-y-16 rounded-xl border bg-card p-6 shadow-sm">
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Expanded Mode</p>
          </div>
          <div class="flex flex-wrap gap-8 p-8">
            {#each variants as v}
              <Button
                variant="tertiary"
                size="sm"
                onclick={() => toast.add({
                  title: `${v.label}`,
                  description: "Alert content",
                  variant: v.value,
                  mode: "expanded",
                  action: { label: "Button", onClick: () => {} },
                })}
              >
                {v.label}
              </Button>
            {/each}
          </div>
          <CodeBlock
            code={`toast.add({
  title: "Alert title",
  description: "Alert content",
  variant: "success",
  mode: "expanded",
  action: { label: "Button", onClick: () => {} },
});`}
            language="typescript"
            class="text-xs"
          />
        </div>
      </div>
    </section>

    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Custom Toast</h2>
        <p class="text-text-neutral-secondary">
          Use the <code class="px-1.5 py-0.5 rounded bg-muted">toast.custom()</code>
          method for complete control over all toast properties.
        </p>
      </div>

      <div class="w-full">
        <ComponentPreview
          code={`toast.custom({
  title: "Custom Notification",
  description: "Fully customizable toast with all options",
  variant: "brand",
  duration: 1000,
  dismissible: true,
  action: {
    label: "View Details",
    onClick: () => console.log("Action clicked")
  },
  onDismiss: () => console.log("Toast dismissed")
});`}
        >
          {#snippet preview()}
            <div
              class="w-full max-w-2xl mx-auto p-6 border rounded-xl bg-card shadow-sm"
            >
              <div class="space-y-4">
                <div>
                  <h3 class="text-base font-semibold mb-2">
                    Full Customization Example
                  </h3>
                  <p class="text-sm text-muted-foreground mb-4">
                    The custom method gives you complete control over every
                    aspect of the toast notification.
                  </p>
                </div>

                <div class="grid gap-3">
                  <Button
                    variant="secondary"
                    onclick={() =>
                      toast.custom({
                        title: "Custom Notification",
                        description: "Fully customizable toast with all options",
                        variant: "brand",
                        duration: 1000,
                        dismissible: true,
                        action: {
                          label: "View Details",
                          onClick: () => console.log("Action clicked"),
                        },
                        onDismiss: () => console.log("Toast dismissed"),
                      })}
                  >
                    Show Custom Toast with Action
                  </Button>

                  <Button
                    onclick={() =>
                      toast.custom({
                        title: "Persistent Custom Toast",
                        description: "This custom toast won't auto-dismiss",
                        variant: "brand",
                        duration: 0,
                        dismissible: true,
                      })}
                    variant="tertiary"
                  >
                    Show Persistent Custom Toast
                  </Button>
                </div>
              </div>
            </div>
          {/snippet}
        </ComponentPreview>
      </div>
    </section>

    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Multiple Toast</h2>
        <p class="text-text-neutral-secondary">
          The toast system handles multiple notifications gracefully with
          stacking and animations.
        </p>
      </div>

      <div class="w-full">
        <ComponentPreview code={multipleToast}>
          {#snippet preview()}
            <div
              class="w-full max-w-2xl mx-auto p-6 border rounded-xl bg-card shadow-sm"
            >
              <div class="space-y-4">
                <div>
                  <h3 class="text-base font-semibold mb-2">Stacking Behavior</h3>
                  <p class="text-sm text-muted-foreground mb-4">
                    Click to trigger a sequence of notifications to see how they
                    stack.
                  </p>
                </div>

                <div class="grid gap-3">
                  <Button
                    variant="secondary"
                    onclick={() => {
                      toast.success("First notification");
                      setTimeout(() => toast.info("Second notification"), 200);
                      setTimeout(
                        () => toast.warning("Third notification"),
                        400
                      );
                    }}
                  >
                    Show Multiple Toasts
                  </Button>
                </div>
              </div>
            </div>
          {/snippet}
        </ComponentPreview>
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Accessibility</h2>
      <div class="flex flex-col gap-2.5">
        {#each [
          'Screen reader: role="status" and aria-live announce toasts',
          'Auto-dismiss: configurable duration, pause on hover',
          'Keyboard: Escape or click dismiss button to close',
          'Position: fixed positioning doesn\'t interfere with page flow'
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
        <div>
          <h3 class="text-lg font-bold mb-4 px-4">Toaster Component</h3>
          <PropsTable props={toasterProps} />
        </div>
        <div>
          <h3 class="text-lg font-bold mb-4 px-4">Toast Data</h3>
          <PropsTable props={toastDataProps} />
        </div>
        <div>
          <h3 class="text-lg font-bold mb-4 px-4">Toast Methods</h3>
          <PropsTable props={toastMethods} />
        </div>
      </div>

      <div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 px-5 py-4">
        <p class="text-sm text-text-neutral-secondary">
          <strong class="text-text-neutral-primary">Built on bits-ui</strong> —
          Toast uses primitives from bits-ui for portal rendering and ARIA attributes.
          For the full primitive API, see the
          <a href="https://bits-ui.com/docs/components/toast" target="_blank" rel="noopener noreferrer" class="text-text-brand-primary underline underline-offset-2">bits-ui Toast docs</a>.
        </p>
      </div>
    </section>
  </div>
</DocsPage>
