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

<div
	id="header"
	class="flex justify-center bg-lightnavy text-white sticky top-0 z-10"
>
	<div class="flex align-center sm:w-screen h-14">
		<div class="p-3 h-full md:w-14 flex justify-start">
			<a href="/"
				><img
					src="/logo.png"
					class="h-full object-contain"
					alt="Dance Games at Berkeley"
				/></a
			>
		</div>
		<div class="hidden md:flex ml-auto my-auto h-full">
			<a class="navlink" href="/#about">About</a>
			<a class="navlink" href="/#queueing">Queueing</a>
			<a class="navlink" href="/#rules">Rules</a>
			<a class="navlink" href="/#contact">Contact</a>
			<a class="navlink" href="/songlist">Song List</a>
		</div>
		<div class="block md:hidden ml-auto my-auto flex h-full justify-end">
			<button on:click={toggleMenu} class="p-3 flex-auto">
				<i class="bi bi-list text-2xl"></i>
			</button>
		</div>
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
