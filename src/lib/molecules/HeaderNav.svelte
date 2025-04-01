<script lang="ts">
	let selectedItem = $state(0);
	function setSelectedItem(id: number) {
		selectedItem = id;
	}
</script>

<nav class="nav-header">
	<div>LOGO</div>
	<ul class="nav-menu">
		<li><span>Home<span></span></span></li>
		<li onmouseenter={() => setSelectedItem(1)} onmouseleave={() => setSelectedItem(0)}>
			<dt>Thể loại</dt>
			<div class={['nav-menu-item-dropdown', selectedItem === 1 ? 'grid' : '!hidden']}>
				<dl>Kinh dị</dl>
				<dl>Hài hước</dl>
				<dl>Dịch</dl>
				<dl>Tình cảm</dl>
			</div>
		</li>

		<li onmouseenter={() => setSelectedItem(2)} onmouseleave={() => setSelectedItem(0)}>
			<dt>Quốc gia</dt>
			<div class={['nav-menu-item-dropdown', selectedItem === 2 ? 'grid' : '!hidden']}>
				<dl>Trung Quốc</dl>
				<dl>Hàn Quốc</dl>
				<dl>Âu Mỹ</dl>
				<dl>Việt Nam</dl>
			</div>
		</li>
		<li><span>Phim lẻ<span></span></span></li>
	</ul>
	<div>
		<span class="icon-[ic--outline-search] text-2xl text-white" role="button"></span>
	</div>
</nav>

<style>
	@reference "tailwindcss";
	.nav-header {
		@apply sticky z-10 container mx-auto flex h-[80px] items-center justify-between;
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.15); */
	}

	.nav-menu {
		@apply flex h-full cursor-pointer text-white;
		& > li {
			@apply relative h-full px-6 font-semibold transition-colors duration-150;
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
		@apply absolute top-20 left-0 grid w-max grid-cols-3 grid-rows-2 gap-6 rounded-b-lg px-6 py-6 shadow-xl;
		background-color: rgba(0, 0, 0, 0.75);
		& > dl:hover {
			@apply text-teal-500;
		}
	}
</style>
