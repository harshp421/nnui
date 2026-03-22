<script lang="ts">
  import CodeBlock from "./code-block.svelte";

  let { name, path } = $props<{
    name: string;
    path: string;
  }>();
</script>

<div class="space-y-4">
  <h2 class="text-xl font-bold tracking-tight">Component Source</h2>
  <p class="py-2 text-text-neutral-secondary">
    View the source code for the <code
      class="relative rounded bg-surface-neutral-l2 dark:bg-surface-neutral-l2 px-[0.3rem] py-[0.2rem] font-mono text-sm"
      >{name}</code
    > component.
  </p>
  <CodeBlock code={path} language="bash" />
</div>
