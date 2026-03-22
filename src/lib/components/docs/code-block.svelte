<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { fade } from "svelte/transition";

  let {
    code,
    language = "html",
    class: className = "",
    title = "",
  } = $props<{
    code: string;
    language?: string;
    class?: string;
    title?: string;
  }>();

  let copied = $state(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<div
  class="relative group text-text-neutral-secondary rounded-lg border border-none bg-surface-neutral-l2 dark:bg-surface-neutral-l2 p-12 text-sm {className}"
>
  <div
    class="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
  >
    <Button onclick={copyToClipboard} variant="tertiary">
      {#if copied}
        <span in:fade>Copied!</span>
      {:else}
        <span in:fade>Copy</span>
      {/if}
    </Button>
  </div>
  <div class="overflow-x-auto p-4">
    <pre><code class="language-{language}">{code}</code></pre>
  </div>
</div>
