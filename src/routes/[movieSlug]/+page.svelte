<script lang="ts">
	import Breadcrumbs from '$lib/atoms/Breadcrumbs.svelte';
	import MovieEpisode from '$lib/organism/movieDetail/MovieEpisode.svelte';
	import MovieInfo from '$lib/organism/movieDetail/MovieInfo.svelte';
	import MoviePlay from '$lib/organism/movieDetail/MoviePlay.svelte';
	import type { PageData } from './$types';
	import type { Episode } from '$lib/typeDefs/MovieDetailContext.type';
	import type { MovieDetail } from '$lib/typeDefs/MovieDetail.type';

	const { data }: { data: MovieDetail } = $props();

	let currentServer = $state(
		data.data.item.episodes && data.data.item.episodes.length > 0
			? data.data.item.episodes[0].server_name
			: null
	);
	let currentEpisode = $state(
		data.data.item.episodes && data.data.item.episodes.length > 0
			? data.data.item.episodes[0].server_data[0]
			: null
	);



	function playEpisode(episode: Episode) {
		currentEpisode = episode;
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
		<meta property="og:image" content={`https://img.ophim.live/uploads/movies/${image}`} />
	{/each}

	{#if data.data.seoOnPage.updated_time}
		<meta
			property="article:modified_time"
			content={new Date(data.data.seoOnPage.updated_time).toISOString()}
		/>
	{/if}

	{#if data.data.seoOnPage.seoSchema}
		<script type="application/ld+json">
			{JSON.stringify(data.data.seoOnPage.seoSchema)}
		</script>
	{/if}
</svelte:head>

<section class="background-header"></section>
<main class="main-body">
	<div class="container mx-auto">
		<Breadcrumbs items={data.data.breadCrumb} />
		<div class="movie-detail mt-6">
			<MoviePlay
				movieName={data.data.item.name}
				{currentEpisode}
				poster={`https://img.ophim.live/uploads/movies/${data.data.item.poster_url}`}
			/>
			<MovieEpisode data={data.data.item.episodes} {currentEpisode} {currentServer} {playEpisode} />
			<MovieInfo data={data.data.item} />
		</div>
	</div>
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
</style>
