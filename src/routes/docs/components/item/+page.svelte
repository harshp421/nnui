<script lang="ts">
  import Seo from "$lib/components/seo.svelte";
  import * as Item from "$lib/components/ui/item";
  import type { ItemVariant } from "$lib/components/ui/item/item.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import IconPdf from "$lib/icons/icon-pdf.svelte";
  import IconPhoto from "$lib/icons/icon-photo.svelte";
  import IconCheck from "$lib/icons/icon-check.svelte";
  import IconCross from "$lib/icons/icon-cross.svelte";
  import {
    DocsPage,
    PageHeader,
    ComponentPreview,
    CodeBlock,
    ComponentSource,
    PropsTable,
  } from "$lib/components/docs";

  // Playground state
  let playgroundVariant = $state<NonNullable<ItemVariant>>("default");
  let showMedia = $state(true);
  let showActions = $state(true);
  let showDescription = $state(true);

  const variants: { value: NonNullable<ItemVariant>; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "success", label: "Success" },
    { value: "error", label: "Error" },
  ];

  function getPlaygroundCode() {
    const variantAttr = playgroundVariant !== "default" ? ` variant="${playgroundVariant}"` : "";
    let code = `<Item.Root${variantAttr}>`;
    if (showMedia) code += `\n  <Item.Media>\n    <IconPdf />\n  </Item.Media>`;
    code += `\n  <Item.Content>\n    <Item.Title>Document.pdf</Item.Title>`;
    if (showDescription) code += `\n    <Item.Description>245 KB</Item.Description>`;
    code += `\n  </Item.Content>`;
    if (showActions) code += `\n  <Item.Actions>\n    <Button variant="orphan" size="icon-sm">✕</Button>\n  </Item.Actions>`;
    code += `\n</Item.Root>`;
    return code;
  }

  const installationCode = `npx nnuikit add item

# Optional: for action buttons
npx nnuikit add button`;

  const importCode = `import * as Item from "$lib/components/ui/item";`;

  const quickStartCode = `<Item.Root>
  <Item.Media>
    <IconPdf />
  </Item.Media>
  <Item.Content>
    <Item.Title>Project brief.pdf</Item.Title>
    <Item.Description>245 KB — Updated 2 hours ago</Item.Description>
  </Item.Content>
  <Item.Actions>
    <Button variant="orphan" size="icon-sm">
      <IconCross />
    </Button>
  </Item.Actions>
</Item.Root>`;

  const variantsCode = `<!-- Default -->
<Item.Root variant="default">
  <Item.Content>
    <Item.Title>Uploaded file</Item.Title>
    <Item.Description>Ready to process</Item.Description>
  </Item.Content>
</Item.Root>

<!-- Success -->
<Item.Root variant="success">
  <Item.Content>
    <Item.Title>Upload complete</Item.Title>
    <Item.Description>File processed successfully</Item.Description>
  </Item.Content>
</Item.Root>

<!-- Error -->
<Item.Root variant="error">
  <Item.Content>
    <Item.Title>Upload failed</Item.Title>
    <Item.Description>File exceeds maximum size</Item.Description>
  </Item.Content>
</Item.Root>`;

  const groupCode = `<Item.Group>
  <Item.Root>
    <Item.Media><IconPdf /></Item.Media>
    <Item.Content>
      <Item.Title>Report Q4.pdf</Item.Title>
      <Item.Description>1.2 MB</Item.Description>
    </Item.Content>
  </Item.Root>
  <Item.Separator />
  <Item.Root>
    <Item.Media><IconPhoto /></Item.Media>
    <Item.Content>
      <Item.Title>Banner.png</Item.Title>
      <Item.Description>340 KB</Item.Description>
    </Item.Content>
  </Item.Root>
</Item.Group>`;

  const itemRootProps = [
    { name: "variant", type: '"default" | "success" | "error"', default: '"default"', description: "Visual state variant — controls surface and border colors." },
    { name: "class", type: "string", default: '""', description: "Additional CSS classes." },
    { name: "children", type: "Snippet", default: "-", description: "Compose with Item.Media, Item.Content, Item.Actions." },
  ];

  const subComponentProps = [
    { name: "Item.Content", description: "Flex column container for title + description. Takes remaining space." },
    { name: "Item.Title", description: "Primary label. Color adapts to variant (default/success/error)." },
    { name: "Item.Description", description: "Secondary text below title. 2-line clamp. Color adapts to variant." },
    { name: "Item.Media", description: "Leading slot for icons, avatars, or thumbnails. Fixed size." },
    { name: "Item.Actions", description: "Trailing slot for buttons or controls. Flex row with gap." },
    { name: "Item.Group", description: "Wraps multiple items into a vertical list." },
    { name: "Item.Separator", description: "Horizontal divider between items in a group." },
    { name: "Item.Header", description: "Group header label." },
    { name: "Item.Footer", description: "Group footer. Color adapts to variant for progress/status text." },
  ];
</script>

<Seo
  title="Item"
  description="A compound list item component with media, content, title, description, and action slots. Supports default, success, and error variants."
/>

<DocsPage>
  <PageHeader
    title="Item"
    description="A compound list item with slots for media, content, and actions. Three variants — default, success, error — powered by design tokens."
  />

  <div class="mt-10 flex flex-col gap-12">

    <div>
      <ComponentSource name="item" path="$lib/components/ui/item/item.svelte" />
    </div>

    <!-- Installation -->
    <section class="flex flex-col gap-5">
      <h2 class="text-2xl font-bold tracking-tight">Installation</h2>
      <CodeBlock code={installationCode} language="bash" title="CLI" />
      <CodeBlock code={importCode} language="typescript" title="Import" />
    </section>

    <!-- Quick Start -->
    <section class="flex flex-col gap-5">
      <h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
      <ComponentPreview code={quickStartCode}>
        {#snippet preview()}
          <div class="w-full max-w-md mx-auto p-5">
            <Item.Root>
              <Item.Media>
                <IconPdf />
              </Item.Media>
              <Item.Content>
                <Item.Title>Project brief.pdf</Item.Title>
                <Item.Description>245 KB — Updated 2 hours ago</Item.Description>
              </Item.Content>
              <Item.Actions>
                <Button variant="orphan" size="icon-sm">
                  <IconCross />
                </Button>
              </Item.Actions>
            </Item.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <!-- Interactive Playground -->
    <section class="flex flex-col gap-5">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Interactive Playground</h2>
        <p class="mt-1.5 text-sm text-text-neutral-secondary">Toggle variant, media, description, and actions.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-5 items-start">
        <!-- Preview -->
        <div class="flex flex-col gap-5 rounded-xl border border-border-neutral-l4 p-5">
          <div class="w-full">
            <Item.Root variant={playgroundVariant}>
              {#if showMedia}
                <Item.Media>
                  {#if playgroundVariant === "success"}
                    <IconCheck />
                  {:else if playgroundVariant === "error"}
                    <IconCross />
                  {:else}
                    <IconPdf />
                  {/if}
                </Item.Media>
              {/if}
              <Item.Content>
                <Item.Title>
                  {playgroundVariant === "success" ? "Upload complete" : playgroundVariant === "error" ? "Upload failed" : "Document.pdf"}
                </Item.Title>
                {#if showDescription}
                  <Item.Description>
                    {playgroundVariant === "success" ? "File processed successfully" : playgroundVariant === "error" ? "File exceeds maximum size" : "245 KB — Updated 2 hours ago"}
                  </Item.Description>
                {/if}
              </Item.Content>
              {#if showActions}
                <Item.Actions>
                  <Button variant="orphan" size="icon-sm">
                    <IconCross />
                  </Button>
                </Item.Actions>
              {/if}
            </Item.Root>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex flex-col gap-7 rounded-xl border border-border-neutral-l4 p-5">
          <div class="flex flex-col gap-2.5">
            <span class="text-sm font-semibold text-text-neutral-primary">Variant</span>
            <div class="flex gap-2.5">
              {#each variants as v (v.value)}
                <Button
                  variant={playgroundVariant === v.value ? "primary" : "tertiary"}
                  size="sm"
                  onclick={() => (playgroundVariant = v.value)}
                >
                  {v.label}
                </Button>
              {/each}
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <span class="text-sm font-semibold text-text-neutral-primary">Slots</span>
            <label class="flex items-center gap-2.5 text-sm text-text-neutral-secondary">
              <input type="checkbox" bind:checked={showMedia} class="accent-surface-brand-primary" />
              Show Media
            </label>
            <label class="flex items-center gap-2.5 text-sm text-text-neutral-secondary">
              <input type="checkbox" bind:checked={showDescription} class="accent-surface-brand-primary" />
              Show Description
            </label>
            <label class="flex items-center gap-2.5 text-sm text-text-neutral-secondary">
              <input type="checkbox" bind:checked={showActions} class="accent-surface-brand-primary" />
              Show Actions
            </label>
          </div>
        </div>
      </div>

      <CodeBlock code={getPlaygroundCode()} language="svelte" title="Generated code" />
    </section>

    <!-- Variants -->
    <section class="flex flex-col gap-5">
      <h2 class="text-2xl font-bold tracking-tight">Variants</h2>
      <ComponentPreview code={variantsCode}>
        {#snippet preview()}
          <div class="w-full max-w-md mx-auto p-5 flex flex-col gap-3">
            <Item.Root variant="default">
              <Item.Media><IconPdf /></Item.Media>
              <Item.Content>
                <Item.Title>Uploaded file</Item.Title>
                <Item.Description>Ready to process</Item.Description>
              </Item.Content>
            </Item.Root>
            <Item.Root variant="success">
              <Item.Media><IconCheck /></Item.Media>
              <Item.Content>
                <Item.Title>Upload complete</Item.Title>
                <Item.Description>File processed successfully</Item.Description>
              </Item.Content>
            </Item.Root>
            <Item.Root variant="error">
              <Item.Media><IconCross /></Item.Media>
              <Item.Content>
                <Item.Title>Upload failed</Item.Title>
                <Item.Description>File exceeds maximum size</Item.Description>
              </Item.Content>
            </Item.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <!-- Item Group -->
    <section class="flex flex-col gap-5">
      <h2 class="text-2xl font-bold tracking-tight">Item Group</h2>
      <p class="text-sm leading-relaxed text-text-neutral-secondary">
        Wrap multiple items with <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">Item.Group</code> and separate them with <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">Item.Separator</code>.
      </p>
      <ComponentPreview code={groupCode}>
        {#snippet preview()}
          <div class="w-full max-w-md mx-auto p-5">
            <Item.Group>
              <Item.Root>
                <Item.Media><IconPdf /></Item.Media>
                <Item.Content>
                  <Item.Title>Report Q4.pdf</Item.Title>
                  <Item.Description>1.2 MB</Item.Description>
                </Item.Content>
              </Item.Root>
              <Item.Separator />
              <Item.Root>
                <Item.Media><IconPhoto /></Item.Media>
                <Item.Content>
                  <Item.Title>Banner.png</Item.Title>
                  <Item.Description>340 KB</Item.Description>
                </Item.Content>
              </Item.Root>
            </Item.Group>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <!-- API Reference -->
    <section class="flex flex-col gap-5">
      <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>

      <div class="flex flex-col gap-7">
        <div class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold">Item.Root</h3>
          <PropsTable props={itemRootProps} />
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
                {#each subComponentProps as comp (comp.name)}
                  <tr>
                    <td class="px-5 py-3 font-mono text-xs text-text-brand-primary">{comp.name}</td>
                    <td class="px-5 py-3 text-xs text-text-neutral-secondary">{comp.description}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

  </div>
</DocsPage>
