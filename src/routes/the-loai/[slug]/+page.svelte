<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumbs from '$lib/atoms/Breadcrumbs.svelte';
	import Pagination from '$lib/atoms/Pagination.svelte';
	import MovieCardItem from '$lib/molecules/MovieCardItem.svelte';

	const props: { data: PageData } = $props();
	const { data } = props.data.movies;

	import qs from 'qs';
	import { goto } from '$app/navigation';

	let sortField = $state('');
	let selectedYear = $state('');

	$effect(() => {
		sortField = (qs.parse(window.location.search.slice(1)).sort_field as string) || '';
		selectedYear = (qs.parse(window.location.search.slice(1)).year as string) || '';
	});

	async function handleSearch() {
		const currentParams = qs.parse(window.location.search.slice(1));
		const newParams = {
			...currentParams,
			sort_field: sortField || undefined,
			year: selectedYear || undefined
		};
		const queryString = qs.stringify(newParams, { skipNulls: true });
		const newUrl = new URL(window.location.href);
		newUrl.search = queryString;
		const link = document.createElement('a');
		link.href = newUrl.toString();
		link.click();
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
		<div
			class="mt-6 mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
		>
			<h1 class="text-base font-bold text-white md:text-3xl">{data.titlePage}</h1>
			<div class="flex items-center gap-4">
				<select
					class="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-teal-500 focus:outline-none"
					bind:value={sortField}
					aria-label="Sắp xếp theo"
					tabindex="0"
				>
					<option value="" selected={sortField === ''}>Sắp xếp theo</option>
					<option value="modified.time" selected={sortField === 'modified.time'}>Mới nhất</option>
					<option value="tmdb.vote_average" selected={sortField === 'tmdb.vote_average'}
						>Đánh giá</option
					>
					<option value="view" selected={sortField === 'view'}>Nhiều lượt xem</option>
				</select>
				<select
					class="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-teal-500 focus:outline-none"
					bind:value={selectedYear}
					aria-label="Năm"
					tabindex="0"
				>
					<option value="" selected={selectedYear === ''}>Tất cả năm</option>
					{#each Array.from({ length: 24 }, (_, i) => new Date().getFullYear() - i) as year}
						<option value={year.toString()} selected={selectedYear === year.toString()}
							>{year}</option
						>
					{/each}
				</select>
				<button
					type="button"
					class="cursor-pointer rounded-lg bg-teal-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none md:px-6"
					aria-label="Search"
					onclick={handleSearch}
				>
					<span class=" hidden md:block">Tìm kiếm</span>
					<span class="icon-[ic--round-search] block text-2xl md:hidden"></span>
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
