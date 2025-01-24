<script>
	import "bootstrap-icons/font/bootstrap-icons.css";
	import Header from "./header.svelte";
	import Footer from "./footer.svelte";
	import "../app.css";
</script>

<div class="flex flex-col">
	<Header />

	<div
		class="flex flex-1 flex-col w-screen mx-0 mx-auto bg-darknavy text-white leading-loose z-0"
	>
		<slot />
	</div>

	<Footer />
</div>
