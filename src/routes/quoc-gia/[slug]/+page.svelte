<script lang="ts">
	import type { PageData } from './$types';
	import CdnImage from '$lib/atoms/CdnImage.svelte';
	import Breadcrumbs from '$lib/atoms/Breadcrumbs.svelte';
	import Pagination from '$lib/atoms/Pagination.svelte';
	import { goto } from '$app/navigation';

	const props: { data: PageData } = $props();
	const { data } = props.data.movies;

	console.log('data props', data);
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
				<article
					class="film-card overflow-hidden rounded-lg bg-gray-800 transition-transform hover:scale-105"
				>
					<a
						href={`/${film.slug}`}
						class="block w-full text-left"
						aria-label={`Xem phim ${film.name}`}
						tabindex="0"
					>
						<div class="relative aspect-[2/3]">
							<CdnImage
								src={`${data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${film.thumb_url}`}
								alt={film.name}
								class="h-full w-full object-cover"
								width={300}
								height={450}
								loading="lazy"
							/>
							{#if film.quality}
								<span
									class="absolute top-2 right-2 rounded bg-red-600 px-2 py-1 text-xs text-white"
								>
									{film.quality}
								</span>
							{/if}
						</div>
						<div class="p-3">
							<h2 class="mb-1 line-clamp-2 text-sm font-semibold text-white">
								{film.name}
							</h2>
							<div class="flex items-center gap-2 text-xs text-gray-400">
								<span>{film.year}</span>
								<span>•</span>
								<span>{film.time}</span>
							</div>
							{#if film.episode_current}
								<p class="mt-1 text-xs text-gray-400">
									{film.episode_current}
								</p>
							{/if}
						</div>
					</a>
				</article>
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
	.film-card {
		@apply cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none;
	}
	.film-card a:focus {
		@apply ring-2 ring-teal-500 ring-offset-2 ring-offset-gray-900 outline-none;
	}
</style>
