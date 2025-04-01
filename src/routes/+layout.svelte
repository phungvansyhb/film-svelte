<script lang="ts">
	import '../app.css';
	import HeaderNav from '$lib/molecules/HeaderNav.svelte';

	let { children } = $props();
</script>

<HeaderNav/>
{@render children()}
