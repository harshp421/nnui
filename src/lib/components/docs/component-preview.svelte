<script lang="ts">
  import CodeBlock from "./code-block.svelte";

  let { preview, code } = $props<{
    preview: any;
    code: string;
  }>();
</script>

<div class="group relative my-4 flex flex-col space-y-4">
  <div
    class="relative rounded-xl border-none bg-surface-neutral-l2 dark:bg-surface-neutral-l2 p-10 flex min-h-[350px] items-center justify-center"
  >
    <div class="w-full flex justify-center items-center">
      {@render preview()}
    </div>
  </div>
  <CodeBlock {code} />
</div>
