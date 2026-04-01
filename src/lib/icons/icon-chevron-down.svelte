<script lang="ts">
  let { size = "24", ...props }: { size?: string; [key: string]: any } = $props();
</script>
<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
  <polyline points="6 9 12 15 18 9"></polyline>
</svg>
