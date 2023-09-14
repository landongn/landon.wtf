// src/routes/+page.server.ts

export const load = async ({ url }) => {
	return { url: url.origin };
};
