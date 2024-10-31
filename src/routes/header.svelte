<header class="navbar">
    <div class="navbar-container">
        <a class="logo" href='/'>DG@B</a>
        <a href='/songlist'>Song List</a>
    </div>
</header>

<style>
	header {
		height: 50px;
		background-color: var(--navbar-color);
		position: sticky;
		top: 0;
	
		display: flex;
		justify-content: center;
	}

    .navbar-container {
		width: var(--content-width);
	
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: left;
	}

    .navbar-container > a {
		margin: 10px;
		text-decoration: none;
		color: black;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
