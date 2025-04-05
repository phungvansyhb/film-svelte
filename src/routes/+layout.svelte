<script lang="ts">
	import HeaderNav from '$lib/molecules/HeaderNav.svelte';
	import SearchModal from '$lib/molecules/SearchModal.svelte';
	import WatchLaterModal from '$lib/molecules/WatchLaterModal.svelte';
	import '../app.css';
	import type { LayoutProps } from './$types';
	
	let { children, data }: LayoutProps = $props();
	let searchModal = $state(false);
</script>

<HeaderNav showSearchModal={() => (searchModal = true)} categories={data.categories.data.items} countries={data.countries.data.items} />
<WatchLaterModal />
<SearchModal isOpen={searchModal} onClose={() => (searchModal = false)} />

{@render children()}
