<script lang="ts">
	import { browser } from '$app/environment';
	import { marked } from 'marked';
	import { onMount, tick } from 'svelte';

	marked.setOptions({
		mangle: false,
		headerIds: false
	});

	const STORAGE_KEY = 'landon-editor-draft-v1';

	let title = $state('');
	let description = $state('');
	let body = $state('');
	let tagsInput = $state('');
	let date = $state(new Date().toISOString().slice(0, 10));
	let slug = $state('');
	let draft = $state(false);
	let autoSlug = $state(true);
	let viewMode = $state<'split' | 'write' | 'preview'>('split');
	let lastSavedAt = $state('');
	let status = $state('Draft not saved');
	let fileHandle = $state<FileSystemFileHandle | null>(null);
	let bodyArea: HTMLTextAreaElement | null = null;
	let loaded = false;

	const tags = $derived(() =>
		tagsInput
			.split(',')
			.map((tag) => tag.trim())
			.filter(Boolean)
	);

	const wordCount = $derived(() => (body.trim() ? body.trim().split(/\s+/).length : 0));
	const readingTime = $derived(() => `${Math.max(1, Math.ceil(wordCount / 220))} min read`);

	$effect(() => {
		if (autoSlug) {
			slug = slugify(title);
		}
	});

	const yamlEscape = (value: string) => `"${value.replace(/"/g, '\\"')}"`;
	const formatTag = (tag: string) => (/^[A-Za-z0-9_-]+$/.test(tag) ? tag : yamlEscape(tag));

	const markdown = $derived(() => {
		const frontmatter = [
			'---',
			'layout: post',
			`title: ${yamlEscape(title || 'Untitled')}`,
			description ? `description: ${yamlEscape(description)}` : '',
			date ? `date: ${date}` : '',
			tags.length ? `tags: [${tags.map(formatTag).join(', ')}]` : '',
			`readingTime: ${readingTime}`,
			draft ? 'draft: true' : '',
			'---'
		]
			.filter(Boolean)
			.join('\n');

		return `${frontmatter}\n\n${body.trim()}\n`;
	});

	const previewHtml = $derived(() => {
		const parsed = marked.parse(body || '');
		return typeof parsed === 'string' ? parsed : '';
	});

	const slugify = (value: string) =>
		value
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '')
			.slice(0, 60);

	const saveDraft = () => {
		if (!browser || !loaded) return;
		const payload = {
			title,
			description,
			body,
			tagsInput,
			date,
			slug,
			draft,
			autoSlug
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
		lastSavedAt = new Date().toLocaleTimeString();
		status = 'Draft autosaved';
	};

	$effect(() => {
		if (!browser || !loaded) return;
		const timeout = setTimeout(saveDraft, 350);
		return () => clearTimeout(timeout);
	});

	const loadDraft = () => {
		if (!browser) return;
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		try {
			const payload = JSON.parse(raw) as Record<string, unknown>;
			title = String(payload.title ?? '');
			description = String(payload.description ?? '');
			body = String(payload.body ?? '');
			tagsInput = String(payload.tagsInput ?? '');
			date = String(payload.date ?? new Date().toISOString().slice(0, 10));
			slug = String(payload.slug ?? '');
			draft = Boolean(payload.draft ?? false);
			autoSlug = Boolean(payload.autoSlug ?? true);
			status = 'Draft loaded';
		} catch {
			status = 'Draft load failed';
		}
	};

	const insertSnippet = async (snippet: string) => {
		if (!bodyArea) {
			body = `${body}\n${snippet}`.trim();
			return;
		}
		const start = bodyArea.selectionStart;
		const end = bodyArea.selectionEnd;
		const next = `${body.slice(0, start)}${snippet}${body.slice(end)}`;
		body = next;
		await tick();
		bodyArea.focus();
		const cursor = start + snippet.length;
		bodyArea.setSelectionRange(cursor, cursor);
	};

	const parseFrontmatter = (raw: string) => {
		const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
		if (!match) {
			body = raw.trim();
			return;
		}

		const metaBlock = match[1];
		const content = match[2] ?? '';
		const meta: Record<string, string | string[]> = {};
		let listKey: string | null = null;

		for (const line of metaBlock.split('\n')) {
			const listMatch = line.match(/^\s*-\s+(.*)$/);
			if (listMatch && listKey) {
				const entry = listMatch[1].trim();
				const current = meta[listKey];
				if (Array.isArray(current)) current.push(entry);
				else meta[listKey] = [entry];
				continue;
			}

			const kvMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
			if (!kvMatch) continue;
			const key = kvMatch[1];
			const value = kvMatch[2].trim();
			listKey = null;

			if (!value) {
				meta[key] = [];
				listKey = key;
				continue;
			}

			if (value.startsWith('[') && value.endsWith(']')) {
				meta[key] = value
					.slice(1, -1)
					.split(',')
					.map((item) => item.trim())
					.filter(Boolean);
				continue;
			}

			meta[key] = value.replace(/^['"]|['"]$/g, '');
		}

		title = String(meta.title ?? title);
		description = String(meta.description ?? description);
		date = String(meta.date ?? date);
		const tagsValue = meta.tags;
		if (Array.isArray(tagsValue)) {
			tagsInput = tagsValue.join(', ');
		} else if (typeof tagsValue === 'string') {
			tagsInput = tagsValue;
		}
		if (typeof meta.draft === 'string') {
			draft = meta.draft.toLowerCase() === 'true';
		}
		body = content.trim();
	};

	const openFile = async () => {
		if (!browser || !('showOpenFilePicker' in window)) {
			status = 'File picker not supported';
			return;
		}
		try {
			const [handle] = await window.showOpenFilePicker({
				types: [{ description: 'Markdown', accept: { 'text/markdown': ['.md'] } }],
				excludeAcceptAllOption: true
			});
			const file = await handle.getFile();
			const text = await file.text();
			fileHandle = handle;
			parseFrontmatter(text);
			status = `Loaded ${file.name}`;
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				status = 'Open canceled';
				return;
			}
			status = 'Open failed';
		}
	};

	const writeToHandle = async (handle: FileSystemFileHandle) => {
		const writable = await handle.createWritable();
		await writable.write(markdown);
		await writable.close();
	};

	const saveAs = async () => {
		if (!browser) return;
		if (!('showSaveFilePicker' in window)) {
			downloadMarkdown();
			return;
		}
		try {
			const handle = await window.showSaveFilePicker({
				suggestedName: slug ? `${slug}.md` : 'new-post.md',
				types: [{ description: 'Markdown', accept: { 'text/markdown': ['.md'] } }]
			});
			await writeToHandle(handle);
			fileHandle = handle;
			status = `Saved ${handle.name}`;
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				status = 'Save canceled';
				return;
			}
			status = 'Save failed';
		}
	};

	const saveFile = async () => {
		if (!browser) return;
		try {
			if (fileHandle) {
				await writeToHandle(fileHandle);
				status = `Saved ${fileHandle.name}`;
				return;
			}
			await saveAs();
		} catch {
			status = 'Save failed';
		}
	};

	const downloadMarkdown = () => {
		if (!browser) return;
		const blob = new Blob([markdown], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = slug ? `${slug}.md` : 'new-post.md';
		a.click();
		URL.revokeObjectURL(url);
		status = 'Downloaded markdown';
	};

	const copyMarkdown = async () => {
		if (!browser) return;
		if (!navigator.clipboard) {
			status = 'Clipboard not supported';
			return;
		}
		try {
			await navigator.clipboard.writeText(markdown);
			status = 'Copied markdown';
		} catch {
			status = 'Copy failed';
		}
	};

	onMount(() => {
		if (!browser) return;
		loadDraft();
		loaded = true;
		status = 'Editor ready';
	});
</script>

<svelte:head>
	<title>Editor | landon.wtf</title>
	<meta name="description" content="Markdown-first editor for landon.wtf." />
</svelte:head>

<section class="dos-window overflow-hidden animate-boot">
	<div class="dos-titlebar">
		<span>EDITOR CONSOLE</span>
		<span class="hidden sm:inline">MODE: DRAFT</span>
	</div>
	<div class="flex flex-col gap-4 border-b border-[var(--dos-border-dark)] p-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">
			<span class="dos-chip">Words: {wordCount}</span>
			<span class="dos-chip">{readingTime}</span>
			{#if lastSavedAt}
				<span class="dos-chip">Autosaved {lastSavedAt}</span>
			{/if}
		</div>
		<div class="flex flex-wrap gap-2">
			<button class="dos-button" type="button" on:click={openFile}>Open</button>
			<button class="dos-button" type="button" on:click={saveFile}>Save</button>
			<button class="dos-button" type="button" on:click={saveAs}>Save as</button>
			<button class="dos-button" type="button" on:click={downloadMarkdown}>Download</button>
			<button class="dos-button" type="button" on:click={copyMarkdown}>Copy</button>
		</div>
	</div>
	<div class="p-4 text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">{status}</div>
	<div class="grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr]">
		<div class="space-y-6">
			<div class="dos-panel space-y-4">
				<div>
					<label class="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">Title</label>
					<input class="dos-input" type="text" bind:value={title} placeholder="Story title" />
				</div>
				<div>
					<label class="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">Description</label>
					<input class="dos-input" type="text" bind:value={description} placeholder="One-line dek" />
				</div>
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label class="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">Date</label>
						<input class="dos-input" type="date" bind:value={date} />
					</div>
					<div>
						<label class="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">Slug</label>
						<input class="dos-input" type="text" bind:value={slug} disabled={autoSlug} />
						<label class="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">
							<input type="checkbox" bind:checked={autoSlug} /> Auto-generate
						</label>
					</div>
				</div>
				<div>
					<label class="mb-2 block text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">Tags</label>
					<input class="dos-input" type="text" bind:value={tagsInput} placeholder="writing, svelte, identity" />
				</div>
				<label class="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">
					<input type="checkbox" bind:checked={draft} /> Draft mode
				</label>
			</div>

			<div class="dos-panel space-y-3">
				<div class="flex flex-wrap gap-2">
					<button class="dos-button" type="button" on:click={() => insertSnippet('## Heading\n')}>H2</button>
					<button class="dos-button" type="button" on:click={() => insertSnippet('### Subheading\n')}>H3</button>
					<button class="dos-button" type="button" on:click={() => insertSnippet('**bold**')}>Bold</button>
					<button class="dos-button" type="button" on:click={() => insertSnippet('*italic*')}>Italic</button>
					<button class="dos-button" type="button" on:click={() => insertSnippet('> Quote\n')}>Quote</button>
					<button class="dos-button" type="button" on:click={() => insertSnippet('`code`')}>Code</button>
					<button class="dos-button" type="button" on:click={() => insertSnippet('[text](https://)')}>Link</button>
					<button class="dos-button" type="button" on:click={() => insertSnippet('- Item\n- Item\n')}>List</button>
				</div>
				<p class="text-xs text-[var(--dos-muted)]">
					The preview uses markdown and ships with frontmatter. Save into
					<code>src/routes/posts/&lt;slug&gt;/+page.md</code> to publish.
				</p>
			</div>
		</div>

		<div class="space-y-4">
			<div class="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">
				<button
					class="dos-button"
					type="button"
					on:click={() => (viewMode = 'write')}
				>
					Write
				</button>
				<button
					class="dos-button"
					type="button"
					on:click={() => (viewMode = 'preview')}
				>
					Preview
				</button>
				<button
					class="dos-button"
					type="button"
					on:click={() => (viewMode = 'split')}
				>
					Split
				</button>
			</div>
			<div class="grid gap-4 lg:grid-cols-2">
				<div class={`flex flex-col gap-2 ${viewMode === 'preview' ? 'hidden' : ''}`}>
					<label class="text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">Markdown</label>
					<textarea
						class="dos-input min-h-[360px] font-mono text-sm leading-relaxed"
						bind:value={body}
						bind:this={bodyArea}
						placeholder="Write the story here..."
					></textarea>
				</div>
				<div class={`flex flex-col gap-2 ${viewMode === 'write' ? 'hidden' : ''}`}>
					<label class="text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">Preview</label>
					<div class="dos-panel min-h-[360px] overflow-auto">
						<div class="mb-4 border-b border-[var(--dos-border-dark)] pb-3">
							<p class="text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">Signal preview</p>
							<h3 class="text-2xl font-display">{title || 'Untitled'}</h3>
							{#if description}
								<p class="text-sm text-[var(--dos-muted)]">{description}</p>
							{/if}
							<div class="mt-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-[var(--dos-muted)]">
								{#if date}
									<span class="dos-chip">{date}</span>
								{/if}
								<span class="dos-chip">{readingTime}</span>
								{#each tags as tag}
									<span class="dos-tag">#{tag}</span>
								{/each}
							</div>
						</div>
						<article class="prose dos-prose max-w-none">{@html previewHtml}</article>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
