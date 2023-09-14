// src/routes/+layout.server.ts
import type { LayoutServerLoadEvent } from './$types.js';
export const load = async (event: LayoutServerLoadEvent) => {
	return {
		session: await event.locals.getSession()
	};
};
