<script lang="ts" context="module">
	interface SpaceEvents {
		transitionIn?(
			context: ThrelteContext,
			duration?: number,
			delay?: number,
			callback?: () => Promise<void>
		): Promise<void>;
		transitionOut?(
			context: ThrelteContext,
			duration?: number,
			delay?: number,
			callback?: () => Promise<void>
		): Promise<void>;
	}

	interface SpaceProps {
		name: string;
		parent?: Space | null;
		GameObjectRoot?: GameObject[];
		has_started?: boolean;
		is_running?: boolean;
		last_tick_ms?: number;
	}

	interface Space extends SpaceProps, SpaceEvents {}
</script>

<script lang="ts">
	import type { GameObject } from '$lib/cmp/primitives/types';
	import { T, useFrame, type ThrelteContext } from '@threlte/core';
	import IndexScene from './spaces/IndexScene.svelte';

	interface $$Props extends SpaceProps {}
	interface $$Events extends SpaceEvents {}

	let has_started = false;
	let last_tick_ms = 0;
	let is_running = false;

	export const name = 'home';
	export const parent = null;

	function onStart() {
		has_started = true;
	}

	function onDestroy() {}

	function onUpdate(scene: ThrelteContext, dt: number) {
		last_tick_ms = dt;
	}

	useFrame((ctx: ThrelteContext, delta: number): void => {
		has_started ? (is_running ? onUpdate(ctx, delta) : void 0) : onStart();
	});
</script>

{#if name == 'home'}
	<T.Group on:create={(e) => console.log('indexScene Awake', e)}>
		<IndexScene id={'IndexSceneInstance'} name="home" tags={['spaces']} />
	</T.Group>
{/if}
