<script lang="ts">
	import Button from '$lib/atoms/Button.svelte';
	import Carousel from '$lib/molecules/Carousel.svelte';
	import Img1 from '$lib/assets/anh-1.jpg?enhanced';
	import Img2 from '$lib/assets/phim-han-quoc-1-1.jpg?enhanced';
	import Img3 from '$lib/assets/phim-han-uoc-hay-1.jpg?enhanced';
</script>

<section class="background-fullpage"></section>
<div class="background-fullpage-holder">
	<section class="container mx-auto">
		<div class="movie-info">
			<h2>Train to Busan 3</h2>
			<div class="star-group">
				<span class="icon-[material-symbols--star-rounded] star-icon"></span>
				<span class="icon-[material-symbols--star-rounded] star-icon"></span>
				<span class="icon-[material-symbols--star-rounded] star-icon"></span>
				<span class="icon-[material-symbols--star-rounded] star-icon"></span>
				<span class="icon-[material-symbols--star-rounded] text-3xl"></span>
			</div>
			<desc>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, quisquam distinctio
				laudantium atque similique illo vitae pariatur excepturi sunt a veniam id incidunt sed
				reiciendis cupiditate blanditiis nobis voluptatum temporibus.
			</desc>
		</div>
		<div class="action-button-group">
			<Button size="lg" type="button" title="Xem phim">
				<span class="icon-[solar--play-bold]"></span>
			</Button>
			<Button size="lg" type="button" title="Xem sau">
				<span class="icon-[mingcute--add-fill]"></span>
			</Button>
		</div>
	</section>

	<section class="mt-8">
		<Carousel images={[Img1, Img2, Img3 , Img1 , Img3 , Img2 , Img1 , Img2 , Img3]} />
	</section>
</div>

<style>
	@reference "tailwindcss";

	.background-fullpage {
		@apply absolute top-0 left-0 z-0 h-screen w-screen object-center brightness-25;
		background-image: url('$lib/assets/traintobusan.jpg');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.background-fullpage-holder {
		@apply py-24 flex flex-col justify-between;
		position: relative;
		height: calc(100vh - 80px);
	}
	.movie-info {
		@apply text-white lg:w-1/2;
		h2 {
			@apply text-5xl font-semibold;
		}
		.star-group {
			@apply my-8 flex gap-2;
		}
		.star-icon {
			@apply text-3xl text-amber-400;
		}
		desc {
			@apply leading-8;
		}
	}
	.action-button-group {
		@apply mt-8 flex gap-4;
	}
</style>
