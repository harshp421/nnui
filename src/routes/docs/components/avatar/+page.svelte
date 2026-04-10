<script lang="ts">
  import Seo from "$lib/components/seo.svelte";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import {
    CodeBlock,
    ComponentPreview,
    ComponentSource,
    DocsPage,
    Icon,
    PageHeader,
    PropsTable,
  } from "$lib/components/docs";

  const sizes = [
    { value: "xxs" as const, label: "XXS" },
    { value: "xs" as const, label: "XS" },
    { value: "sm" as const, label: "SM" },
    { value: "md" as const, label: "MD" },
    { value: "lg" as const, label: "LG" },
    { value: "xl" as const, label: "XL" },
    { value: "xxl" as const, label: "XXL" },
  ];

  const shapes = [
    {
      value: "rounded" as const,
      label: "Rounded",
    },
    { value: "pill" as const, label: "Pill" },
    {
      value: "square" as const,
      label: "Square",
    },
  ];

  let size = $state<(typeof sizes)[number]["value"]>("md");
  let shape = $state<(typeof shapes)[number]["value"]>("pill");

  let fallbackOnly = $state(false);

  function getAvatarCode() {
    const body = fallbackOnly
      ? `\n  <Avatar.Fallback>CN</Avatar.Fallback>`
      : `\n  <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />\n  <Avatar.Fallback>CN</Avatar.Fallback>`;

    return `<Avatar.Root size="${size}" shape="${shape}">${body}\n</Avatar.Root>`;
  }

  const installationCode = `npx nnuikit add avatar

import * as Avatar from "$lib/components/ui/avatar/index.js";`;

  const avatarRootProps = [
    // {
    //   name: "class",
    //   type: "string",
    //   default: "-",
    //   description: "Utility classes (size, rounding)",
    // },
    {
      name: "size",
      type: `"sm" | "md" | "lg" | "xl"`,
      default: "-",
      description: "Sets component dimensions",
    },
    {
      name: "shape",
      type: `"rounded" | "pill" | "square"`,
      default: "-",
      description: "Controls corner rounding",
    },
  ];

  const avatarImageProps = [
    {
      name: "src",
      type: "string",
      default: "-",
      description: "Image source URL",
    },
    {
      name: "alt",
      type: "string",
      default: "-",
      description: "Accessible alternate text",
    },
  ];

  const avatarFallbackProps = [
    {
      name: "delayMs",
      type: "number",
      default: "-",
      description: "Delay in ms before showing fallback",
    },
  ];
</script>

<Seo
  title="Avatar"
  description="An image element with a fallback for representing the user. Supports multiple sizes, shapes, and graceful fallback to initials."
/>

<DocsPage>
  <PageHeader
    title="Avatar"
    description="An image element with a fallback for representing the user."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="avatar"
        path="$lib/components/ui/avatar/avatar.svelte"
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
      <p class="text-text-neutral-secondary">
        <strong class="text-foreground">NOTE</strong>: For assets to be public,
        they are required to be stored in the
        <strong class="text-foreground">static or public</strong> directory.
      </p>
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
      <ComponentPreview
        code={`<Avatar.Root size="xl">
  <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
  <Avatar.Fallback>CN</Avatar.Fallback>
</Avatar.Root>`}
      >
        {#snippet preview()}
          <div class="flex items-center justify-center p-10">
            <Avatar.Root size="xl">
              <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
              <Avatar.Fallback>CN</Avatar.Fallback>
            </Avatar.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-20">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Interactive Playground
        </h2>
        <p class="text-text-neutral-secondary">
          Configure size, shape, and fallback behavior.
        </p>
      </div>

      <div class="rounded-xl shadow-xs text-card-foreground">
        <div class="p-6 pt-0 mt-12">
          <ComponentPreview code={getAvatarCode()}>
            {#snippet preview()}
              <div
                class="flex flex-col items-center justify-center gap-8 py-10"
              >
                <Avatar.Root {size} {shape}>
                  <Avatar.Image
                    src={fallbackOnly ? "" : "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <Avatar.Fallback>CN</Avatar.Fallback>
                </Avatar.Root>
              </div>
            {/snippet}
          </ComponentPreview>

          <!-- Controls -->
          <div class="mt-16 grid gap-8 border-t pt-16 md:grid-cols-2">
            <div class="space-y-4">
              <h3
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Size
              </h3>
              <div class="flex flex-wrap gap-2">
                {#each sizes as s}
                  <Button
                    variant={size === s.value ? "primary" : "tertiary"}
                    size="sm"
                    onclick={() => (size = s.value)}
                  >
                    {s.label}
                  </Button>
                {/each}
              </div>
            </div>

            <div class="space-y-6">
              <div class="space-y-4">
                <h3
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Shape
                </h3>
                <div class="flex flex-wrap gap-2">
                  {#each shapes as s}
                    <Button
                      variant={shape === s.value ? "primary" : "tertiary"}
                      size="sm"
                      onclick={() => (shape = s.value)}
                    >
                      {s.label}
                    </Button>
                  {/each}
                </div>
              </div>

              <div class="space-y-4">
                <h3
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Options
                </h3>
                <div class="flex gap-4">
                  <!-- <label for="demo"
                                    class="flex items-center space-x-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    <Checkbox bind:checked={showRing} />
                                    <span>Ring</span>
                                </label> -->
                  <label
                    for="demo"
                    class="flex items-center space-x-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Checkbox bind:checked={fallbackOnly} />
                    <span>Fallback Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sizes Grid -->
    <section class="space-y-20">
      <div>
        <h2 class="py-6 text-2xl font-bold tracking-tight">Sizes</h2>
        <p class="text-text-neutral-secondary">
          Different avatar sizes using utility classes.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-3">
        {#each sizes as s}
          <div
            class="group flex flex-col space-y-16 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div class="p-4">
              <p class="font-semibold text-foreground">
                {s.label}
              </p>
            </div>

            <div
              class="flex min-h-[100px] items-center justify-center rounded-lg border border-dashed bg-surface-neutral-l2 p-8"
            >
              <Avatar.Root size={s.value}>
                <Avatar.Image
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <Avatar.Fallback>CN</Avatar.Fallback>
              </Avatar.Root>
            </div>
            <CodeBlock
              code={`<Avatar.Root size="${s.value}">...</Avatar.Root>`}
              language="svelte"
              class="text-xs"
            />
          </div>
        {/each}
      </div>
    </section>

    <!-- Accessibility -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Accessibility</h2>
      <div class="flex flex-col gap-2.5">
        {#each [
          'Images: alt text required on Avatar.Image',
          'Fallback: initials shown when image fails to load',
          'Keyboard: focusable when used as interactive element'
        ] as item (item)}
          <div class="flex items-start gap-2.5 text-sm text-text-neutral-secondary">
            <Icon name="check" class="size-16 shrink-0 mt-0.5 text-text-brand-primary" />
            {item}
          </div>
        {/each}
      </div>
    </section>

    <!-- API Reference -->
    <section class="space-y-6">
      <h2 class="py-6 text-2xl font-bold tracking-tight border-b border-border-neutral-l4">API Reference</h2>
      <h3 class="font-semibold">Avatar.Root</h3>
      <PropsTable props={avatarRootProps} />
      <h3 class="mt-4 font-semibold">Avatar.Image</h3>
      <PropsTable props={avatarImageProps} />
      <h3 class="mt-4 font-semibold">Avatar.Fallback</h3>
      <PropsTable props={avatarFallbackProps} />
    </section>
  </div>
</DocsPage>
