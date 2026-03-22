<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import { Label } from "$lib/components/ui/label";
  import {
    CodeBlock,
    ComponentPreview,
    ComponentSource,
    DocsPage,
    PageHeader,
    PropsTable,
  } from "$lib/components/docs";

  const orientations = [
    { value: "vertical", label: "Vertical" },
    { value: "horizontal", label: "Horizontal" },
  ];

  const options = [
    { value: "default", label: "Default" },
    { value: "comfortable", label: "Comfortable" },
    { value: "compact", label: "Compact" },
  ];

  let value = $state("default");
  let orientation = $state<"vertical" | "horizontal">("vertical");
  let size = $state<"sm" | "md" | "lg">("md");

  const sizes = [
    { value: "sm" as const, label: "Small" },
    { value: "md" as const, label: "Medium" },
    { value: "lg" as const, label: "Large" },
  ];

  function getRadioCode() {
    const items = options
      .map(
        (opt) =>
          `  <div class="flex items-center gap-2">\n    <RadioGroup.Item value="${opt.value}" id="${opt.value}" />\n    <Label for="${opt.value}">${opt.label}</Label>\n  </div>`,
      )
      .join("\n");
    const orientClass =
      orientation === "horizontal" ? ' class="flex gap-6"' : "";
    const sizeAttr = size !== "md" ? ` size="${size}"` : "";
    return `<RadioGroup.Root bind:value${sizeAttr}${orientClass}>\n${items}\n</RadioGroup.Root>`;
  }

  const installationCode = `import * as RadioGroup from "$lib/components/ui/radio-group";`;

  const radioGroupProps = [
    {
      name: "value",
      type: "string",
      default: "-",
      description: "Controlled value (bindable)",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "The size of the radio buttons",
    },
    {
      name: "class",
      type: "string",
      default: "-",
      description: "Custom CSS classes",
    },
  ];

  const radioGroupItemProps = [
    {
      name: "value",
      type: "string",
      default: "required",
      description: "Value for this radio option",
    },
    {
      name: "label",
      type: "string",
      default: "-",
      description: "Label text for the option",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables this option",
    },
  ];
</script>

<DocsPage>
  <PageHeader
    title="Radio Group"
    description="A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="radio-group"
        path="$lib/components/ui/radio-group/"
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
        code={`<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import { Label } from "$lib/components/ui/label";

  let value = $state("option1");
<\/script>

<RadioGroup.Root bind:value>
  <div class="flex items-center gap-2">
    <RadioGroup.Item value="option1" id="option1" />
    <Label for="option1">Option 1</Label>
  </div>
  <div class="flex items-center gap-2">
    <RadioGroup.Item value="option2" id="option2" />
    <Label for="option2">Option 2</Label>
  </div>
</RadioGroup.Root>`}
      >
        {#snippet preview()}
          <div class="flex items-center justify-center p-10">
            <RadioGroup.Root>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="option1" id="option1" />
                <Label for="option1">Option 1</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="option2" id="option2" />
                <Label for="option2">Option 2</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="option3" id="option3" />
                <Label for="option3">Option 3</Label>
              </div>
            </RadioGroup.Root>
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
          Select from a set of mutually exclusive options.
        </p>
      </div>

      <div class="w-full">
        <ComponentPreview code={getRadioCode()}>
          {#snippet preview()}
            <div class="flex flex-col items-center justify-center gap-8 py-10">
              <div
                class="relative z-10 flex min-h-[60px] items-center justify-center"
              >
                <RadioGroup.Root
                  bind:value
                  bind:size
                  class={orientation === "horizontal" ? "flex gap-6" : ""}
                >
                  {#each options as option}
                    <div class="flex items-center gap-2">
                      <RadioGroup.Item value={option.value} id={option.value} />
                      <Label for={option.value}>{option.label}</Label>
                    </div>
                  {/each}
                </RadioGroup.Root>
              </div>
            </div>
          {/snippet}
        </ComponentPreview>

        <!-- Controls -->
        <div class="mt-8 grid gap-8 border-t pt-8 md:grid-cols-2">
          <div class="space-y-4">
            <h3 class="text-sm font-medium leading-none">Orientation</h3>
            <div class="flex flex-wrap gap-2">
              {#each orientations as option}
                <Button
                  variant={orientation === option.value
                    ? "primary"
                    : "tertiary"}
                  size="sm"
                  onclick={() => (orientation = option.value as any)}
                >
                  {option.label}
                </Button>
              {/each}
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-sm font-medium leading-none">Size</h3>
            <div class="flex flex-wrap gap-2">
              {#each sizes as s}
                <Button
                  variant={size === s.value ? "primary" : "tertiary"}
                  size="sm"
                  onclick={() => (size = s.value as any)}
                >
                  {s.label}
                </Button>
              {/each}
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-sm font-medium leading-none">Current Value</h3>
            <div class="rounded-lg border bg-muted/50 p-3">
              <div class="font-mono text-sm">
                value: <span class="text-primary font-semibold">"{value}"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Variants Grid -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Sizes</h2>
        <p class="text-text-neutral-secondary">Different radio group sizes.</p>
      </div>

      <div class="grid gap-8 md:grid-cols-3">
        {#each sizes as s}
          <div
            class="group flex flex-col space-y-4 rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div>
              <p class="font-semibold text-foreground">
                {s.label}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <RadioGroup.Root size={s.value as any} value="1">
                <div class="flex items-center gap-2">
                  <RadioGroup.Item value="1" id="q1-{s.value}" />
                  <Label for="q1-{s.value}">1</Label>
                </div>
                <div class="flex items-center gap-2">
                  <RadioGroup.Item value="2" id="q2-{s.value}" />
                  <Label for="q2-{s.value}">2</Label>
                </div>
                <div class="flex items-center gap-2">
                  <RadioGroup.Item value="3" id="q3-{s.value}" />
                  <Label for="q3-{s.value}">3</Label>
                </div>
              </RadioGroup.Root>
            </div>
            <CodeBlock
              code={`<RadioGroup.Root size="${s.value}">\n  <RadioGroup.Item value="1" />\n  <RadioGroup.Item value="2" />\n  <RadioGroup.Item value="3" />\n</RadioGroup.Root>`}
              language="svelte"
              class="text-xs"
            />
          </div>
        {/each}
      </div>
    </section>

    <!-- Variants Grid -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Examples</h2>
        <p class="text-text-neutral-secondary">Common radio group patterns.</p>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <!-- Example 1 -->
        <div
          class="group relative flex flex-col space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center gap-3">
            <div class="h-2 w-2 rounded-full bg-primary/20"></div>
            <div>
              <p class="font-semibold capitalize text-foreground">
                Notification Preferences
              </p>
              <p class="text-sm text-muted-foreground">
                Choose how you want to receive updates
              </p>
            </div>
          </div>

          <div
            class="flex min-h-[100px] flex-wrap items-center justify-center gap-4 p-8"
          >
            <RadioGroup.Root value="email">
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="email" id="email" />
                <Label for="email">Email only</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="sms" id="sms" />
                <Label for="sms">SMS only</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="both" id="both" />
                <Label for="both">Both email and SMS</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="none" id="none" />
                <Label for="none">No notifications</Label>
              </div>
            </RadioGroup.Root>
          </div>
          <CodeBlock
            code={`<RadioGroup.Root value="email">
  <RadioGroup.Item value="email" label="Email only" />
  <RadioGroup.Item value="sms" label="SMS only" />
  <RadioGroup.Item value="both" label="Both email and SMS" />
  <RadioGroup.Item value="none" label="No notifications" />
</RadioGroup.Root>`}
            language="svelte"
            class="text-xs"
          />
        </div>

        <!-- Example 2 -->
        <div
          class="group relative flex flex-col space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center gap-3">
            <div class="h-2 w-2 rounded-full bg-primary/20"></div>
            <div>
              <p class="font-semibold capitalize text-foreground">
                Payment Method
              </p>
              <p class="text-sm text-muted-foreground">
                Select your preferred payment option
              </p>
            </div>
          </div>

          <div
            class="flex min-h-[100px] flex-wrap items-center justify-center gap-4 p-8"
          >
            <RadioGroup.Root value="card">
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="card" id="card" />
                <Label for="card">Credit/Debit Card</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="paypal" id="paypal" />
                <Label for="paypal">PayPal</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="bank" id="bank" />
                <Label for="bank">Bank Transfer</Label>
              </div>
            </RadioGroup.Root>
          </div>
          <CodeBlock
            code={`<RadioGroup.Root value="card">
  <RadioGroup.Item value="card" label="Credit/Debit Card" />
  <RadioGroup.Item value="paypal" label="PayPal" />
  <RadioGroup.Item value="bank" label="Bank Transfer" />
</RadioGroup.Root>`}
            language="svelte"
            class="text-xs"
          />
        </div>

        <!-- Example 3 -->
        <div
          class="group relative flex flex-col space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center gap-3">
            <div class="h-2 w-2 rounded-full bg-primary/20"></div>
            <div>
              <p class="font-semibold capitalize text-foreground">
                Theme Selection
              </p>
              <p class="text-sm text-muted-foreground">
                Horizontal layout example
              </p>
            </div>
          </div>

          <div
            class="flex min-h-[100px] flex-wrap items-center justify-center gap-4 p-8"
          >
            <RadioGroup.Root value="light" class="flex gap-6">
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="light" id="theme-light" />
                <Label for="theme-light">Light</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="dark" id="theme-dark" />
                <Label for="theme-dark">Dark</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="system" id="theme-system" />
                <Label for="theme-system">System</Label>
              </div>
            </RadioGroup.Root>
          </div>
          <CodeBlock
            code={`<RadioGroup.Root value="light" class="flex gap-6">
  <RadioGroup.Item value="light" label="Light" />
  <RadioGroup.Item value="dark" label="Dark" />
  <RadioGroup.Item value="system" label="System" />
</RadioGroup.Root>`}
            language="svelte"
            class="text-xs"
          />
        </div>
        <!-- Example 4 -->
        <div
          class="group relative flex flex-col space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center gap-3">
            <div class="h-2 w-2 rounded-full bg-primary/20"></div>
            <div>
              <p class="font-semibold capitalize text-foreground">
                Size Options
              </p>
              <p class="text-sm text-muted-foreground">
                Product size selection
              </p>
            </div>
          </div>

          <div
            class="flex min-h-[100px] flex-wrap items-center justify-center gap-4 p-8"
          >
            <RadioGroup.Root value="m" class="flex gap-4">
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="s" id="size-s" />
                <Label for="size-s">S</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="m" id="size-m" />
                <Label for="size-m">M</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="l" id="size-l" />
                <Label for="size-l">L</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroup.Item value="xl" id="size-xl" />
                <Label for="size-xl">XL</Label>
              </div>
            </RadioGroup.Root>
          </div>
          <CodeBlock
            code={`<RadioGroup.Root value="m" class="flex gap-4">
  <RadioGroup.Item value="s" label="S" />
  <RadioGroup.Item value="m" label="M" />
  <RadioGroup.Item value="l" label="L" />
  <RadioGroup.Item value="xl" label="XL" />
</RadioGroup.Root>`}
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
          <h3 class="text-lg font-bold">RadioGroup</h3>
          <PropsTable props={radioGroupProps} />
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-bold">RadioGroupItem</h3>
          <PropsTable props={radioGroupItemProps} />
        </div>
      </div>
    </section>
  </div>
</DocsPage>
