<svelte:head>
	<title>Dance Games at Berkeley</title>
	<meta name="description" content="awa" />
</svelte:head>

<script lang="ts">
	import { base } from "$app/paths";
</script>

<section class="splash" style={`background: linear-gradient(var(--darken-value), var(--darken-value)),url("${base}/splash-bg.webp");`}>
	<div class="splash-text">
	<h1 class="title">Dance Games at Berkeley</h1>
	<a class="discord-link" href="https://discord.gg/DzhkQasw3C"
		>Join our Discord server!</a
	>
	</div>
</section>
<section class="content">
	<article id="about">
	<h1>About Us</h1>
	<p>
		Dance Games at Berkeley exists to foster a community around and
		through arcade style dance games like Dance Dance Revolution, Pump It
		Up, and In the Groove. The club also manages and maintains the Dance
		Dance Revolution machine here at Berkeley. The club and machine are
		open to all people at all levels of skill and experience.
	</p>
	</article>
	<hr />
	<article id="queueing">
	<h1>Queueing</h1>
	<p>
		We use a queue on the left side of the machine to decide whose turn it
		is to play on the machine. Each row on the queue will take ~10
		minutes.
	</p>
	<h2>Using the queue:</h2>
	<ol>
		<li>
		Write your name on an empty magnetic card using the dry-erase
		marker. <b>Use one card per player.</b>
		</li>
		<li>
		Place the card at the <b>bottom</b> of the queue, two players per
		row.* If you are playing by yourself, you are encouraged to join the
		queue next to another single player (with their permission).
		</li>
		<li>
		Once your name is at the top and your name is called, it is your
		turn to play. Each row of the queue is allowed to play
		<b>a set of 3 songs</b> shorter than 3:00 each.**
		</li>
		<li>
		After your set, <b>call out the name of the next players</b> on the
		queue (if they aren't already getting ready to play).
		</li>
		<li>
		If you want to play again, move your tag back to the bottom of the
		queue. If you are finished playing, erase your name and return it to
		the right of the queue where the empty tags go.
		</li>
	</ol>
	<p class="footnote">
		<em
		>*Groups of three will sometimes split their set's three songs among
		themselves (each person playing twice). This is totally fine as it
		helps the queue move faster!</em
		><br />
		<em
		>**If a song longer than 3:00 is selected it counts as 2 of the 3
		songs in the set, and if a song longer than 6:00 is selected it
		counts as all 3.</em
		>
	</p>
	</article>
	<hr />
	<article id="rules">
	<h1>Rules</h1>
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
	<ol>
		<li>
		Respect the equipment
		<ul>
			<li>
			Be gentle with the pads. They are modified to be extra-sensitive
			so aggressive stomping isn't necessary.
			</li>
			<li>Keep your items off of the machine when not playing.</li>
			<li>
			Do not place open-lid drinks or food on or near the machine.
			</li>
			<li>Do not go behind or open the back of the cabinet.</li>
			<li>
			Do not steal equipment from around the machine (markers, fans,
			etc).
			</li>
		</ul>
		</li>
		<li>
		Respect the space
		<ul>
			<li>
			Follow the direction and rules put in place by Eshleman hall
			staff. The cabinet is in their building and all of their rules
			still apply.
			</li>
			<li>Clean up after yourself.</li>
			<li>
			Keep noise levels to a reasonable level. Excessive noise can be
			disruptive to players and other people who we share the space
			with.
			</li>
			<li>
			Stay a few feet away from the machine when you are not playing.
			</li>
		</ul>
		</li>
		<li>
		Respect each other
		<ul>
			<li>
			<b
				>Our community has zero-tolerance for bigotry or hate of any
				kind.</b
			>
			If you ever feel unwelcome, let Eshleman hall staff or any club
			officer know and we'll address it accordingly.
			</li>
			<li>
			Be <b>kind, helpful, and welcoming</b> to veterans and newcomers
			alike.
			</li>
			<li>
			Use and respect the queue. It can get long, but it's only fair
			if everyone waits their turn.
			</li>
			<li>
			Do not manipulate or game the queue in a way that is unfair to
			others.
			</li>
			<li>
			Do not play songs longer than 10 minutes without the consent of
			everyone else in the queue.
			</li>
			<li>
			If the queue is long (4+ rows), play with someone else if
			possible.
			</li>
			<li>
			If you're confused, ask questions! Our Discord server is open to
			everyone, and our community is more than happy to answer any
			questions you may have.
			</li>
		</ul>
		</li>
		<li>
		Use common sense and understand that this list of rules is not
		exhaustive for actions that aren't welcome in our community.
		</li>
	</ol>
	<p>
		Consequences for rule violations depend on the severity of misconduct.
		They can range from a verbal/written warning to a report to the Center
		for Student Conduct.
	</p>
	</article>
	<article id="contact">
	<h1>Contact Us</h1>
	<p>
		For any questions, comments, or concerns, please send an email to
		<a href="mailto:dancegamesatberkeley@gmail.com"
		>dancegamesatberkeley@gmail.com</a
		>
		or fill out our (optionally anonymous)
		<a href="https://forms.gle/2Ftwpza7MDSwVZ4TA">feedback form</a>.
	</p>
	</article>
</section>
<hr />