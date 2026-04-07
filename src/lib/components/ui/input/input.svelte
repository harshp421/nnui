<script lang="ts">
  import type {
    HTMLInputAttributes,
    HTMLInputTypeAttribute,
  } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils/tailwindUtil.js";

  type InputType = Exclude<HTMLInputTypeAttribute, "file">;
  
  type Props = WithElementRef<
    Omit<HTMLInputAttributes, "type"> &
      (
        | { type: "file"; files?: FileList }
        | { type?: InputType; files?: undefined }
      ) & {
        "aria-warning"?: string | boolean;
      }
  >;

  let {
    ref = $bindable(null),
    value = $bindable(),
    type,
    files = $bindable(),
    class: className,
    "data-slot": dataSlot = "input",
    ...restProps
  }: Props = $props();
</script>

{#if type === "file"}
  <input
    bind:this={ref}
    data-slot={dataSlot}
    class={cn(
      "selection:bg-primary-700 dark:bg-input/30 selection:text-primary-foreground border-input ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 pt-1.5 text-sm font-medium outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      "aria-invalid:ring-destructive-800 dark:aria-invalid:ring-destructive-800/40 aria-invalid:border-destructive-800",
      className,
    )}
    type="file"
    bind:files
    bind:value
    {...restProps}
  />
{:else}
  <input
    bind:this={ref}
    data-slot={dataSlot}
    class={cn(
      "h-input-default-height rounded-input-default-radius shadow-xs w-full min-w-0 border p-input-default-padding-all-sides text-base outline-none transition-[color,box-shadow,background-color] md:text-sm glass:backdrop-blur-md",
      "bg-input-box-default-surface border-input-box-default-border text-input-box-default-text placeholder:text-input-box-default-icon",
      "hover:bg-input-box-hover-surface hover:border-input-box-hover-border hover:text-input-box-hover-text hover:placeholder:text-input-box-hover-icon",
      "focus-visible:bg-input-box-active-surface focus-visible:border-input-box-active-border focus-visible:ring-3 focus-visible:ring-surface-brand-primary/50 focus-visible:text-input-box-active-text focus-visible:placeholder:text-input-box-active-icon",
      "disabled:cursor-not-allowed disabled:bg-input-box-disabled-surface disabled:border-input-box-disabled-border disabled:text-input-box-disabled-text disabled:placeholder:text-input-box-disabled-icon",
      "aria-invalid:bg-input-box-destructive-surface aria-invalid:border-input-box-destructive-border aria-invalid:text-input-box-destructive-text aria-invalid:placeholder:text-input-box-destructive-icon aria-invalid:ring-surface-destructive-primary/50 aria-invalid:focus-visible:ring-surface-destructive-primary/40",
      "aria-warning:bg-input-box-warning-surface aria-warning:border-input-box-warning-border aria-warning:text-input-box-warning-text aria-warning:placeholder:text-input-box-warning-icon aria-warning:ring-surface-warning-primary/50 aria-warning:focus-visible:ring-surface-warning-primary/40",
      className,
    )}
    {type}
    bind:value
    {...restProps}
  />
{/if}
