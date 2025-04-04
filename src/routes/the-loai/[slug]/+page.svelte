<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumbs from '$lib/atoms/Breadcrumbs.svelte';
	import Pagination from '$lib/atoms/Pagination.svelte';
	import MovieCardItem from '$lib/molecules/MovieCardItem.svelte';

	const props: { data: PageData } = $props();
	const { data } = props.data.movies;

	import qs from 'qs';
	import { goto } from '$app/navigation';

	let searchQuery = $state('');
	let selectedYear = $state('');

	function handleSearch() {
		const currentParams = qs.parse(window.location.search.slice(1));
		const newParams = {
			...currentParams,
			keyword: searchQuery || undefined,
			year: selectedYear || undefined
		};
		const queryString = qs.stringify(newParams, { skipNulls: true });
		goto(`${window.location.pathname}${queryString ? `?${queryString}` : ''}`);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}
</script>

<svelte:head>
	<title>{data.seoOnPage.titleHead}</title>
	<meta name="description" content={data.seoOnPage.descriptionHead} />
	<meta property="og:type" content={data.seoOnPage.og_type} />
	<meta property="og:title" content={data.seoOnPage.titleHead} />
	<meta property="og:description" content={data.seoOnPage.descriptionHead} />
	<meta property="og:url" content={data.seoOnPage.og_url} />
	{#each data.seoOnPage.og_image as image}
		<meta property="og:image" content={`${data.APP_DOMAIN_CDN_IMAGE}/${image}`} />
	{/each}
</svelte:head>

<section class="background-header"></section>
<main class="main-body">
	<section class="film-list">
		<Breadcrumbs items={data.breadCrumb} />
		<div class="mt-6 mb-6 flex items-center justify-between">
			<h1 class="text-3xl font-bold text-white">{data.titlePage}</h1>
			<div class="flex items-center gap-4">
				<div class="relative">
					<input
						type="text"
						placeholder="Search movies..."
						class="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-teal-500 focus:outline-none"
						aria-label="Search movies"
						bind:value={searchQuery}
						onkeydown={handleKeyPress}
					/>
					<span
						class="icon-[ic--outline-search] absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
					></span>
				</div>
				<select
					class="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-teal-500 focus:outline-none"
					bind:value={selectedYear}
				>
					<option value="">All Years</option>
					{#each Array.from({ length: 24 }, (_, i) => new Date().getFullYear() - i) as year}
						<option value={year}>{year}</option>
					{/each}
				</select>
				<button
					type="button"
					class="cursor-pointer rounded-lg bg-teal-600 px-6 py-2 text-white transition-colors duration-200 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
					aria-label="Search"
					onclick={handleSearch}
				>
					Search
				</button>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
			{#each data.items as film}
				<MovieCardItem {film} cdnUrl={data.APP_DOMAIN_CDN_IMAGE} />
			{/each}
		</div>

		<Pagination
			currentPage={data.params.pagination.currentPage}
			totalItems={data.params.pagination.totalItems}
			totalItemsPerPage={data.params.pagination.totalItemsPerPage}
			pageRanges={data.params.pagination.pageRanges}
		/>
	</section>
</main>

<style>
	@reference "tailwindcss";
	.background-header {
		@apply absolute inset-0 h-[80px] bg-gray-900 object-center;
		transition: opacity 1s ease-in-out;
	}
	.main-body {
		@apply min-h-screen bg-gray-900 px-4 py-8;
	}
	.film-list {
		@apply container mx-auto;
	}
</style>
