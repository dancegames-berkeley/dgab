<script>
	import { onMount } from "svelte";

	function setFooterHeight() {
		const footer = document.getElementById("footer");
		if (footer) {
			const footerHeight = footer.offsetHeight;
			document.documentElement.style.setProperty(
				"--footer-height",
				`${footerHeight}px`,
			);
		}
	}

	onMount(() => {
		setFooterHeight();

		// Update the footer height on window resize
		window.addEventListener("resize", setFooterHeight);

		return () => {
			window.removeEventListener("resize", setFooterHeight);
		};
	});
</script>

<div id="footer" class="w-screen bg-black p-4 text-white">
	<div
		class="flex flex-col-reverse md:flex-row sm:11/12 md:10/12 max-w-5xl m-auto justify-between items-center"
	>
		<a href="https://www.ocf.berkeley.edu">
			<img
				src="https://www.ocf.berkeley.edu/hosting-logos/ocf-hosted-penguin-dark.svg"
				alt="Hosted by the OCF"
				style="border: 0"
				class="min-h-12 max-h-36"
			/>
		</a>
		<p class="university-disclaimer pl-4">
			We are a student group acting independently of the University of
			California. We take full responsibility for our organization and
			this web site.
		</p>
	</div>
</div>
