<script lang="ts">
	import HeaderNav from '$lib/molecules/HeaderNav.svelte';
	import '../app.css';
	import type { LayoutProps } from './$types';
	
	let { children, data }: LayoutProps = $props();
</script>

<HeaderNav categories={data.categories.data.items} countries={data.countries.data.items} />
{@render children()}
