<script lang="ts">
	import HeaderNav from '$lib/molecules/HeaderNav.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<HeaderNav/>
{@render children()}
