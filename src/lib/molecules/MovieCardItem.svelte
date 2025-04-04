<script lang="ts">
	import type { MovieListItem } from '$lib/typeDefs/MovieList.type';
	import CdnImage from '$lib/atoms/CdnImage.svelte';
	import MovieTooltip from '$lib/molecules/MovieTooltip.svelte';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/animations/scale.css';
	import { mount } from 'svelte';

	const props: { film: MovieListItem; cdnUrl: string } = $props();
	const { film, cdnUrl } = props;

	$effect(() => {
		const card = document.querySelector(`#film-card-${film.slug}`);
		if (!card) return;

		const tooltipContent = document.createElement('div');
		mount(MovieTooltip, {
			target: tooltipContent,
			props: {
				movie: film,
				cdnUrl
			}
		});

		tippy(card, {
			content: tooltipContent,
			allowHTML: true,
			interactive: true,
			placement: 'auto',
			delay: [200, 0],
			arrow: true,
			theme: 'custom',
			animation: 'scale',
			appendTo: () => document.body
		});
	});
</script>

<article
	id="film-card-{film.slug}"
	class="film-card rounded-lg bg-gray-800 transition-transform hover:brightness-50"
>
	<a
		href={`/${film.slug}`}
		class="block w-full text-left"
		aria-label={`Xem phim ${film.name}`}
		tabindex="0"
	>
		<div class="relative aspect-[2/3]">
			<CdnImage
				src={`${cdnUrl}/uploads/movies/${film.poster_url}`}
				alt={film.name}
				class="h-full w-full object-cover"
				width={300}
				height={450}
				loading="lazy"
			/>
			{#if film.quality}
				<span class="absolute top-2 right-2 rounded bg-red-600 px-2 py-1 text-xs text-white">
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

<style>
	@reference "tailwindcss";

	.film-card {
		@apply cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none;
	}
	.film-card a:focus {
		@apply ring-2 ring-teal-500 ring-offset-2 ring-offset-gray-900 outline-none;
	}

	:global(.tippy-box[data-theme~='custom']) {
		@apply border-none bg-transparent shadow-none;
	}

	:global(.tippy-box[data-theme~='custom'] .tippy-arrow) {
		@apply text-gray-800;
	}
</style>
