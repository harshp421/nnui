<script lang="ts">
  import * as Item from "$lib/components/ui/item";
  import {
    DocsPage,
    PageHeader,
    ComponentPreview,
    CodeBlock,
    ComponentSource,
    PropsTable,
  } from "$lib/components/docs";

  const installationCode = `import * as Item from "$lib/components/ui/item";`;

  const quickStartCode = `<Item.Root>
  <Item.Media>
    <svg class="size-10 text-text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  </Item.Media>
  <Item.Content>
    <Item.Title>Design Tokens</Item.Title>
    <Item.Description>A 3-layer token system for scalable theming across your entire project.</Item.Description>
  </Item.Content>
  <Item.Actions>
    <button class="rounded-lg bg-surface-brand-primary px-3 py-1.5 text-xs font-medium text-text-statics-pure-white">
      View
    </button>
  </Item.Actions>
</Item.Root>`;

  const groupCode = `<Item.Group>
  <Item.Header>Recent items</Item.Header>

  <Item.Root>
    <Item.Media>
      <svg class="size-8 text-text-neutral-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </Item.Media>
    <Item.Content>
      <Item.Title>Project brief.pdf</Item.Title>
      <Item.Description>Updated 2 hours ago</Item.Description>
    </Item.Content>
  </Item.Root>

  <Item.Separator />

  <Item.Root>
    <Item.Media>
      <svg class="size-8 text-text-neutral-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </Item.Media>
    <Item.Content>
      <Item.Title>Hero banner.png</Item.Title>
      <Item.Description>Updated yesterday</Item.Description>
    </Item.Content>
  </Item.Root>

  <Item.Footer>
    <span class="text-xs text-text-neutral-tertiary">2 items</span>
  </Item.Footer>
</Item.Group>`;

  const itemRootProps = [
    {
      name: "class",
      type: "string",
      default: '""',
      description: "Additional CSS classes applied to the root container.",
    },
    {
      name: "children",
      type: "Snippet",
      default: "-",
      description: "Slot content — compose with Item.Media, Item.Content, Item.Actions, etc.",
    },
  ];

  const itemGroupProps = [
    {
      name: "class",
      type: "string",
      default: '""',
      description: "Additional CSS classes applied to the group wrapper.",
    },
    {
      name: "children",
      type: "Snippet",
      default: "-",
      description: "Slot for Item.Header, Item.Root, Item.Separator, and Item.Footer children.",
    },
  ];

  const itemContentProps = [
    {
      name: "class",
      type: "string",
      default: '""',
      description: "Additional CSS classes applied to the content area.",
    },
    {
      name: "children",
      type: "Snippet",
      default: "-",
      description: "Slot for Item.Title and Item.Description.",
    },
  ];

  const itemTitleProps = [
    {
      name: "class",
      type: "string",
      default: '""',
      description: "Additional CSS classes applied to the title element.",
    },
    {
      name: "children",
      type: "Snippet",
      default: "-",
      description: "Title text content.",
    },
  ];

  const itemDescriptionProps = [
    {
      name: "class",
      type: "string",
      default: '""',
      description: "Additional CSS classes applied to the description element.",
    },
    {
      name: "children",
      type: "Snippet",
      default: "-",
      description: "Description text content.",
    },
  ];

  const itemMediaProps = [
    {
      name: "class",
      type: "string",
      default: '""',
      description: "Additional CSS classes applied to the media slot container.",
    },
    {
      name: "children",
      type: "Snippet",
      default: "-",
      description: "Slot for an icon, avatar, image, or any visual element.",
    },
  ];

  const itemActionsProps = [
    {
      name: "class",
      type: "string",
      default: '""',
      description: "Additional CSS classes applied to the actions container.",
    },
    {
      name: "children",
      type: "Snippet",
      default: "-",
      description: "Slot for buttons, links, or interactive controls.",
    },
  ];
</script>

<DocsPage>
  <PageHeader
    title="Item"
    description="A compound list item component with slots for media, content, title, description, and actions."
  />

  <div class="flex flex-col gap-32 mt-28">
    <!-- Component Source -->
    <div>
      <ComponentSource name="item" path="$lib/components/ui/item/item.svelte" />
    </div>

    <!-- Installation -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Installation</h2>
      <CodeBlock
        code={installationCode}
        language="typescript"
        title="Installation"
      />
    </section>

    <!-- Quick Start -->
    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
        <p class="text-text-neutral-secondary">
          A basic item with a media icon, content area with title and description, and an action button.
        </p>
      </div>
      <ComponentPreview code={quickStartCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <div class="w-full max-w-md">
              <Item.Root>
                <Item.Media>
                  <svg class="size-10 text-text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </Item.Media>
                <Item.Content>
                  <Item.Title>Design Tokens</Item.Title>
                  <Item.Description>A 3-layer token system for scalable theming across your entire project.</Item.Description>
                </Item.Content>
                <Item.Actions>
                  <button class="rounded-lg bg-surface-brand-primary px-3 py-1.5 text-xs font-medium text-text-statics-pure-white">
                    View
                  </button>
                </Item.Actions>
              </Item.Root>
            </div>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <!-- Item Group with Separator -->
    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Item Group</h2>
        <p class="text-text-neutral-secondary">
          Use <code class="relative rounded bg-surface-neutral-l2 px-[0.3rem] py-[0.2rem] font-mono text-sm">Item.Group</code> to wrap multiple items with an optional header, footer, and separators between entries.
        </p>
      </div>
      <ComponentPreview code={groupCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <div class="w-full max-w-md">
              <Item.Group>
                <Item.Header>Recent items</Item.Header>

                <Item.Root>
                  <Item.Media>
                    <svg class="size-8 text-text-neutral-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </Item.Media>
                  <Item.Content>
                    <Item.Title>Project brief.pdf</Item.Title>
                    <Item.Description>Updated 2 hours ago</Item.Description>
                  </Item.Content>
                </Item.Root>

                <Item.Separator />

                <Item.Root>
                  <Item.Media>
                    <svg class="size-8 text-text-neutral-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </Item.Media>
                  <Item.Content>
                    <Item.Title>Hero banner.png</Item.Title>
                    <Item.Description>Updated yesterday</Item.Description>
                  </Item.Content>
                </Item.Root>

                <Item.Footer>
                  <span class="text-xs text-text-neutral-tertiary">2 items</span>
                </Item.Footer>
              </Item.Group>
            </div>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <!-- API Reference -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>

      <div class="space-y-20">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Item.Root</h3>
          <p class="text-text-neutral-secondary text-sm">
            The root container for a single item. Lays out media, content, and actions horizontally.
          </p>
          <PropsTable props={itemRootProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Item.Group</h3>
          <p class="text-text-neutral-secondary text-sm">
            Wraps multiple items into a visually grouped list with optional header and footer.
          </p>
          <PropsTable props={itemGroupProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Item.Content</h3>
          <p class="text-text-neutral-secondary text-sm">
            Flexible content area within an item, typically containing a title and description.
          </p>
          <PropsTable props={itemContentProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Item.Title</h3>
          <p class="text-text-neutral-secondary text-sm">
            The primary label or heading for the item.
          </p>
          <PropsTable props={itemTitleProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Item.Description</h3>
          <p class="text-text-neutral-secondary text-sm">
            Secondary text providing additional context below the title.
          </p>
          <PropsTable props={itemDescriptionProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Item.Media</h3>
          <p class="text-text-neutral-secondary text-sm">
            A slot for visual content such as icons, avatars, or thumbnails displayed alongside the item.
          </p>
          <PropsTable props={itemMediaProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Item.Actions</h3>
          <p class="text-text-neutral-secondary text-sm">
            A trailing slot for interactive controls like buttons, toggles, or links.
          </p>
          <PropsTable props={itemActionsProps} />
        </div>
      </div>
    </section>
  </div>
</DocsPage>
