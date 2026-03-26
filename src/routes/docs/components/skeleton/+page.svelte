<script lang="ts">
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
  import {
    CodeBlock,
    ComponentPreview,
    ComponentSource,
    DocsPage,
    PageHeader,
    PropsTable,
  } from "$lib/components/docs";
  import Seo from '$lib/components/seo.svelte';

  const installationCode = `import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";`;

  const skeletonProps = [
    {
      name: "class",
      type: "string",
      default: "-",
      description: "Custom CSS classes to style the skeleton's shape and size.",
    },
  ];
</script>

<Seo title="Skeleton" description="A loading placeholder component with pulse animation. Zero dependencies, pure CSS." />

<DocsPage>
  <PageHeader
    title="Skeleton"
    description="Used to show a placeholder while content is loading."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="skeleton"
        path="src/lib/components/ui/skeleton/skeleton.svelte"
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
        code={`<div class="flex items-center space-x-4">
  <Skeleton class="h-28 w-28 rounded-full" />
  <div class="space-y-2">
    <Skeleton class="h-16 w-[250px]" />
    <Skeleton class="h-16 w-[200px]" />
  </div>
</div>`}
      >
        {#snippet preview()}
          <div class="flex items-center justify-center p-10 w-full">
            <div class="flex items-center space-x-4">
              <Skeleton class="h-28 w-28 rounded-full" />
              <div class="space-y-2">
                <Skeleton class="h-16 w-[250px]" />
                <Skeleton class="h-16 w-[200px]" />
              </div>
            </div>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Examples</h2>
        <p class="text-text-neutral-secondary">
          Common patterns for different content types.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <!-- Card Skeleton -->
        <div
          class="flex flex-col p-6 space-y-16 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Card Profile</p>
          </div>
          <div class="flex flex-col space-y-3 p-4">
            <Skeleton class="h-[125px] w-full rounded-xl" />
            <div class="space-y-2">
              <Skeleton class="h-16 w-full" />
              <Skeleton class="h-16 w-[70%]" />
            </div>
          </div>
          <CodeBlock
            code={`<div class="flex flex-col space-y-3">
  <Skeleton class="h-[125px] w-full rounded-xl" />
  <div class="space-y-2">
    <Skeleton class="h-16 w-full" />
    <Skeleton class="h-16 w-[70%]" />
  </div>
</div>`}
            language="svelte"
            class="text-xs"
          />
        </div>

        <!-- List Skeleton -->
        <div
          class="flex flex-col p-6 space-y-16 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Feed Item</p>
          </div>
          <div class="space-y-3 p-4">
            <div class="flex items-center space-x-4">
              <Skeleton class="h-24 w-24 rounded-full" />
              <div class="space-y-2 flex-1">
                <Skeleton class="h-24 w-[150px]" />
                <Skeleton class="h-24 w-full" />
              </div>
            </div>
            <Skeleton class="h-20 w-full rounded-lg" />
          </div>
          <CodeBlock
            code={`<div class="flex items-center space-x-4 pb-4">
  <Skeleton class="h-24 w-24 rounded-full" />
  <div class="space-y-2 flex-1">
    <Skeleton class="h-24 w-[150px]" />
    <Skeleton class="h-24 w-full" />
  </div>
</div>
<Skeleton class="h-20 w-full rounded-lg" />`}
            language="svelte"
            class="text-xs"
          />
        </div>

        <!-- Form Skeleton -->
        <div
          class="flex flex-col p-6 space-y-16 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Subscription Form</p>
          </div>
          <div class="space-y-4 p-4">
            <div class="space-y-2">
              <Skeleton class="h-24 w-[80px]" />
              <Skeleton class="h-24 w-full" />
            </div>
            <Skeleton class="h-24 w-1/3" />
          </div>
          <CodeBlock
            code={`<div class="space-y-4">
  <div class="space-y-2">
    <Skeleton class="h-24 w-[80px]" />
    <Skeleton class="h-24 w-full" />
  </div>
  <Skeleton class="h-24 w-1/3" />
</div>`}
            language="svelte"
            class="text-xs"
          />
        </div>

        <!-- Table Skeleton -->
        <div
          class="flex flex-col p-6 space-y-16 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Table Row</p>
          </div>
          <div class="space-y-3 p-4">
            {#each Array(3) as _}
              <div class="flex items-center space-x-4">
                <Skeleton class="h-24 w-1/4" />
                <Skeleton class="h-24 w-1/4" />
                <Skeleton class="h-24 w-1/4" />
                <Skeleton class="h-24 w-1/4" />
              </div>
            {/each}
          </div>
          <CodeBlock
            code={`<div class="space-y-3">
    {#each Array(3) as _}
        <div class="flex items-center space-x-4">
            <Skeleton class="h-24 w-1/4" />
            <Skeleton class="h-24 w-1/4" />
            <Skeleton class="h-24 w-1/4" />
            <Skeleton class="h-24 w-1/4" />
        </div>
    {/each}
</div>`}
            language="svelte"
            class="text-xs"
          />
        </div>
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="py-6 text-2xl font-bold tracking-tight border-b">Props</h2>
      <PropsTable props={skeletonProps} />
    </section>
  </div>
</DocsPage>
