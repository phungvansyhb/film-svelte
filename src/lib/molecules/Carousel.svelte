<script lang="ts">
	import Image from '$lib/atoms/Image.svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';

	type CarouselProps = {
		images: any[];
		className?: string;
	};

	const { images, className }: CarouselProps = $props();

	let emblaApi;
	let options = { loop: true };
	let plugins = [Autoplay()];

	let activeSlide = $state(0);

	function onInit(event: any) {
		emblaApi = event.detail;
		emblaApi.on(
			'slidesInView',
			(emblaInstance: any) => {
                console.log(emblaInstance.slidesInView())
                activeSlide = emblaInstance.slidesInView()[3]
            }
		);
	}
</script>

<div class="embla" use:emblaCarouselSvelte={{ options, plugins }} onemblaInit={onInit}>
	<div class={['embla__container', className]}>
		{#each images as image, index (index)}
			<div class={['embla__slide']}>
				<Image
					src={image}
					alt=""
					className={`w-full cursor-pointer object-cover mb-4 rounded-lg transition-transform duration-75 ${index === activeSlide ? 'h-[320px] shadow-2xl' : 'h-[240px] brightness-50'}`}
				/>
				<span>Khi cuộc đời cho bạn quả quýt</span>
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
		@apply mr-8 min-w-0 overflow-hidden brightness-75 ;
		flex: 0 0 18%;
		span {
			@apply line-clamp-2 text-center font-semibold text-white;
		}
	}
	@media (max-width: 768px) {
		.embla__slide {
			flex: 0 0 50%; /* Breakpoint SM slide covers 50% of the viewport */
		}
	}
</style>
