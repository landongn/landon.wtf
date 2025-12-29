<script lang="ts">
	let { data } = $props();

	const posts = data.posts ?? [];

	const formatDate = (value?: string) => {
		if (!value) return '';
		const parsed = new Date(value);
		if (Number.isNaN(parsed.getTime())) return value;
		return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(parsed);
	};
</script>

<svelte:head>
	<title>landon.wtf</title>
	<meta name="description" content="Personal home on the web for landon.wtf." />
</svelte:head>

<section class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
	<div class="dos-window overflow-hidden animate-boot">
		<div class="dos-titlebar">
			<span>BOOT LOADER</span>
			<span class="hidden sm:inline">SYS 0x1984</span>
		</div>
		<div class="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr]">
			<div class="space-y-4">
				<p class="text-xs uppercase tracking-[0.3em] text-[var(--dos-muted)]">Personal node / bluesky tethered</p>
				<h1 class="text-4xl sm:text-5xl lg:text-6xl dos-glow">LANDON.WTF</h1>
				<p class="text-base leading-relaxed text-[var(--dos-muted)]">
					A markdown-first home with a DOS heart. This space is wired to my Bluesky identity and
					keeps the publishing loop tight: write, save, ship.
				</p>
				<div class="flex flex-wrap gap-2">
					<a class="dos-button" href="/posts">Read posts</a>
					<a class="dos-button" href="https://bsky.app/profile/landon.wtf" target="_blank" rel="noreferrer">
						Bluesky
					</a>
				</div>
			</div>
			<div class="dos-terminal space-y-2">
				<div class="text-xs uppercase tracking-[0.2em] text-[var(--dos-accent)]">C:\LANDON\BOOT</div>
				<div class="text-xs">Loading identity graph... OK</div>
				<div class="text-xs">Mounting markdown volumes... OK</div>
				<div class="text-xs">Spooling hypertext... OK</div>
				<div class="text-xs">Signal uptime: 99.98%</div>
				<div class="mt-4 text-xs">Type "help" for commands.</div>
			</div>
		</div>
	</div>

	<div class="dos-window overflow-hidden animate-boot" style="animation-delay: 0.1s">
		<div class="dos-titlebar">
			<span>SYSTEM STATUS</span>
			<span class="hidden sm:inline">MODE: PUBLIC</span>
		</div>
		<div class="space-y-4 p-5">
			<div class="dos-panel">
				<div class="text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">Identity</div>
				<div class="mt-2 text-sm">Bluesky: @landon.wtf</div>
				<div class="text-sm">Signal: professional / personal / experimental</div>
			</div>
			<div class="dos-panel bg-grid">
				<div class="text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">Primary channels</div>
				<div class="mt-2 flex flex-col gap-1 text-sm">
					<a href="/posts">Post archive</a>
					<a href="https://bsky.app/profile/landon.wtf" target="_blank" rel="noreferrer">Bluesky feed</a>
				</div>
			</div>
			<div class="dos-panel">
				<div class="text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">Status</div>
				<div class="mt-2 text-sm">SvelteKit static build</div>
				<div class="text-sm">Markdown powered</div>
			</div>
		</div>
	</div>
</section>

<section class="dos-window overflow-hidden">
	<div class="dos-titlebar">
		<span>RECENT POSTS</span>
		<span class="hidden sm:inline">ARCHIVE LINKED</span>
	</div>
	<div class="p-6 sm:p-8">
		{#if posts.length}
			<div class="grid gap-4">
				{#each posts as post, index}
					<article class="dos-panel animate-stagger" style={`animation-delay: ${index * 0.08}s`}>
						<div class="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">
							{#if post.meta.date}
								<span class="dos-chip">{formatDate(post.meta.date)}</span>
							{/if}
							{#if post.meta.readingTime}
								<span class="dos-chip">{post.meta.readingTime}</span>
							{/if}
						</div>
						<h2 class="mt-2 text-2xl font-display">
							<a href={`/posts/${post.slug}`}>{post.meta.title}</a>
						</h2>
						{#if post.meta.description}
							<p class="text-sm text-[var(--dos-muted)]">{post.meta.description}</p>
						{/if}
					</article>
				{/each}
			</div>
			<div class="mt-4 text-right text-xs uppercase tracking-[0.3em] text-[var(--dos-muted)]">
				<a href="/posts">View full archive</a>
			</div>
		{:else}
			<div class="dos-panel text-sm text-[var(--dos-muted)]">
				No posts yet. Add a markdown file at <code>src/routes/posts/&lt;slug&gt;/+page.md</code>.
			</div>
		{/if}
	</div>
</section>
