<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#0b0f10" />
</svelte:head>

<div class="min-h-screen px-4 py-6 md:px-8">
	<div class="mx-auto flex w-full max-w-6xl flex-col gap-6">
		<header class="animate-boot">
			<div class="dos-window overflow-hidden">
				<div class="dos-titlebar">
					<span>LANDON.WTF / MAINFRAME</span>
					<span class="hidden sm:inline">BSKY: @landon.wtf</span>
				</div>
				<div class="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
					<div class="flex items-center gap-3">
						<span class="dos-led" aria-hidden="true"></span>
						<div class="text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">Online</div>
						<div class="text-lg font-display dos-glow">Landon.wtf</div>
					</div>
					<nav class="flex flex-wrap gap-2">
						<a class="dos-button" href="/">Home</a>
						<a class="dos-button" href="/posts">Posts</a>
						<a class="dos-button" href="/editor">Editor</a>
						<a
							class="dos-button"
							href="https://bsky.app/profile/landon.wtf"
							target="_blank"
							rel="noreferrer"
						>
							Bluesky
						</a>
					</nav>
				</div>
			</div>
		</header>

		<main class="flex flex-1 flex-col gap-6">{@render children()}</main>

		<footer class="dos-window overflow-hidden">
			<div class="dos-titlebar">
				<span>STATUS BAR</span>
				<span class="hidden sm:inline">BUILD: 0.1</span>
			</div>
			<div class="flex flex-col gap-2 p-4 text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)] md:flex-row md:items-center md:justify-between">
				<div>NODE: landon.wtf</div>
				<div>MODE: STATIC / SVELTEKIT</div>
				<div>CHANNEL: PUBLIC</div>
			</div>
		</footer>
	</div>
</div>
