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
	let isMobileMenuOpen = $state(false);

	function setSelectedItem(id: number) {
		selectedItem = id;
	}

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
		selectedItem = 0;
	}

	type HeaderDataProps = {
		countries: CountryItem[];
		categories: CategoryItem[];
		showSearchModal: () => void;
	};

	const { countries, categories, showSearchModal }: HeaderDataProps = $props();
</script>

<header class={['scrolled sticky top-0 z-10']}>
	<nav class={['nav-header']}>
		<div class="nav-logo-container">
			<a href="/" onclick={closeMobileMenu} tabindex="0" aria-label="Trang chủ">
				<Image src={Logo} alt="Logo" className="h-[80px] w-auto cursor-pointer" />
			</a>
			<div class="mobile-controls">
				<button
					onclick={showSearchModal}
					class="mobile-icon-button"
					tabindex="0"
					aria-label="Tìm kiếm phim"
				>
					<span class="icon-[ic--outline-search]"></span>
				</button>
				<button
					onclick={() => bookmarkStore.toggleWatchList(true)}
					class="mobile-icon-button"
					tabindex="0"
					aria-label="Danh sách xem sau"
				>
					<span class="icon-[material-symbols--bookmark]" role="button"></span>
				</button>
				<button
					class="mobile-menu-button"
					onclick={toggleMobileMenu}
					aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
					aria-expanded={isMobileMenuOpen}
				>
					<span class="icon-[material-symbols--menu]"></span>
				</button>
			</div>
		</div>

		<div class={['nav-menu-container', isMobileMenuOpen ? 'mobile-menu-open' : '']}>
			<ul class="nav-menu">
				<li>
					<a href="/" onclick={closeMobileMenu} tabindex="0" aria-label="Trang chủ">Home</a>
				</li>
				<li
					onmouseenter={() => setSelectedItem(1)}
					onmouseleave={() => setSelectedItem(0)}
					onfocusin={() => setSelectedItem(1)}
					onfocusout={() => setSelectedItem(0)}
				>
					<dt>
						<a href="/the-loai" onclick={closeMobileMenu} tabindex="0" aria-label="Thể loại"
							>Thể loại</a
						>
					</dt>
					<div class={['nav-menu-item-dropdown', selectedItem === 1 ? 'grid' : '!hidden']}>
						{#each categories as category (category._id)}
							<dl>
								<a
									href={`/the-loai/${category.slug}`}
									data-sveltekit-reload
									onclick={closeMobileMenu}
									tabindex="0"
									aria-label={category.name}>{category.name}</a
								>
							</dl>
						{/each}
					</div>
				</li>
				<li
					onmouseenter={() => setSelectedItem(2)}
					onmouseleave={() => setSelectedItem(0)}
					onfocusin={() => setSelectedItem(2)}
					onfocusout={() => setSelectedItem(0)}
				>
					<dt>
						<a href="/quoc-gia" onclick={closeMobileMenu} tabindex="0" aria-label="Quốc gia"
							>Quốc gia</a
						>
					</dt>
					<div class={['nav-menu-item-dropdown', selectedItem === 2 ? 'flex' : '!hidden']}>
						{#each countries as country (country._id)}
							<dl>
								<a
									href={`/quoc-gia/${country.slug}`}
									data-sveltekit-reload
									onclick={closeMobileMenu}
									tabindex="0"
									aria-label={country.name}>{country.name}</a
								>
							</dl>
						{/each}
					</div>
				</li>
				<li
					onmouseenter={() => setSelectedItem(3)}
					onmouseleave={() => setSelectedItem(0)}
					onfocusin={() => setSelectedItem(3)}
					onfocusout={() => setSelectedItem(0)}
				>
					<dt>
						<a href="danh-sach" onclick={closeMobileMenu} tabindex="0" aria-label="Danh sách">
							Danh sách</a
						>
					</dt>
					<div class={['nav-menu-item-dropdown', selectedItem === 3 ? 'flex' : '!hidden']}>
						<dl>
							<a
								href="/danh-sach/phim-le"
								data-sveltekit-reload
								onclick={closeMobileMenu}
								tabindex="0"
								aria-label="Phim lẻ">Phim lẻ</a
							>
						</dl>
						<dl>
							<a
								href="/danh-sach/phim-bo"
								data-sveltekit-reload
								onclick={closeMobileMenu}
								tabindex="0"
								aria-label="Phim bộ">Phim bộ</a
							>
						</dl>
						<dl>
							<a
								href="/danh-sach/hoat-hinh"
								data-sveltekit-reload
								onclick={closeMobileMenu}
								tabindex="0"
								aria-label="Phim hoạt hình">Phim hoạt hình</a
							>
						</dl>
						<dl>
							<a
								href="/danh-sach/tv-shows"
								data-sveltekit-reload
								onclick={closeMobileMenu}
								tabindex="0"
								aria-label="TV shows">TV show</a
							>
						</dl>
					</div>
				</li>
			</ul>
			<div class="icons-group">
				<button onclick={showSearchModal} tabindex="0" aria-label="Tìm kiếm phim">
					<span class="icon-[ic--outline-search]"></span>
				</button>
				<button
					onclick={() => bookmarkStore.toggleWatchList(true)}
					tabindex="0"
					aria-label="Danh sách xem sau"
				>
					<span class="icon-[material-symbols--bookmark]" role="button"></span>
				</button>
			</div>
		</div>
	</nav>
</header>

<style>
	@reference "tailwindcss";
	.scrolled {
		@apply bg-gray-900/10 shadow-lg backdrop-blur-xs;
	}
	.nav-header {
		@apply relative top-0 z-10 container mx-auto flex h-[80px] items-center justify-between transition-all duration-300;
	}

	.nav-logo-container {
		@apply flex w-full items-center justify-between md:w-auto;
	}

	.mobile-controls {
		@apply flex items-center gap-2 md:hidden;
	}

	.mobile-icon-button {
		@apply rounded-lg p-2 text-2xl text-white hover:bg-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none;
	}

	.mobile-menu-button {
		@apply rounded-lg p-2 text-2xl text-white hover:bg-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none;
	}

	.nav-menu-container {
		@apply hidden flex-1 items-center justify-between md:flex;
	}

	.mobile-menu-open {
		@apply absolute top-[80px] right-0 left-0 flex flex-col border-t border-gray-700 bg-gray-900 shadow-lg;
	}

	.nav-menu {
		@apply flex h-full cursor-pointer flex-col text-white md:flex-row;
		& > li {
			@apply h-full px-6 font-semibold transition-colors duration-150;
			& > a,
			dt {
				@apply block py-4 md:py-0 md:leading-[80px];
			}
		}
		& > li:hover {
			background-color: rgba(0, 0, 0, 0.75);

			dt {
				@apply scale-105 text-teal-500;
			}
		}
	}
	.nav-menu-item-dropdown {
		@apply absolute top-20 left-0 flex w-full flex-wrap gap-6 rounded-b-lg px-6 py-6 shadow-xl md:top-20;
		background-color: rgba(0, 0, 0, 0.9);
		& > dl {
			@apply w-full md:w-[140px];
		}
		& > dl:hover {
			@apply text-teal-500;
		}
	}

	.icons-group {
		@apply flex gap-4 p-4 md:p-0;
		span {
			@apply cursor-pointer text-2xl text-white;
		}
	}

	@media (max-width: 768px) {
		.nav-menu-item-dropdown {
			@apply relative top-0 left-0 w-full rounded-none;
			background-color: rgba(0, 0, 0, 0.95);
		}
	}
</style>
