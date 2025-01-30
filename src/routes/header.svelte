<script>
	import { onMount } from "svelte";

	function setHeaderHeight() {
		const header = document.getElementById("header");
		if (header) {
			const headerHeight = header.offsetHeight;
			document.documentElement.style.setProperty(
				"--header-height",
				`${headerHeight}px`,
			);
		}
	}

	onMount(() => {
		setHeaderHeight();

		// Update the header height on window resize
		window.addEventListener("resize", setHeaderHeight);

		return () => {
			window.removeEventListener("resize", setHeaderHeight);
		};
	});

	// handle mobile menu
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<div id="header" class="flex bg-lightnavy text-white sticky top-0 z-10">
	<div class="flex justify-between h-full w-full sm:w-screen">
		<a href="/"
			><img
				src="/logo.png"
				class="h-14 object-contain p-3"
				alt="Dance Games at Berkeley"
			/></a
		>
		<div
			class="hidden md:flex md:items-center md:justify-center ml-auto h-inherit"
		>
			<a class="navlink" href="/#about">About</a>
			<a class="navlink" href="/#queueing">Queueing</a>
			<a class="navlink" href="/#rules">Rules</a>
			<a class="navlink" href="/#contact">Contact</a>
			<a class="navlink" target="_self" href="/songlist">Song List</a>
		</div>
		<button
			on:click={toggleMenu}
			class="p-3 flex items-center justify-center md:hidden ml-auto my-auto h-full"
		>
			<i class="bi bi-list text-2xl"></i>
		</button>
		{#if isMenuOpen}
			<div
				class="md:hidden bg-lightnavy text-white w-full p-4 absolute top-14 bg-darknavy"
			>
				<a class="dropdownlink" href="/#about" on:click={toggleMenu}
					>About</a
				>
				<a class="dropdownlink" href="/#queueing" on:click={toggleMenu}
					>Queueing</a
				>
				<a class="dropdownlink" href="/#rules" on:click={toggleMenu}
					>Rules</a
				>
				<a class="dropdownlink" href="/#contact" on:click={toggleMenu}
					>Contact</a
				>
				<a class="dropdownlink" href="/songlist" on:click={toggleMenu}
					>Song List</a
				>
			</div>
		{/if}
	</div>
</div>
