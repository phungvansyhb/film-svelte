<script lang="ts">
	import type { PageData } from './$types';
	import CdnImage from '$lib/atoms/CdnImage.svelte';
	import Breadcrumbs from '$lib/atoms/Breadcrumbs.svelte';
	import Pagination from '$lib/atoms/Pagination.svelte';
	import { goto } from '$app/navigation';

	const { data }: { data: PageData } = $props();

	function navigateToMovie(slug: string) {
		goto(`/${slug}`);
	}
</script>

<svelte:head>
	<title>{data.data.seoOnPage.titleHead}</title>
	<meta name="description" content={data.data.seoOnPage.descriptionHead} />
	<meta property="og:type" content={data.data.seoOnPage.og_type} />
	<meta property="og:title" content={data.data.seoOnPage.titleHead} />
	<meta property="og:description" content={data.data.seoOnPage.descriptionHead} />
	<meta property="og:url" content={data.data.seoOnPage.og_url} />
	{#each data.data.seoOnPage.og_image as image}
		<meta property="og:image" content={`${data.data.APP_DOMAIN_CDN_IMAGE}/${image}`} />
	{/each}
</svelte:head>

<section class="background-header"></section>
<main class="main-body">
    <section class="film-list">
        <Breadcrumbs items={data.data.breadCrumb} />
        <h1 class="text-3xl font-bold mb-6 text-white mt-6">{data.data.titlePage}</h1>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {#each data.data.items as film}
                <article 
                    class="film-card bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105"
                  
                >
                    <a 
                        href={`/${film.slug}`}
                        class="w-full text-left block"
                        aria-label={`Xem phim ${film.name}`}
                        tabindex="0"
                    >
                        <div class="relative aspect-[2/3]">
                            <CdnImage 
                                src={`${data.data.APP_DOMAIN_CDN_IMAGE}/${film.thumb_url}`}
                                alt={film.name}
                                class="w-full h-full object-cover"
                                width={300}
                                height={450}
                                loading="lazy"
                            />
                            {#if film.quality}
                                <span class="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                                    {film.quality}
                                </span>
                            {/if}
                        </div>
                        <div class="p-3">
                            <h2 class="text-white font-semibold text-sm line-clamp-2 mb-1">
                                {film.name}
                            </h2>
                            <div class="flex items-center gap-2 text-xs text-gray-400">
                                <span>{film.year}</span>
                                <span>•</span>
                                <span>{film.time}</span>
                            </div>
                            {#if film.episode_current}
                                <p class="text-xs text-gray-400 mt-1">
                                    {film.episode_current}
                                </p>
                            {/if}
                        </div>
                    </a>
                </article>
            {/each}
        </div>
    
        <Pagination 
            currentPage={data.data.params.pagination.currentPage}
            totalItems={data.data.params.pagination.totalItems}
            totalItemsPerPage={data.data.params.pagination.totalItemsPerPage}
            pageRanges={data.data.params.pagination.pageRanges}
        />
    </section>
</main>


<style>
	@reference "tailwindcss";
	
	.background-header {
		@apply absolute inset-0 h-[80px] object-center  bg-gray-900 ;
		transition: opacity 1s ease-in-out;
	}
	.main-body {
		@apply  px-4 py-8 bg-gray-900;
	}
    .film-list{
        @apply container mx-auto ;
    }
	.film-card {
		@apply cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500;
	}
	.film-card a:focus {
		@apply outline-none ring-2 ring-teal-500 ring-offset-2 ring-offset-gray-900;
	}
</style>
