<script lang="ts">
	import Button from '$lib/atoms/Button.svelte';
	import Carousel from '$lib/molecules/Carousel.svelte';
	import type { PageData } from './$types';
	import { bookmarkStore, initialBookmarks } from '$lib/stores/bookmarkStore';

	const { data }: { data: PageData } = $props();
	const movies = data.movies.items.map((item) => ({
		...item,
		thumb_url: data.movies.pathImage + item.thumb_url,
		poster_url: data.movies.pathImage + item.poster_url
	}));

	let activeMovie = $state(movies[0]);
	let bookmarks = $state(initialBookmarks);

	$effect(() => {
		bookmarkStore.subscribe((value) => {
			bookmarks = value;
		});
	});

	function isInWatchLater(movieId: string) {
		return bookmarks.watchLater.some((m) => m._id === movieId);
	}

	function toggleWatchLater() {
		if (isInWatchLater(activeMovie._id)) {
			bookmarkStore.removeFromWatchLater(activeMovie._id);
		} else {
			bookmarkStore.addToWatchLater(activeMovie);
		}
	}
</script>

<div class="background-container">
	<section class="background-fullpage" style="--bg-image: url({activeMovie.poster_url})"></section>
	<section class="background-fullpage" style="--bg-image: url({activeMovie.poster_url})"></section>
</div>
<div class="background-fullpage-holder">
	<section class="container mx-auto">
		<div class="movie-info">
			<h2>
				{activeMovie.name}
			</h2>
			<br />
			<desc class="pt-6 text-2xl opacity-75">( {activeMovie.origin_name} )</desc>

			<div class="mt-8 flex items-end gap-2">
				<span class="font-bold">
					{activeMovie.tmdb.vote_average.toPrecision(2)}
				</span>
				<span class="icon-[material-symbols--star-rounded] star-icon"></span>
				<span class="opacity-75">/ {activeMovie.tmdb.vote_count} đánh giá</span>
				<span class="opacity-75">/ {activeMovie.year} </span>
				<button
					class="ml-2 cursor-pointer rounded px-2 hover:bg-gray-900"
					tabindex="0"
					aria-label={isInWatchLater(activeMovie._id) ? 'Đã thích' : '+ Thêm vào xem sau'}
					onclick={toggleWatchLater}
					>{isInWatchLater(activeMovie._id) ? 'Đã thích' : '+ Thêm vào xem sau'}
				</button>
			</div>
		</div>
		<div class="action-button-group">
			<h3 class="text-2xl font-semibold text-white">Xem ngay</h3>
			<a
				href={activeMovie.slug}
				aria-label={activeMovie.slug}
				class="animate-pulse overflow-hidden rounded-full"
			>
				<Button size="lg" type="button" title="Xem phim">
					<span class="icon-[solar--play-bold] text-3xl"></span>
				</Button>
			</a>
		</div>
	</section>

	<section class="mt-8">
		<Carousel {movies} bind:activeMovie />
	</section>
</div>

<style>
	@reference "tailwindcss";

	.background-container {
		@apply absolute top-0 left-0 z-0 h-screen w-screen overflow-hidden;
	}

	.background-fullpage {
		@apply absolute inset-0 object-center brightness-50;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		background-image: var(--bg-image), linear-gradient(to bottom, #1a1a1a, #000000);
		opacity: 0;
		transition: opacity 1s ease-in-out;
	}

	.background-fullpage:first-child {
		opacity: 1;
	}

	.background-fullpage:last-child {
		opacity: 0;
		transition-delay: 0.5s;
	}

	.background-fullpage-holder {
		@apply flex flex-col justify-between py-24;
		position: relative;
		height: calc(100vh - 80px);
	}
	.movie-info {
		@apply leading-8 text-white lg:w-1/2;
		h2 {
			@apply text-5xl font-semibold;
		}
		.star-icon {
			@apply text-3xl text-amber-400;
		}
		desc {
			@apply leading-8;
		}
	}
	.action-button-group {
		@apply mt-8 flex items-center gap-4;
	}
</style>
