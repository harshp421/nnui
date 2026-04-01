<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Item from "$lib/components/ui/item/index.js";
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
	import { FileUploader } from "$lib/components/ui/file-uploader";

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
        return IconPdf;
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

  function getFileUploaderCode() {
    const maxSizeBytes = maxSize * 1024 * 1024;
    const typesAttr =
      acceptedTypes.length > 0
        ? `\n  acceptedFileTypes={${JSON.stringify(acceptedTypes)}}`
        : "";
    const maxFilesAttr =
      maxFiles !== 1 ? `\n  maxFilesToUpload={${maxFiles}}` : "";
    const maxSizeAttr =
      maxSize !== 10 ? `\n  maxFileSize={${maxSizeBytes}}` : "";
    return `<FileUploader
  onFilesChange={(newFiles: File[]) => (files = [...files, ...newFiles])}${typesAttr}${maxFilesAttr}${maxSizeAttr}\n/>`;
  }

  const installationCode = `import FileUploader from "$lib/components/ui/file-uploader/file-uploader.svelte";`;

  const basicCode = `<script lang="ts">
  import FileUploader from "$lib/components/ui/file-uploader/file-uploader.svelte";

  let files = $state<File[]>([]);
<\/script>

<FileUploader
  onFilesChange={(newFiles: File[]) => (files = [...files, ...newFiles])}
  maxFilesToUpload={3}
  acceptedFileTypes={[".pdf", ".csv", ".xlsx"]}
  maxFileSize={10 * 1024 * 1024}
/>`;

  const uploaderProps = [
    {
      name: "onFilesChange",
      type: "(files: File[]) => void",
      default: "-",
      description:
        "Callback function triggered when files are selected or dropped.",
    },
    {
      name: "maxFilesToUpload",
      type: "number",
      default: "1",
      description: "Maximum number of files allowed for upload.",
    },
    {
      name: "maxFileSize",
      type: "number",
      default: "10485760 (10 MB)",
      description: "Maximum size in bytes for each individual file.",
    },
    {
      name: "acceptedFileTypes",
      type: "string[]",
      default: "[.csv, .pdf, .xlsx]",
      description: "Array of allowed file extensions (e.g., ['.pdf', '.jpg']).",
    },
    {
      name: "disable",
      type: "boolean",
      default: "false",
      description: "Whether the uploader interaction is disabled.",
    },
  ];
</script>

<DocsPage>
  <PageHeader
    title="File Uploader"
    description="A robust drag-and-drop file uploader with validation for file types, sizes, and quantities."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="file-uploader"
        path="src/lib/components/shared/file-uploader/file-uploader.svelte"
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
      <ComponentPreview code={basicCode}>
        {#snippet preview()}
          <div
            class="w-full max-w-xl mx-auto p-6 border rounded-xl bg-card shadow-sm"
          >
            <FileUploader
              onFilesChange={(newFiles: File[]) =>
                console.log("Files changed", newFiles)}
              maxFilesToUpload={3}
              acceptedFileTypes={[".pdf", ".csv", ".xlsx"]}
            />
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
          Configure validation rules and preview the file list UI.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 items-start">
        <div class="space-y-6">
          <div class="p-12 border rounded-xl bg-card shadow-sm space-y-6">
            <FileUploader
              onFilesChange={(newFiles: File[]) => (files = [...files, ...newFiles])}
              maxFilesToUpload={maxFiles}
              acceptedFileTypes={acceptedTypes}
              maxFileSize={maxSize * 1024 * 1024}
            />

            {#if files.length > 0}
              <div class="space-y-3 pt-4 border-t">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold">Files ({files.length})</h3>
                  <Button
                    variant="orphan"
                    size="sm"
                    onclick={() => (files = [])}
                    class="h-8 text-xs font-bold"
                  >
                    Clear
                  </Button>
                </div>
                <div class="grid gap-2">
                  {#each files as file, index}
                    {@const IconComponent = getFileIcon(file.name)}
                    <Item.Root variant="attachment">
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
                          size="icon-lg"
                          onclick={() => handleRemoveFile(index)}
                        >
                          <IconCross />
                        </Button>
                      </Item.Actions>
                    </Item.Root>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
          <CodeBlock
            code={getFileUploaderCode()}
            language="svelte"
            class="text-xs"
          />
        </div>

        <div class="p-6 space-y-8">
          <div class="space-y-3">
            <div class="flex justify-between items-center text-sm font-bold">
              <label for="demo">Max Files</label>
              <span class="font-mono">{maxFiles}</span>
            </div>
            <input
              type="range"
              bind:value={maxFiles}
              min="1"
              max="10"
              class="w-full accent-primary"
            />
          </div>

          <div class="space-y-3">
            <div class="flex justify-between items-center text-sm font-bold">
              <label for="demo">Max Size (MB)</label>
              <span class="font-mono">{maxSize}</span>
            </div>
            <input
              type="range"
              bind:value={maxSize}
              min="1"
              max="50"
              class="w-full accent-primary"
            />
          </div>

          <div class="space-y-4">
            <label for="demo" class="text-sm font-bold">Accepted Types</label>
            <div class="grid grid-cols-3 gap-2">
              {#each fileTypeOptions as option}
                <Button
                  variant={acceptedTypes.includes(option.value)
                    ? "primary"
                    : "tertiary"}
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
    </section>

    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Examples</h2>
        <p class="text-text-neutral-secondary">
          Common patterns for file uploads.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <div
          class="flex flex-col p-6 space-y-16 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">PDF Only</p>
          </div>
          <div class="p-4 p-8">
            <FileUploader
              onFilesChange={() => {}}
              maxFilesToUpload={1}
              acceptedFileTypes={[".pdf"]}
              maxFileSize={5 * 1024 * 1024}
            />
          </div>
        </div>

        <div
          class="flex flex-col p-6 space-y-16 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex items-center p-4 gap-4">
            <p class="font-semibold text-foreground">Multi-Image Gallery</p>
          </div>
          <div class="p-8">
            <FileUploader
              onFilesChange={() => {}}
              maxFilesToUpload={5}
              acceptedFileTypes={[".jpg", ".png"]}
            />
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="py-6 text-2xl font-bold tracking-tight border-b">Props</h2>
      <PropsTable props={uploaderProps} />
    </section>
  </div>
</DocsPage>
