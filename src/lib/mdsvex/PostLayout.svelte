<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { children, metadata } = $props();

	const title = metadata?.title ?? 'Untitled';
	const description = metadata?.description ?? '';
	const date = metadata?.date ?? '';
	const tags = Array.isArray(metadata?.tags)
		? metadata?.tags
		: metadata?.tags
			? [metadata?.tags]
			: [];
	const readingTime = metadata?.readingTime ? String(metadata?.readingTime) : '';

	let progress = $state(0);
	let copyStatus = $state('');

	const formatDate = (value: string) => {
		if (!value) return '';
		const parsed = new Date(value);
		if (Number.isNaN(parsed.getTime())) return value;
		return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(parsed);
	};

	const updateProgress = () => {
		if (!browser) return;
		const doc = document.documentElement;
		const total = doc.scrollHeight - doc.clientHeight;
		progress = total > 0 ? doc.scrollTop / total : 0;
	};

	const copyLink = async () => {
		if (!browser || !navigator.clipboard) return;
		try {
			await navigator.clipboard.writeText(window.location.href);
			copyStatus = 'Link copied.';
			setTimeout(() => (copyStatus = ''), 1500);
		} catch {
			copyStatus = 'Copy failed.';
			setTimeout(() => (copyStatus = ''), 1500);
		}
	};

	onMount(() => {
		if (!browser) return;
		updateProgress();
		window.addEventListener('scroll', updateProgress, { passive: true });
		window.addEventListener('resize', updateProgress);
		return () => {
			window.removeEventListener('scroll', updateProgress);
			window.removeEventListener('resize', updateProgress);
		};
	});
</script>

<svelte:head>
	<title>{title} | landon.wtf</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<div class="dos-window">
	<div class="dos-titlebar">
		<span>READ MODE</span>
		<span class="hidden sm:inline">SIGNAL: STABLE</span>
	</div>
	<div class="sticky top-0 z-10 bg-[var(--dos-panel)]">
		<div class="h-1 bg-[var(--dos-border-dark)]">
			<div class="h-full bg-[var(--dos-accent)]" style={`width: ${Math.round(progress * 100)}%`}></div>
		</div>
	</div>
	<div class="p-6 sm:p-8">
		<header class="mb-8 space-y-4">
			<p class="text-xs uppercase tracking-[0.3em] text-[var(--dos-muted)]">Broadcast</p>
			<h1 class="text-4xl sm:text-5xl lg:text-6xl dos-glow">{title}</h1>
			{#if description}
				<p class="max-w-2xl text-base text-[var(--dos-muted)]">{description}</p>
			{/if}
			<div class="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">
				{#if date}
					<span class="dos-chip">{formatDate(date)}</span>
				{/if}
				{#if readingTime}
					<span class="dos-chip">{readingTime}</span>
				{/if}
				{#each tags as tag}
					<span class="dos-tag">#{tag}</span>
				{/each}
			</div>
			<div class="flex flex-wrap gap-2">
				<button class="dos-button" type="button" on:click={copyLink}>Copy link</button>
				<a class="dos-button" href="/posts">Back to index</a>
				{#if copyStatus}
					<span class="text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">{copyStatus}</span>
				{/if}
			</div>
		</header>

		<article class="prose dos-prose max-w-none">
			{@render children()}
		</article>
	</div>
</div>
