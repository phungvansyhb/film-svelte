<script lang="ts">
	import CdnImage from '$lib/atoms/CdnImage.svelte';
	import type { MovieListItem } from '$lib/typeDefs/MovieList.type';

	export let movie: MovieListItem;
	export let cdnUrl: string;
</script>

<div class="tooltip-content">
	<div class="poster-section">
		<CdnImage
			src={`${cdnUrl}/uploads/movies/${movie.poster_url}`}
			alt={movie.name}
			class="poster-image"
			width={400}
			height={300}
			loading="lazy"
		/>
	</div>
	<div class="info-section">
		<h3 class="title">{movie.name}</h3>
		<p class="original-title">{movie.origin_name}</p>

		{#if movie.category}
			<div class="categories">
				{#each movie.category as cat}
					<span class="category-tag">{cat.name}</span>
				{/each}
			</div>
		{/if}

		<div class="details-grid">
			<div class="detail-item">
				<span class="label">Năm</span>
				<span class="value">{movie.year}</span>
			</div>
			<div class="detail-item">
				<span class="label">Thời lượng</span>
				<span class="value">{movie.time}</span>
			</div>
			{#if movie.tmdb}
				<div class="detail-item">
					<span class="label">Đánh giá</span>
					<div class="rating">
						<span class="icon-[material-symbols--star-rounded] text-yellow-400"></span>
						<span class="value">{movie.tmdb.vote_average}</span>
						<span class="votes">({movie.tmdb.vote_count})</span>
					</div>
				</div>
			{/if}
			{#if movie.episode_current}
				<div class="detail-item">
					<span class="label">Tập</span>
					<span class="value">{movie.episode_current}</span>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	@reference 'tailwindcss';

	.tooltip-content {
		@apply flex min-w-[300px] flex-col rounded-lg bg-gray-900 p-4 text-white;
	}

	.poster-section {
		@apply mb-4;
	}

	.poster-image {
		@apply h-[400px] w-full rounded-lg object-cover;
	}

	.info-section {
		@apply w-full;
	}

	.title {
		@apply mb-1 text-lg font-bold;
	}

	.original-title {
		@apply mb-2 text-sm text-gray-400;
	}

	.categories {
		@apply mb-3 flex flex-wrap gap-2;
	}

	.category-tag {
		@apply rounded-full bg-teal-500 px-2 py-1 text-xs;
	}

	.details-grid {
		@apply grid grid-cols-2 gap-3;
	}

	.detail-item {
		@apply flex flex-col;
	}

	.label {
		@apply text-xs text-gray-400;
	}

	.value {
		@apply text-sm font-semibold;
	}

	.rating {
		@apply flex items-center gap-1;
	}

	.votes {
		@apply text-xs text-gray-400;
	}
</style>
