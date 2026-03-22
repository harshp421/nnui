<script lang="ts">
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import {
    DocsPage,
    PageHeader,
    ComponentPreview,
    CodeBlock,
    PropsTable,
    ComponentSource,
  } from "$lib/components/docs";

  let disabled = $state(false);
  let placeholder = $state("Type your message here.");
  let value = $state("");

  function getTextareaCode() {
    const disabledAttr = disabled ? " disabled" : "";
    const placeholderAttr = placeholder ? ` placeholder="${placeholder}"` : "";

    return `<Textarea${placeholderAttr}${disabledAttr} />`;
  }

  const installationCode = `import Textarea from "$lib/components/ui/textarea/textarea.svelte";`;

  const textareaProps = [
    {
      name: "placeholder",
      type: "string",
      default: "-",
      description: "Placeholder text",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the textarea is disabled",
    },
    {
      name: "value",
      type: "string",
      default: "-",
      description: "Controlled value",
    },
  ];
</script>

<DocsPage>
  <PageHeader
    title="Textarea"
    description="Displays a form textarea or a component that looks like a textarea."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="textarea"
        path="$lib/components/ui/textarea/textarea.svelte"
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
        code={`<Textarea placeholder="Type your message here." />`}
      >
        {#snippet preview()}
          <div class="flex w-full items-center justify-center p-10">
            <div class="grid w-full gap-2 max-w-sm">
              <Textarea placeholder="Type your message here." />
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
          Configure disabled state and placeholder.
        </p>
      </div>

      <div class="w-full">
        <ComponentPreview code={getTextareaCode()}>
          {#snippet preview()}
            <div
              class="flex flex-col items-center justify-center gap-8 py-10 w-full"
            >
              <div class="grid w-full gap-2 max-w-sm">
                <Label for="message">Your message</Label>
                <Textarea {placeholder} {disabled} bind:value id="message" />
                <p class="text-sm text-muted-foreground">
                  Your message will be copied to the support team.
                </p>
              </div>
            </div>
          {/snippet}
        </ComponentPreview>

        <!-- Controls -->
        <div class="mt-8 grid gap-8 border-t pt-8 md:grid-cols-2">
          <div class="space-y-4">
            <h3 class="text-sm font-medium leading-none">States</h3>
            <div class="flex gap-4">
              <label
                class="flex items-center space-x-2 text-sm font-medium leading-none"
              >
                <Checkbox bind:checked={disabled} />
                <span>Disabled</span>
              </label>
            </div>
          </div>
          <div class="space-y-4">
            <h3 class="text-sm font-medium leading-none">Placeholder</h3>
            <div class="grid w-full max-w-sm items-center gap-1.5">
              <Textarea bind:value={placeholder} class="h-9 min-h-0" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Examples</h2>
        <p class="text-text-neutral-secondary">Common usage patterns.</p>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <!-- Example 1 -->
        <div
          class="group relative flex flex-col space-y-16 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">With Label</p>
          </div>

          <div class="flex min-h-[100px] flex-col justify-center gap-4 p-8">
            <div class="grid w-full gap-1.5">
              <Label for="message-2">Your Message</Label>
              <Textarea placeholder="Type your message here." id="message-2" />
              <p class="text-sm text-muted-foreground">
                This is a hint text to help user.
              </p>
            </div>
          </div>
          <CodeBlock
            code={`<div class="grid w-full gap-1.5">
  <label for="demo" for="message">Your Message</Label>
  <Textarea placeholder="Type your message here." id="message" />
  <p class="text-sm text-muted-foreground">This is a hint text.</p>
</div>`}
            language="svelte"
            class="text-xs"
          />
        </div>

        <!-- Example 2 -->
        <div
          class="group relative flex flex-col space-y-16 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">With Button</p>
          </div>

          <div class="flex min-h-[100px] flex-col justify-center gap-4 p-8">
            <div class="grid w-full gap-2">
              <Textarea placeholder="Type your message here." />
              <Button>Send message</Button>
            </div>
          </div>
          <CodeBlock
            code={`<div class="grid w-full gap-2">
  <Textarea placeholder="Type your message here." />
  <Button>Send message</Button>
</div>`}
            language="svelte"
            class="text-xs"
          />
        </div>
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="py-6 text-2xl font-bold tracking-tight border-b">Props</h2>
      <PropsTable props={textareaProps} />
    </section>
  </div>
</DocsPage>
