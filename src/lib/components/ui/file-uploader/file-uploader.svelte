<script lang="ts" module>
  interface FileUploaderProps {
    maxFileSize?: number;
    acceptedFileTypes?: string[];
    maxFilesToUpload?: number;
    disable?: boolean;
    onFilesChange?: (files: File[]) => void;
  }
</script>

<script lang="ts">
  import IconUpload from "$lib/icons/icon-upload.svelte";
  import { cn } from "$lib/utils/tailwindUtil";

  let {
    maxFileSize = 10 * 1024 * 1024, // 10 MB
    acceptedFileTypes = [".csv", ".pdf", ".xlsx"],
    maxFilesToUpload = 1,
    disable = false,
    onFilesChange = () => {},
  }: FileUploaderProps = $props();

  let dragOver = $state(false);
  let errorMessage = $state<string | null>(null);
  let fileInput = $state<HTMLInputElement | null>(null);

  const inputId = `file-upload-${Math.random().toString(36).slice(2, 9)}`;
  const errorId = `${inputId}-error`;

  function processFile(files: FileList) {
    if (files.length > maxFilesToUpload) {
      errorMessage = `You can upload a maximum of ${maxFilesToUpload} file(s).`;
      return;
    }
    const filesArray: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > maxFileSize) {
        errorMessage = `File ${file.name} exceeds the maximum size of ${
          maxFileSize / (1024 * 1024)
        } MB.`;
        return;
      }
      if (
        !acceptedFileTypes.some((type) =>
          file.name.toLowerCase().endsWith(type.toLowerCase()),
        )
      ) {
        errorMessage = `File ${file.name} is not an accepted format. Supported formats: ${acceptedFileTypes.join(
          ", ",
        )}.`;
        return;
      }
      filesArray.push(file);
    }
    errorMessage = null;
    onFilesChange(filesArray);
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      processFile(input.files);
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    dragOver = true;
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault();
    dragOver = false;
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    dragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      processFile(files);
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fileInput?.click();
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={cn(
    "group relative flex cursor-pointer select-none flex-col items-center justify-center rounded-input-drag-drop-box-radius border-2 border-dashed p-input-drag-drop-box-padding-all-sides transition-all duration-200 ease-in-out outline-none glass:backdrop-blur-md",
    dragOver
      ? "bg-darg-drop-box-active-surface border-darg-drop-box-active-border"
      : "bg-darg-drop-box-default-surface border-darg-drop-box-default-border",
    "hover:bg-darg-drop-box-active-surface hover:border-darg-drop-box-active-border",
    "focus-within:border-darg-drop-box-active-border",
    errorMessage && "border-surface-destructive-primary",
    disable && "pointer-events-none opacity-50",
  )}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
>
  <label
    for={inputId}
    class="flex cursor-pointer flex-col items-center gap-input-drag-drop-box-gap"
  >
    <div
      class={cn(
        "rounded-full p-12 transition-colors",
        dragOver
          ? "bg-darg-drop-box-active-icon-surface text-darg-drop-box-active-icon"
          : "bg-darg-drop-box-default-icon-surface text-darg-drop-box-default-icon",
      )}
    >
      <IconUpload size="20" />
    </div>

    <div class="flex flex-col gap-1.5">
      <div
        class={cn(
          "flex gap-1 justify-center text-sm font-medium capitalize transition-colors",
          dragOver
            ? "text-darg-drop-box-active-primary-text"
            : "text-darg-drop-box-default-primary-text",
        )}
      >
        <span>Drag & Drop</span>
        <span>or</span>
        <span
          class={cn(
            "underline underline-offset-2",
            dragOver
              ? "text-darg-drop-box-active-highlight-text"
              : "text-darg-drop-box-default-highlight-text",
          )}>Choose file</span
        >
        <span>to upload</span>
      </div>

      <p
        class={cn(
          "text-xs font-normal text-center transition-colors",
          dragOver
            ? "text-darg-drop-box-active-secondary-text"
            : "text-darg-drop-box-default-secondary-text",
        )}
      >
        <span>Supported formats:</span>
        <span class="uppercase">{acceptedFileTypes.join(", ")}</span>
      </p>

      <p
        class={cn(
          "text-xs font-normal text-center transition-colors",
          dragOver
            ? "text-darg-drop-box-active-secondary-text"
            : "text-darg-drop-box-default-secondary-text",
        )}
      >
        <span>Max file size: {maxFileSize / (1024 * 1024)} MB</span>
        <span>
          • {maxFilesToUpload > 1
            ? `Max ${maxFilesToUpload} files`
            : "Single file"}
        </span>
      </p>

      {#if errorMessage}
        <p
          id={errorId}
          class="mt-2 text-xs font-medium text-surface-destructive-primary"
          role="alert"
        >
          {errorMessage}
        </p>
      {/if}
    </div>
  </label>

  <input
    bind:this={fileInput}
    id={inputId}
    type="file"
    onchange={handleFileChange}
    onkeydown={handleKeydown}
    class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
    accept={acceptedFileTypes.join(",")}
    disabled={disable}
    multiple={maxFilesToUpload > 1}
    aria-label="Upload file"
    aria-describedby={errorMessage ? errorId : undefined}
    aria-invalid={errorMessage ? "true" : undefined}
  />
</div>
