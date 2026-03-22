<script lang="ts">
  let { children } = $props();
</script>

<div class="container max-w-6xl mx-auto px-16 py-18 md:px-8">
  {@render children?.()}
</div>
