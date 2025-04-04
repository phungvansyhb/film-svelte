<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumbs from '$lib/atoms/Breadcrumbs.svelte';
	import Pagination from '$lib/atoms/Pagination.svelte';
	import MovieCardItem from '$lib/molecules/MovieCardItem.svelte';

	const props: { data: PageData } = $props();
	const { data } = props.data.movies;
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
		<h1 class="mt-6 mb-6 text-3xl font-bold text-white">{data.titlePage}</h1>

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
