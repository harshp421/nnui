<script lang="ts">
  let { size = "24", ...props }: { size?: string; [key: string]: any } = $props();
</script>
<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
  <rect x="2" y="3" width="14" height="10" rx="2"></rect>
  <line x1="6" y1="17" x2="12" y2="17"></line>
  <line x1="9" y1="13" x2="9" y2="17"></line>
  <rect x="16" y="8" width="6" height="13" rx="1"></rect>
  <line x1="17.5" y1="18" x2="20.5" y2="18"></line>
</svg>
