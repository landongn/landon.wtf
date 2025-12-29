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
	<title>Posts | landon.wtf</title>
	<meta name="description" content="Dispatches, essays, and field notes from landon.wtf." />
</svelte:head>

<section class="dos-window overflow-hidden animate-boot">
	<div class="dos-titlebar">
		<span>POST ARCHIVE</span>
		<span class="hidden sm:inline">SECTOR 01</span>
	</div>
	<div class="p-6 sm:p-8">
		<p class="mb-6 max-w-2xl text-sm text-[var(--dos-muted)]">
			Dispatches, experiments, and receipts. Add a new post by dropping a markdown file at
			<code>src/routes/posts/&lt;slug&gt;/+page.md</code>.
		</p>

		<div class="grid gap-4">
			{#if posts.length}
				{#each posts as post, index}
					<article
						class="dos-panel animate-stagger"
						style={`animation-delay: ${index * 0.08}s`}
					>
						<header class="flex flex-col gap-2">
							<div class="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">
								{#if post.meta.date}
									<span class="dos-chip">{formatDate(post.meta.date)}</span>
								{/if}
								{#if post.meta.readingTime}
									<span class="dos-chip">{post.meta.readingTime}</span>
								{/if}
							</div>
							<h2 class="text-2xl font-display">
								<a href={`/posts/${post.slug}`}>{post.meta.title}</a>
							</h2>
							{#if post.meta.description}
								<p class="text-sm text-[var(--dos-muted)]">{post.meta.description}</p>
							{/if}
						</header>
						{#if post.meta.tags?.length}
							<div class="mt-3 flex flex-wrap gap-2">
								{#each post.meta.tags as tag}
									<span class="dos-tag">#{tag}</span>
								{/each}
							</div>
						{/if}
					</article>
				{/each}
			{:else}
				<div class="dos-panel text-sm text-[var(--dos-muted)]">
					No posts yet. Spin up a draft in the editor and save it into
					<code>src/routes/posts/&lt;slug&gt;/+page.md</code>.
				</div>
			{/if}
		</div>
	</div>
</section>
