<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import {
    CodeBlock,
    ComponentPreview,
    ComponentSource,
    DocsPage,
    PageHeader,
    PropsTable,
  } from "$lib/components/docs";

  const inputTypes = [
    { value: "text" as const, label: "Text" },
    { value: "email" as const, label: "Email" },
    { value: "password" as const, label: "Password" },
    { value: "number" as const, label: "Number" },
    { value: "search" as const, label: "Search" },
    { value: "tel" as const, label: "Tel" },
    { value: "url" as const, label: "URL" },
  ];

  const addonAlignments = [
    { value: "inline-start" as const, label: "Inline Start" },
    { value: "inline-end" as const, label: "Inline End" },
    { value: "block-start" as const, label: "Block Start" },
    { value: "block-end" as const, label: "Block End" },
  ];

  // Input playground
  let inputValue = $state("");
  let inputType = $state<(typeof inputTypes)[number]["value"]>("text");
  let inputPlaceholder = $state("Enter text...");
  let inputDisabled = $state(false);
  let inputInvalid = $state(false);
  let inputWarning = $state(false);

  // InputGroup playground
  let groupValue = $state("");
  let showAddon = $state(true);
  let showButton = $state(true);
  let addonAlign =
    $state<(typeof addonAlignments)[number]["value"]>("inline-start");

  function getInputCode() {
    const typeAttr = inputType !== "text" ? ` type="${inputType}"` : "";
    const placeholder = inputPlaceholder
      ? ` placeholder="${inputPlaceholder}"`
      : "";
    const disabled = inputDisabled ? " disabled" : "";
    const invalid = inputInvalid ? ' aria-invalid="true"' : "";
    const warning = inputWarning ? ' aria-warning="true"' : "";
    return `<Input${typeAttr}${placeholder}${disabled}${invalid}${warning} />`;
  }

  function getInputGroupCode() {
    const addon = showAddon
      ? `\n  <InputGroup.Addon align="${addonAlign}">\n    <InputGroup.Text>$</InputGroup.Text>\n  </InputGroup.Addon>`
      : "";
    const button = showButton
      ? `\n  <InputGroup.Addon align="inline-end">\n    <InputGroup.Button size="xs">Search</InputGroup.Button>\n  </InputGroup.Addon>`
      : "";
    return `<InputGroup.Root>\n  <InputGroup.Input placeholder="Username" />${addon}${button}\n</InputGroup.Root>`;
  }

  const installationCode = `import Input from "$lib/components/ui/input/input.svelte";
import * as InputGroup from "$lib/components/ui/input-group";`;

  const inputProps = [
    {
      name: "type",
      type: "string",
      default: '"text"',
      description: "HTML input type",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables input",
    },
    {
      name: "aria-invalid",
      type: "boolean",
      default: "false",
      description: "Marks as invalid",
    },
  ];

  const inputGroupAddonProps = [
    {
      name: "align",
      type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
      default: '"inline-start"',
      description: "Addon position",
    },
  ];
  const inputGroupButtonProps = [
    {
      name: "size",
      type: '"xs" | "sm" | "icon-xs" | "icon-sm"',
      default: '"xs"',
      description: "Button size within the input group",
    },
  ];
</script>

<DocsPage>
  <PageHeader
    title="Input"
    description="Displays a form input field or a component to look like an input field."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="input"
        path="$lib/components/ui/input/input.svelte"
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
        code={`<Input type="email" placeholder="example@gmail.com" />`}
      >
        {#snippet preview()}
          <div
            class="flex items-center justify-center p-10 max-w-sm mx-auto w-full"
          >
            <Input type="email" placeholder="example@gmail.com" />
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-20">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Input Playground</h2>
        <p class="text-text-neutral-secondary">
          Try types, disabled, and invalid states.
        </p>
      </div>

      <div class="w-full">
        <ComponentPreview code={getInputCode()}>
          {#snippet preview()}
            <div
              class="flex flex-col items-center justify-center gap-8 py-10 max-w-sm mx-auto w-full"
            >
              <Input
                type={inputType}
                bind:value={inputValue}
                placeholder={inputPlaceholder}
                disabled={inputDisabled}
                aria-invalid={inputInvalid}
                aria-warning={inputWarning}
              />
            </div>
          {/snippet}
        </ComponentPreview>

        <!-- Controls -->
        <div class="mt-8 grid gap-8 border-t pt-8 md:grid-cols-2">
          <div class="space-y-4">
            <h3 class="text-sm font-medium leading-none">Type</h3>
            <div class="flex flex-wrap gap-2">
              {#each inputTypes as option}
                <Button
                  variant={inputType === option.value ? "primary" : "orphan"}
                  size="sm"
                  onclick={() => (inputType = option.value)}
                >
                  {option.label}
                </Button>
              {/each}
            </div>
          </div>

          <div class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-sm font-medium leading-none">States</h3>
              <div class="flex gap-4">
                <label
                  class="flex items-center space-x-2 text-sm font-medium leading-none"
                >
                  <Checkbox bind:checked={inputDisabled} />
                  <span>Disabled</span>
                </label>
                <label
                  class="flex items-center space-x-2 text-sm font-medium leading-none"
                >
                  <Checkbox bind:checked={inputInvalid} />
                  <span>Invalid</span>
                </label>
                <label
                  class="flex items-center space-x-2 text-sm font-medium leading-none"
                >
                  <Checkbox bind:checked={inputWarning} />
                  <span>Warning</span>
                </label>
              </div>
            </div>
            <div class="space-y-4">
              <h3 class="text-sm font-medium leading-none">Placeholder</h3>
              <Input class="h-9" bind:value={inputPlaceholder} maxlength={40} />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-20">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Input Group</h2>
        <p class="text-text-neutral-secondary">
          Combine inputs with addons, buttons, and text.
        </p>
      </div>

      <div class="w-full">
        <ComponentPreview code={getInputGroupCode()}>
          {#snippet preview()}
            <div
              class="flex flex-col items-center justify-center gap-8 py-10 max-w-md mx-auto w-full"
            >
              <InputGroup.Root>
                <InputGroup.Input
                  bind:value={groupValue}
                  placeholder="Username"
                  aria-invalid={inputInvalid}
                  aria-warning={inputWarning}
                />
                {#if showAddon}
                  <InputGroup.Addon align={addonAlign}>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Addon>
                {/if}
                {#if showButton}
                  <InputGroup.Addon align="inline-end">
                    <InputGroup.Button>Search</InputGroup.Button>
                  </InputGroup.Addon>
                {/if}
              </InputGroup.Root>
            </div>
          {/snippet}
        </ComponentPreview>

        <!-- Controls -->
        <div class="mt-8 grid gap-8 border-t pt-8 md:grid-cols-2">
          <div class="space-y-4">
            <h3 class="text-sm font-medium leading-none">Addon Alignment</h3>
            <div class="flex flex-wrap gap-2">
              {#each addonAlignments as option}
                <Button
                  variant={addonAlign === option.value ? "primary" : "orphan"}
                  size="sm"
                  onclick={() => (addonAlign = option.value)}
                >
                  {option.label}
                </Button>
              {/each}
            </div>
          </div>
          <div class="space-y-4">
            <h3 class="text-sm font-medium leading-none">Addons</h3>
            <div class="flex gap-4">
              <label
                class="flex items-center space-x-2 text-sm font-medium leading-none"
              >
                <Checkbox bind:checked={showAddon} />
                <span>Text Addon</span>
              </label>
              <label
                class="flex items-center space-x-2 text-sm font-medium leading-none"
              >
                <Checkbox bind:checked={showButton} />
                <span>Button</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Variants Grid -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Compositions</h2>
        <p class="text-text-neutral-secondary">
          Examples combining inputs with addons in various alignments.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <!-- Username -->
        <div
          class="group relative flex flex-col space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center gap-3">
            <div class="h-2 w-2 rounded-full bg-primary/20"></div>
            <p class="font-semibold capitalize text-foreground">
              Username (inline-start)
            </p>
          </div>

          <div
            class="flex min-h-[100px] flex-wrap items-center justify-center gap-4 p-8"
          >
            <InputGroup.Root>
              <InputGroup.Addon align="inline-start">
                <InputGroup.Text>@</InputGroup.Text>
              </InputGroup.Addon>
              <InputGroup.Input placeholder="username" />
            </InputGroup.Root>
          </div>
          <CodeBlock
            code={`<InputGroup.Root>
  <InputGroup.Addon align="inline-start">
    <InputGroup.Text>@</InputGroup.Text>
  </InputGroup.Addon>
  <InputGroup.Input placeholder="username" />
</InputGroup.Root>`}
            language="svelte"
            class="text-xs"
          />
        </div>

        <!-- Domain -->
        <div
          class="group relative flex flex-col space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center gap-3">
            <div class="h-2 w-2 rounded-full bg-primary/20"></div>
            <p class="font-semibold capitalize text-foreground">
              Domain (inline-end)
            </p>
          </div>

          <div
            class="flex min-h-[100px] flex-wrap items-center justify-center gap-4 p-8"
          >
            <InputGroup.Root>
              <InputGroup.Input placeholder="yoursite" />
              <InputGroup.Addon align="inline-end">
                <InputGroup.Text>.com</InputGroup.Text>
              </InputGroup.Addon>
            </InputGroup.Root>
          </div>
          <CodeBlock
            code={`<InputGroup.Root>
  <InputGroup.Input placeholder="yoursite" />
  <InputGroup.Addon align="inline-end">
    <InputGroup.Text>.com</InputGroup.Text>
  </InputGroup.Addon>
</InputGroup.Root>`}
            language="svelte"
            class="text-xs"
          />
        </div>

        <!-- Search -->
        <div
          class="group relative flex flex-col space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center gap-3">
            <div class="h-2 w-2 rounded-full bg-primary/20"></div>
            <p class="font-semibold capitalize text-foreground">
              Search with button
            </p>
          </div>

          <div
            class="flex min-h-[100px] flex-wrap items-center justify-center gap-4 p-8"
          >
            <InputGroup.Root>
              <InputGroup.Input placeholder="Search..." />
              <InputGroup.Addon align="inline-end">
                <InputGroup.Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><circle cx="11" cy="11" r="8" /><path
                      d="m21 21-4.35-4.35"
                    /></svg
                  >
                </InputGroup.Button>
              </InputGroup.Addon>
            </InputGroup.Root>
          </div>
          <CodeBlock
            code={`<InputGroup.Root>
  <InputGroup.Input placeholder="Search..." />
  <InputGroup.Addon align="inline-end">
    <InputGroup.Button size="xs">
      <svg>...</svg>
    </InputGroup.Button>
  </InputGroup.Addon>
</InputGroup.Root>`}
            language="svelte"
            class="text-xs"
          />
        </div>
        <!-- Block Start -->
        <div
          class="group relative flex flex-col space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center gap-3">
            <div class="h-2 w-2 rounded-full bg-primary/20"></div>
            <p class="font-semibold capitalize text-foreground">
              Block start label
            </p>
          </div>

          <div
            class="flex min-h-[100px] flex-wrap items-center justify-center gap-4 p-8"
          >
            <InputGroup.Root>
              <InputGroup.Addon align="block-start">
                <InputGroup.Text>Email address</InputGroup.Text>
              </InputGroup.Addon>
              <InputGroup.Input type="email" placeholder="you@example.com" />
            </InputGroup.Root>
          </div>
          <CodeBlock
            code={`<InputGroup.Root>
  <InputGroup.Addon align="block-start">
    <InputGroup.Text>Email address</InputGroup.Text>
  </InputGroup.Addon>
  <InputGroup.Input type="email" placeholder="you@example.com" />
</InputGroup.Root>`}
            language="svelte"
            class="text-xs"
          />
        </div>
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="py-6 text-2xl font-bold tracking-tight border-b">Props</h2>
      <div class="space-y-20">
        <div class="space-y-4">
          <h3 class="text-lg font-bold">Input</h3>
          <PropsTable props={inputProps} />
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-bold">InputGroup.Addon</h3>
          <PropsTable props={inputGroupAddonProps} />
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-bold">InputGroup.Button</h3>
          <PropsTable props={inputGroupButtonProps} />
        </div>
      </div>
    </section>
  </div>
</DocsPage>
