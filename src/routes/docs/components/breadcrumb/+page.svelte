<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import IconChevronDown from "$lib/icons/icon-chevron-down.svelte";

  import {
    DocsPage,
    PageHeader,
    ComponentPreview,
    CodeBlock,
    PropsTable,
    ComponentSource,
  } from "$lib/components/docs";

  const breadcrumbProps = [
    {
      name: "ref",
      type: "HTMLElement | null",
      default: "null",
      description: "Binding to the underlying HTML element.",
    },
    {
      name: "class",
      type: "string",
      default: "undefined",
      description: "CSS classes to apply to the component.",
    },
  ];

  const breadcrumbLinkProps = [
    {
      name: "href",
      type: "string",
      default: "undefined",
      description: "The URL that the link points to.",
    },
    {
      name: "child",
      type: "Snippet",
      default: "undefined",
      description:
        "Snippet to render a custom child (e.g. for routing libraries).",
    },
  ];

  const basicCode = `<script lang="ts">
 import * as Breadcrumb from "$lib/components/ui/breadcrumb
 <Breadcrumb.Root>
 <Breadcrumb.List>
  <Breadcrumb.Item>
   <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
   <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
   <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
  </Breadcrumb.Item>
 </Breadcrumb.List>
</Breadcrumb.Root>
 ";`;

  const customSeparatorCode = `<script lang="ts">
 import * as Breadcrumb from "$lib/components/ui/breadcrumb";
 
 <Breadcrumb.Root>
                    <Breadcrumb.List>
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="/components"
                                >Components</Breadcrumb.Link
                            >
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>`;
  const dropdownCode = `<script lang="ts">
 import * as Breadcrumb from "$lib/components/ui/breadcrumb";
 import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
 

 <Breadcrumb.Root>
                    <Breadcrumb.List>
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger
                                    class="flex items-center gap-1"
                                >
                                    Components
                                    <IconChevronDown className="size-16 mx-4" />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content align="start">
                                    <DropdownMenu.Item
                                        >Documentation</DropdownMenu.Item
                                    >
                                    <DropdownMenu.Item>Themes</DropdownMenu.Item
                                    >
                                    <DropdownMenu.Item>GitHub</DropdownMenu.Item
                                    >
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>`;
  const collapsedCode = `<script lang="ts">
 import * as Breadcrumb from "$lib/components/ui/breadcrumb
 
<Breadcrumb.Root>
 <Breadcrumb.List>
  <Breadcrumb.Item>
   <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
   <Breadcrumb.Ellipsis />
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
   <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
   <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
  </Breadcrumb.Item>
 </Breadcrumb.List>
</Breadcrumb.Root>`;
</script>

<DocsPage>
  <PageHeader
    title="Breadcrumb"
    description="Displays the path to the current resource using a hierarchy of links."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="breadcrumb"
        path="$lib/components/ui/breadcrumb/index.ts"
      />
    </div>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Installation</h2>
      <CodeBlock
        code={`import * as Breadcrumb from "$lib/components/ui/breadcrumb";`}
        language="bash"
        title="Installation"
      />
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Usage</h2>
      <ComponentPreview code={basicCode}>
        {#snippet preview()}
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Examples</h2>

      <div class="space-y-20">
        <div class="space-y-8">
          <h3 class="text-xl font-semibold tracking-tight">Custom Separator</h3>
          <ComponentPreview code={customSeparatorCode}>
            {#snippet preview()}
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/components"
                      >Components</Breadcrumb.Link
                    >
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            {/snippet}
          </ComponentPreview>
        </div>

        <div class="space-y-8">
          <h3 class="text-xl font-semibold tracking-tight">Dropdown</h3>
          <ComponentPreview code={dropdownCode}>
            {#snippet preview()}
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger class="flex items-center gap-1">
                        Components
                        <IconChevronDown className="size-16 mx-4" />
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content align="start">
                        <DropdownMenu.Item>Documentation</DropdownMenu.Item>
                        <DropdownMenu.Item>Themes</DropdownMenu.Item>
                        <DropdownMenu.Item>GitHub</DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            {/snippet}
          </ComponentPreview>
        </div>

        <div class="space-y-8">
          <h3 class="text-xl font-semibold tracking-tight">Collapsed</h3>
          <ComponentPreview code={collapsedCode}>
            {#snippet preview()}
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Ellipsis />
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/docs/components"
                      >Components</Breadcrumb.Link
                    >
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            {/snippet}
          </ComponentPreview>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-bold tracking-tight">Props</h2>
      <PropsTable props={breadcrumbProps} />
      <h3 class="text-xl font-semibold tracking-tight pt-4">Breadcrumb.Link</h3>
      <PropsTable props={breadcrumbLinkProps} />
    </section>
  </div>
</DocsPage>
