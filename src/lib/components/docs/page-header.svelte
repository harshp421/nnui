<script lang="ts">
  let { title, description } = $props<{
    title: string;
    description?: string;
  }>();
</script>

<div class="flex flex-col gap-16 py-24 mb-8 border-b border-border-neutral-l4">
  <h1 class="type-display-md  text-text-neutral-primary">
    {title}
  </h1>
  {#if description}
    <p class="type-body-lg text-text-neutral-secondary">
      {description}
    </p>
  {/if}
</div>
