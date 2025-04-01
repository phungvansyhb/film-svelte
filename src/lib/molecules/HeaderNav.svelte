<nav class="nav-header">
	<div>LOGO</div>
	<ul class="nav-menu">
		<li>HOME</li>
		<li>TV SHOWS</li>
		<li>HOAT HINH</li>
		<li>PHIM LE</li>
	</ul>
	<div>
		<span class="icon-[ic--outline-search] text-2xl"></span>
	</div>
</nav>

<style>
	@reference "tailwindcss";
	.nav-header {
		@apply flex h-[80px] items-center justify-between px-4;
	}

	.nav-menu {
		@apply flex cursor-pointer gap-6;
		& > li {
			@apply font-semibold transition-colors duration-150;
		}
		& > li:hover {
			@apply text-blue-500;
		}
		
	}
</style>
