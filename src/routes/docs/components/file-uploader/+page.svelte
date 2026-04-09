<script lang="ts">
  import Seo from "$lib/components/seo.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Item from "$lib/components/ui/item/index.js";
  import { FileUploader } from "$lib/components/ui/file-uploader";
  import IconPdf from "$lib/icons/icon-pdf.svelte";
  import IconPhoto from "$lib/icons/icon-photo.svelte";
  import IconVideo from "$lib/icons/icon-video.svelte";
  import IconCross from "$lib/icons/icon-cross.svelte";
  import {
    DocsPage,
    PageHeader,
    ComponentPreview,
    CodeBlock,
    PropsTable,
    ComponentSource,
  } from "$lib/components/docs";

  let files = $state<File[]>([]);
  let maxFiles = $state(3);
  let maxSize = $state(10);
  let acceptedTypes = $state<string[]>([".pdf", ".csv", ".xlsx"]);

  const fileTypeOptions = [
    { value: ".pdf", label: "PDF" },
    { value: ".csv", label: "CSV" },
    { value: ".xlsx", label: "Excel" },
    { value: ".jpg", label: "JPG" },
    { value: ".png", label: "PNG" },
    { value: ".mp4", label: "MP4" },
  ];

  function handleRemoveFile(index: number) {
    files = files.filter((_, i) => i !== index);
  }

  function getFileIcon(fileName: string) {
    const ext = fileName.toLowerCase().split(".").pop();
    switch (ext) {
      case "pdf":
      case "csv":
      case "xlsx":
      case "xls":
        return IconPdf;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return IconPhoto;
      case "mp4":
      case "mov":
      case "avi":
        return IconVideo;
      default:
        return IconPdf;
    }
  }

  function toggleFileType(type: string) {
    if (acceptedTypes.includes(type)) {
      acceptedTypes = acceptedTypes.filter((t) => t !== type);
    } else {
      acceptedTypes = [...acceptedTypes, type];
    }
  }

  function getPlaygroundCode() {
    const maxSizeBytes = maxSize * 1024 * 1024;
    const typesStr = JSON.stringify(acceptedTypes);
    return `<script lang="ts">
  import { FileUploader } from "$lib/components/ui/file-uploader";
  import * as Item from "$lib/components/ui/item";
  import Button from "$lib/components/ui/button/button.svelte";

  let files = $state<File[]>([]);

  function handleRemoveFile(index: number) {
    files = files.filter((_, i) => i !== index);
  }
<\/script>

<FileUploader
  onFilesChange={(newFiles) => (files = [...files, ...newFiles])}
  acceptedFileTypes={${typesStr}}
  maxFilesToUpload={${maxFiles}}
  maxFileSize={${maxSizeBytes}}
/>

{#if files.length > 0}
  <div class="mt-4 space-y-2">
    {#each files as file, index (file.name + index)}
      <Item.Root>
        <Item.Content>
          <Item.Title>{file.name}</Item.Title>
          <Item.Description>
            {(file.size / 1024).toFixed(1)} KB
          </Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button
            variant="orphan"
            size="icon-sm"
            onclick={() => handleRemoveFile(index)}
          >✕</Button>
        </Item.Actions>
      </Item.Root>
    {/each}
  </div>
{/if}`;
  }

  const installationCode = `npx nnuikit add file-uploader

# The file list uses the Item component (optional)
npx nnuikit add item button`;

  const importCode = `import { FileUploader } from "$lib/components/ui/file-uploader";

// For the file list UI (optional)
import * as Item from "$lib/components/ui/item";
import Button from "$lib/components/ui/button/button.svelte";`;

  const basicCode = `<script lang="ts">
  import { FileUploader } from "$lib/components/ui/file-uploader";

  let files = $state<File[]>([]);
<\/script>

<FileUploader
  onFilesChange={(newFiles) => (files = [...files, ...newFiles])}
  maxFilesToUpload={3}
  acceptedFileTypes={[".pdf", ".csv", ".xlsx"]}
  maxFileSize={10 * 1024 * 1024}
/>`;

  const withFileListCode = `<script lang="ts">
  import { FileUploader } from "$lib/components/ui/file-uploader";
  import * as Item from "$lib/components/ui/item";
  import Button from "$lib/components/ui/button/button.svelte";

  let files = $state<File[]>([]);

  function handleRemoveFile(index: number) {
    files = files.filter((_, i) => i !== index);
  }
<\/script>

<FileUploader
  onFilesChange={(newFiles) => (files = [...files, ...newFiles])}
  maxFilesToUpload={5}
  acceptedFileTypes={[".pdf", ".jpg", ".png"]}
/>

{#if files.length > 0}
  <div class="mt-4 space-y-2">
    {#each files as file, index (file.name + index)}
      <Item.Root>
        <Item.Content>
          <Item.Title>{file.name}</Item.Title>
          <Item.Description>
            {(file.size / 1024).toFixed(1)} KB
          </Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button variant="orphan" size="icon-sm"
            onclick={() => handleRemoveFile(index)}>
            ✕
          </Button>
        </Item.Actions>
      </Item.Root>
    {/each}
  </div>
{/if}`;

  const uploaderProps = [
    {
      name: "onFilesChange",
      type: "(files: File[]) => void",
      default: "-",
      description: "Callback triggered when files are selected or dropped.",
    },
    {
      name: "maxFilesToUpload",
      type: "number",
      default: "1",
      description: "Maximum number of files allowed.",
    },
    {
      name: "maxFileSize",
      type: "number",
      default: "10485760 (10 MB)",
      description: "Maximum size in bytes for each file.",
    },
    {
      name: "acceptedFileTypes",
      type: "string[]",
      default: '[".csv", ".pdf", ".xlsx"]',
      description: "Array of allowed file extensions.",
    },
    {
      name: "disable",
      type: "boolean",
      default: "false",
      description: "Disables the uploader interaction.",
    },
  ];
</script>

<Seo
  title="File Uploader"
  description="A drag-and-drop file uploader with validation for file types, sizes, and quantities. Keyboard accessible and screen reader friendly."
/>

<DocsPage>
  <PageHeader
    title="File Uploader"
    description="Drag-and-drop file upload with built-in validation for types, sizes, and quantities. Fully keyboard accessible."
  />

  <div class="mt-10 flex flex-col gap-12">

    <div>
      <ComponentSource
        name="file-uploader"
        path="$lib/components/ui/file-uploader/file-uploader.svelte"
      />
    </div>

    <!-- Installation -->
    <section class="flex flex-col gap-5">
      <h2 class="text-2xl font-bold tracking-tight">Installation</h2>
      <CodeBlock code={installationCode} language="bash" title="CLI" />
      <CodeBlock code={importCode} language="typescript" title="Imports" />
    </section>

    <!-- Quick Start — basic -->
    <section class="flex flex-col gap-5">
      <h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
      <p class="text-sm leading-relaxed text-text-neutral-secondary">
        The simplest usage — just the drop zone with a callback.
      </p>
      <ComponentPreview code={basicCode}>
        {#snippet preview()}
          <div class="w-full max-w-xl mx-auto p-5">
            <FileUploader
              onFilesChange={(newFiles: File[]) =>
                console.log("Files:", newFiles)}
              maxFilesToUpload={3}
              acceptedFileTypes={[".pdf", ".csv", ".xlsx"]}
            />
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <!-- With file list -->
    <section class="flex flex-col gap-5">
      <h2 class="text-2xl font-bold tracking-tight">With File List</h2>
      <p class="text-sm leading-relaxed text-text-neutral-secondary">
        Combine with the Item component to show uploaded files with name, size, and a remove button.
      </p>
      <ComponentPreview code={withFileListCode}>
        {#snippet preview()}
          <div class="w-full max-w-xl mx-auto p-5">
            <FileUploader
              onFilesChange={(newFiles: File[]) => (files = [...files, ...newFiles])}
              maxFilesToUpload={5}
              acceptedFileTypes={[".pdf", ".jpg", ".png"]}
            />

            {#if files.length > 0}
              <div class="mt-5 space-y-2.5">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-semibold text-text-neutral-primary">Files ({files.length})</h3>
                  <Button variant="orphan" size="sm" onclick={() => (files = [])}>
                    Clear all
                  </Button>
                </div>
                {#each files as file, index (file.name + index)}
                  {@const IconComponent = getFileIcon(file.name)}
                  <Item.Root>
                    <Item.Media>
                      <IconComponent />
                    </Item.Media>
                    <Item.Content>
                      <Item.Title>{file.name}</Item.Title>
                      <Item.Description>
                        {(file.size / 1024).toFixed(1)} KB
                      </Item.Description>
                    </Item.Content>
                    <Item.Actions>
                      <Button
                        variant="orphan"
                        size="icon-sm"
                        onclick={() => handleRemoveFile(index)}
                      >
                        <IconCross />
                      </Button>
                    </Item.Actions>
                  </Item.Root>
                {/each}
              </div>
            {/if}
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <!-- Interactive Playground -->
    <section class="flex flex-col gap-5">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Interactive Playground</h2>
        <p class="mt-1.5 text-sm text-text-neutral-secondary">
          Configure validation rules and see the generated code.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-5 items-start">
        <!-- Left: uploader + file list -->
        <div class="flex flex-col gap-5 rounded-xl border border-border-neutral-l4 p-5">
          <FileUploader
            onFilesChange={(newFiles: File[]) => (files = [...files, ...newFiles])}
            maxFilesToUpload={maxFiles}
            acceptedFileTypes={acceptedTypes}
            maxFileSize={maxSize * 1024 * 1024}
          />

          {#if files.length > 0}
            <div class="space-y-2.5 pt-5 border-t border-border-neutral-l4">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold text-text-neutral-primary">Files ({files.length})</h3>
                <Button variant="orphan" size="sm" onclick={() => (files = [])}>
                  Clear
                </Button>
              </div>
              {#each files as file, index (file.name + index)}
                {@const IconComponent = getFileIcon(file.name)}
                <Item.Root>
                  <Item.Media>
                    <IconComponent />
                  </Item.Media>
                  <Item.Content>
                    <Item.Title>{file.name}</Item.Title>
                    <Item.Description>
                      {(file.size / 1024).toFixed(1)} KB
                    </Item.Description>
                  </Item.Content>
                  <Item.Actions>
                    <Button
                      variant="orphan"
                      size="icon-sm"
                      onclick={() => handleRemoveFile(index)}
                    >
                      <IconCross />
                    </Button>
                  </Item.Actions>
                </Item.Root>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Right: controls -->
        <div class="flex flex-col gap-7 rounded-xl border border-border-neutral-l4 p-5">
          <div class="flex flex-col gap-2.5">
            <div class="flex justify-between items-center text-sm font-semibold text-text-neutral-primary">
              <span>Max Files</span>
              <span class="font-mono text-text-brand-primary">{maxFiles}</span>
            </div>
            <input
              type="range"
              bind:value={maxFiles}
              min="1"
              max="10"
              class="w-full accent-[var(--color-surface-brand-primary)]"
            />
          </div>

          <div class="flex flex-col gap-2.5">
            <div class="flex justify-between items-center text-sm font-semibold text-text-neutral-primary">
              <span>Max Size (MB)</span>
              <span class="font-mono text-text-brand-primary">{maxSize}</span>
            </div>
            <input
              type="range"
              bind:value={maxSize}
              min="1"
              max="50"
              class="w-full accent-[var(--color-surface-brand-primary)]"
            />
          </div>

          <div class="flex flex-col gap-2.5">
            <span class="text-sm font-semibold text-text-neutral-primary">Accepted Types</span>
            <div class="grid grid-cols-3 gap-2.5">
              {#each fileTypeOptions as option}
                <Button
                  variant={acceptedTypes.includes(option.value) ? "primary" : "tertiary"}
                  size="sm"
                  onclick={() => toggleFileType(option.value)}
                >
                  {option.label}
                </Button>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <CodeBlock code={getPlaygroundCode()} language="svelte" title="Generated code" />
    </section>

    <!-- Examples -->
    <section class="flex flex-col gap-5">
      <h2 class="text-2xl font-bold tracking-tight">Examples</h2>

      <div class="grid gap-5 md:grid-cols-2">
        <div class="flex flex-col gap-3 rounded-xl border border-border-neutral-l4 p-5">
          <p class="text-sm font-semibold text-text-neutral-primary">PDF Only (single file)</p>
          <FileUploader
            onFilesChange={() => {}}
            maxFilesToUpload={1}
            acceptedFileTypes={[".pdf"]}
            maxFileSize={5 * 1024 * 1024}
          />
        </div>

        <div class="flex flex-col gap-3 rounded-xl border border-border-neutral-l4 p-5">
          <p class="text-sm font-semibold text-text-neutral-primary">Multi-Image (up to 5)</p>
          <FileUploader
            onFilesChange={() => {}}
            maxFilesToUpload={5}
            acceptedFileTypes={[".jpg", ".png"]}
          />
        </div>
      </div>
    </section>

    <!-- Accessibility -->
    <section class="flex flex-col gap-5">
      <h2 class="text-2xl font-bold tracking-tight">Accessibility</h2>
      <div class="flex flex-col gap-2.5">
        {#each [
          'Keyboard: Tab to focus, Enter/Space to open file picker',
          'Screen reader: aria-label on input, aria-describedby links errors',
          'Error state: role="alert" announces validation errors immediately',
          'Focus ring: visible brand-colored ring via focus-within',
          'Disabled: native disabled attribute on input + pointer-events-none'
        ] as item (item)}
          <div class="flex items-start gap-2.5 text-sm text-text-neutral-secondary">
            <svg class="size-4 shrink-0 mt-0.5 text-text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </div>
        {/each}
      </div>
    </section>

    <!-- Props -->
    <section class="flex flex-col gap-5">
      <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
      <PropsTable props={uploaderProps} />
    </section>

  </div>
</DocsPage>
