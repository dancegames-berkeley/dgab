<script lang="ts">
	import { onMount } from "svelte";
	import { drawArrows } from "../lib/drawarrowsbg";

	onMount(() => {
		const canvas = document.getElementById("arrowsbg") as HTMLCanvasElement;
		const section = document.getElementById("content") as HTMLElement;

		drawArrows(canvas, section);

		// redraw on window resize
		const handleResize = () => drawArrows(canvas, section);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});
</script>

<svelte:head>
	<title>Dance Games at Berkeley</title>
	<meta name="description" content="" />
</svelte:head>

<section
	class="bg-cover bg-center bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/splash-bg.webp')] flex flex-col items-center justify-center h-screen"
>
	<div
		class="flex flex-col justify-between items-center h-full w-full relative"
	>
		<div id="splash" class="flex flex-col items-center absolute top-[25%]">
			<div class="text-4xl md:text-6xl m-10 text-white font-bold">
				Dance Games at Berkeley
			</div>
			<a
				class="text-xl md:text-3xl p-4 text-slate-300 bg-darknavy bg-opacity-50
			rounded-lg border-2 border-slate-300
			transition duration-500 hover:text-blue-500 hover:border-blue-500"
				href="https://discord.gg/DzhkQasw3C">Join our Discord server!</a
			>
		</div>
		<div id="more" class="flex items-end absolute bottom-[10%]">
			<a href="#about"><i class="bi bi-chevron-down text-2xl"></i> </a>
		</div>
	</div>
</section>
<section id="content" class="relative w-screen">
	<canvas id="arrowsbg" class="absolute inset-0 w-full z-0"></canvas>
	<section class="flex-col content p-4 z-10 relative">
		<article
			id="about"
			class="flex flex-col-reverse md:flex-row p-4 scroll-mt-14 items-center"
		>
			<div class="hidden p-4 md:block md:w-4/12">
				<img src="mascot.png" alt="DG@B Mascot" />
			</div>
			<div class="w-screen p-4 md:w-8/12 md:pl-8">
				<h1 class="decoration-blue-500">About Us</h1>
				<p class="leading-10">
					Dance Games at Berkeley exists to foster a community around
					and through arcade style dance games like Dance Dance
					Revolution, Pump It Up, and In the Groove. The club also
					manages and maintains the Dance Dance Revolution machine
					here at Berkeley, located at the <a
						href="https://recwell.berkeley.edu/competitive-programs/cal-esports/"
						>Cal Esports Community Center</a
					>. The club and machine are open to all people at all levels
					of skill and experience.
				</p>
			</div>
		</article>
	</section>
	<section id="content" class="relative w-screen bg-navy">
		<section class="flex-col content p-4 z-10 relative">
			<article id="queueing" class="flex flex-row scroll-mt-14">
				<div class="p-4">
					<div class="pb-8">
						<h1 class="decoration-yellow-500">Queuing</h1>
						<p>
							We use a queue on the left side of the machine to
							decide whose turn it is to play on the machine. Each
							row on the queue will take ~10 minutes.
						</p>
					</div>
					<ol class="pl-8 list-decimal">
						<li>
							Write your name on an empty magnetic card using the
							dry-erase marker. <b>Use one card per player.</b>
						</li>
						<li>
							Place the card at the <b>bottom</b> of the queue, two
							players per row. If you are playing by yourself, you
							are encouraged to join the queue next to another single
							player (with their permission).
						</li>
						<li>
							Once your name is at the top and your name is
							called, it is your turn to play. Each row of the
							queue is allowed to play
							<b>a set of 3 songs</b> shorter than 3:00 each.<span
								class="text-blue-500">*</span
							>
						</li>
						<li>
							After your set, <b
								>call out the name of the next players</b
							>
							on the queue (if they aren't already getting ready to
							play).
						</li>
						<li>
							If you want to play again, move your tag back to the
							bottom of the queue. If you are finished playing,
							erase your name and return it to the right of the
							queue where the empty tags go.
						</li>
					</ol>
					<p class="leading-2">
						<span class="text-blue-500">*</span>
						<span class="text-sm text-slate-400">
							<em
								>Songs longer than 3:00 count as 2 of the 3
								songs in the set, and if a song longer than 6:00
								is selected it counts as all 3.</em
							>
						</span>
					</p>
				</div>
			</article>

			<article id="rules" class="flex flex-row scroll-mt-14">
				<div class="p-4">
					<h1 class="decoration-yellow-500">Rules</h1>
					<p>
						Read our community's
						<b
							><a
								href="https://docs.google.com/document/d/1S90_aYp6rs6yV8LMyKn2e1Rt7tTXEn1AuMhNcs868tY/"
								>Code of Conduct</a
							></b
						>
						for a more comprehensive set of rules.
					</p>
					<ol class="p-8 list-decimal leading-10">
						<li class="heading">
							Respect the equipment

							<ul>
								<li>
									Be gentle with the pads, aggressive stomping
									is not necessary. Do not tamper with the
									internals of the machine.
								</li>
							</ul>
						</li>
						<li class="heading">
							Respect the space

							<ul>
								<li>
									Keep the area around the machine clean, and
									noise levels reasonable. Respect the rules
									of the Esports Center, including <b
										>no food or drinks (except water)</b
									> in the building.
								</li>
							</ul>
						</li>
						<li class="heading">
							Respect each other

							<ul>
								<li>
									<b
										>Our community has zero-tolerance for
										bigotry or hate of any kind.</b
									>
									If you ever feel unwelcome, let Esports Center
									staff or any club officer know and we'll address
									it accordingly.
								</li>
							</ul>
						</li>
					</ol>
					<p>
						If you're confused, ask questions! Our Discord server is
						open to everyone, and our community is more than happy
						to answer any questions you may have.
					</p>
				</div>
			</article>
			<article id="contact" class="flex flex-row scroll-mt-14">
				<div class="p-4">
					<h1 class="decoration-yellow-500">Contact Us</h1>
					<p>
						For any questions, comments, or concerns, please send an
						email to
						<a href="mailto:dancegamesatberkeley@gmail.com"
							>dancegamesatberkeley@gmail.com</a
						>
						or fill out our (optionally anonymous)
						<a href="https://forms.gle/2Ftwpza7MDSwVZ4TA"
							>feedback form</a
						>.
					</p>
				</div>
			</article>
		</section>
	</section>
</section>
