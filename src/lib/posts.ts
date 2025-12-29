export type PostMeta = {
	title: string;
	description?: string;
	date?: string;
	tags?: string[];
	readingTime?: string;
	draft?: boolean;
};

export type PostListItem = {
	slug: string;
	meta: PostMeta;
};

type PostModule = {
	metadata?: PostMeta;
	default: typeof import('svelte').SvelteComponent;
};

const routeModules = import.meta.glob('/src/routes/posts/*/+page.{md,svx}');
const routeModulesEager = import.meta.glob('/src/routes/posts/*/+page.{md,svx}', { eager: true });

const getSlug = (path: string) => {
	const parts = path.split('/');
	const folder = parts[parts.length - 2];
	return folder ?? '';
};

export const getPosts = () => {
	const entries = Object.entries(routeModulesEager).map(([path, module]) => {
		const slug = getSlug(path);
		const meta = (module as PostModule).metadata ?? { title: slug };
		const normalizedTags = Array.isArray(meta.tags) ? meta.tags : meta.tags ? [meta.tags] : [];
		const normalizedDraft = meta.draft === true || meta.draft === 'true';
		return {
			slug,
			meta: { ...meta, tags: normalizedTags, draft: normalizedDraft }
		} satisfies PostListItem;
	});

	return entries
		.filter((post) => !post.meta?.draft)
		.sort((a, b) => {
			const aTime = a.meta.date ? new Date(a.meta.date).getTime() : 0;
			const bTime = b.meta.date ? new Date(b.meta.date).getTime() : 0;
			return bTime - aTime;
		});
};

export const getPostModule = async (slug: string) => {
	const match =
		routeModules[`/src/routes/posts/${slug}/+page.md`] ??
		routeModules[`/src/routes/posts/${slug}/+page.svx`];

	if (!match) return null;
	const module = (await match()) as PostModule;
	const meta = module.metadata ?? { title: slug };
	const normalizedTags = Array.isArray(meta.tags) ? meta.tags : meta.tags ? [meta.tags] : [];
	const normalizedDraft = meta.draft === true || meta.draft === 'true';
	return {
		Content: module.default,
		meta: { ...meta, tags: normalizedTags, draft: normalizedDraft },
		slug
	};
};
