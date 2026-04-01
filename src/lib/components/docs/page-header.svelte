<script lang="ts">
  let { title, description } = $props<{
    title: string;
    description?: string;
  }>();
</script>

<div class="flex flex-col gap-3 pb-8 mb-8 border-b border-border-neutral-l4">
  <h1 class="text-4xl font-bold tracking-tight text-text-neutral-primary">
    {title}
  </h1>
  {#if description}
    <p class="text-base leading-relaxed text-text-neutral-secondary">
      {description}
    </p>
  {/if}
</div>
