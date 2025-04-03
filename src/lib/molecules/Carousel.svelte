<script lang="ts">
	import Image from '$lib/atoms/CdnImage.svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import type { MovieLatestList } from '$lib/typeDefs/MovieLatest.type';

	type CarouselProps = {
		movies: MovieLatestList['items'];
		className?: string;
		activeMovie: MovieLatestList['items'][number];
	};

	let { movies, className, activeMovie = $bindable() }: CarouselProps = $props();

	let options = { loop: true };
	let plugins = [Autoplay()];

	function handleSetActiveSlide(movie: MovieLatestList['items'][number]) {
		activeMovie = movie;
	}
</script>

<div class="embla" use:emblaCarouselSvelte={{ options, plugins }}>
	<div class={['embla__container', className]}>
		{#each movies as movie (movie._id)}
			<div
				class={['embla__slide']}
				onclick={() => handleSetActiveSlide(movie)}
				role="button"
				tabindex="0"
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						handleSetActiveSlide(movie);
					}
				}}
			>
				<Image
					layout="fullWidth"
					src={movie.thumb_url}
					alt=""
					class={`{w-full mb-4 cursor-pointer rounded-lg object-cover transition-all duration-150 
					${movie._id === activeMovie._id ? 'h-[340px] shadow-2xl brightness-125 backdrop-blur-3xl' : 'h-[240px] brightness-75'}  }`}
				/>
				<span class="cursor-pointer">{movie.name}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	@reference "tailwindcss"

	.embla {
		overflow: hidden;
	}
	.embla__container {
		@apply flex items-end px-4;
	}
	.embla__slide {
		@apply mr-8 min-w-0 overflow-hidden brightness-75;
		flex: 0 0 160px;
		span {
			@apply line-clamp-2 h-12 font-semibold text-white;
		}
		/* &:focus {
			@apply outline outline-offset-8 outline-teal-500 brightness-100;
		} */
	}
	@media (max-width: 768px) {
		.embla__slide {
			flex: 0 0 160px; /* Breakpoint SM slide covers 50% of the viewport */
		}
	}
</style>
