<script lang="ts">
	import { T } from '@threlte/core';

	import type { GameObject } from './types';

	interface $$Props extends GameObject {
		lights: string[]; // direction, hemi, ambient
		intensity: 1.0;
		showGizmo: false;
		active: true;
	}

	export let lights: string[];
	export let intensity = 1.0;
	export let active = true;
</script>

<T.Group name="directions">
	{#each lights as light}
		{#if light == 'direction'}
			<T.DirectionalLight {intensity} color={0xffffff} visible={active} />
		{/if}
	{/each}
</T.Group>
