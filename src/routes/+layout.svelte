<script lang="ts">
	import './layout.css';
	import logo from '$lib/assets/logo.svg';
	import { Toaster } from '$lib/components/ui/toast';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={logo} /></svelte:head>
{@render children()}
<Toaster position="top-right" mode="inline" />
