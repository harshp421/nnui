<script lang="ts">
  let { title, description } = $props<{
    title: string;
    description?: string;
  }>();
</script>

<div class="space-y-2 flex flex-col gap-6 mb-10">
  <h1 class="text-4xl font-semibold tracking-normal text-text-neutral-primary">
    {title}
  </h1>
  {#if description}
    <p class="text-md text-text-neutral-secondary">
      {description}
    </p>
  {/if}
</div>
