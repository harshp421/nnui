<script lang="ts">
  let { children } = $props();
</script>

<div class="mx-auto max-w-5xl">
  {@render children?.()}
</div>
