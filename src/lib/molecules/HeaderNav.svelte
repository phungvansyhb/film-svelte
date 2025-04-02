<script lang="ts">
	import Image from '$lib/atoms/Image.svelte';
	import Logo from '$lib/assets/logo-removebg-6.png?enhanced';
	import type { CountryItem } from '$lib/typeDefs/Country.type';
	import type { CategoryItem } from '$lib/typeDefs/Category.type';
	import { bookmarkStore, initialBookmarks } from '$lib/stores/bookmarkStore';

	let bookmarks = $state(initialBookmarks);

	$effect(() => {
		bookmarkStore.subscribe((value) => {
			bookmarks = value;
		});
	});

	let selectedItem = $state(0);

	function setSelectedItem(id: number) {
		selectedItem = id;
	}

	type HeaderDataProps = {
		countries: CountryItem[];
		categories: CategoryItem[];
	};

	const { countries, categories }: HeaderDataProps = $props();
</script>

<nav class="nav-header">
	<Image src={Logo} alt="Logo" className="h-[80px] w-auto cursor-pointer" />
	<ul class="nav-menu">
		<li><span>Home<span></span></span></li>
		<li onmouseenter={() => setSelectedItem(1)} onmouseleave={() => setSelectedItem(0)}>
			<dt>Thể loại</dt>
			<div class={['nav-menu-item-dropdown', selectedItem === 1 ? 'grid' : '!hidden']}>
				{#each categories as category (category._id)}
					<dl>{category.name}</dl>
				{/each}
			</div>
		</li>
		<li onmouseenter={() => setSelectedItem(2)} onmouseleave={() => setSelectedItem(0)}>
			<dt>Quốc gia</dt>
			<div class={['nav-menu-item-dropdown', selectedItem === 2 ? 'flex' : '!hidden']}>
				{#each countries as country (country._id)}
					<dl>{country.name}</dl>
				{/each}
			</div>
		</li>
		<li onmouseenter={() => setSelectedItem(3)} onmouseleave={() => setSelectedItem(0)}>
			<dt>Danh sách</dt>
			<div class={['nav-menu-item-dropdown', selectedItem === 3 ? 'flex' : '!hidden']}>
				<dl>Phim lẻ</dl>
				<dl>Phim bộ</dl>
				<dl>Phim hoạt hình</dl>
				<dl>TV show</dl>
			</div>
		</li>
	</ul>
	<div class="icons-group">
		<span class="icon-[ic--outline-search]" role="button" aria-label="Tìm kiếm phim"></span>
		<span
			class="icon-[material-symbols--bookmark]"
			role="button"
			aria-label="Danh sách xem sau"
			onclick={() => bookmarkStore.toggleWatchList()}
			tabindex="0"
			onkeydown={() => bookmarkStore.toggleWatchList()}
		></span>
	</div>
</nav>

<style>
	@reference "tailwindcss";
	.nav-header {
		@apply relative z-10 container mx-auto flex h-[80px] items-center justify-between;
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.15); */
	}

	.nav-menu {
		@apply flex h-full cursor-pointer text-white;
		& > li {
			@apply h-full px-6 font-semibold transition-colors duration-150;
			& > span,
			dt {
				line-height: 80px;
			}
		}
		& > li:hover {
			background-color: rgba(0, 0, 0, 0.75);
			span,
			dt {
				@apply scale-105 text-teal-500;
			}
		}
	}
	.nav-menu-item-dropdown {
		@apply absolute top-20 left-0 flex w-full flex-wrap gap-6 rounded-b-lg px-6 py-6 shadow-xl;
		background-color: rgba(0, 0, 0, 0.9);
		& > dl {
			width: 140px;
		}
		& > dl:hover {
			@apply text-teal-500;
		}
	}

	.icons-group {
		@apply flex gap-4;
		span {
			@apply cursor-pointer text-2xl text-white;
		}
	}
</style>
