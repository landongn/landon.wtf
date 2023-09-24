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
	import { allGameObjects } from '$lib/stores/GameObjects';
	import { Toast } from '@skeletonlabs/skeleton';
	import { T, useFrame, type ThrelteContext } from '@threlte/core';
	import { HTML, interactivity, transitions } from '@threlte/extras';
	import FancyCam from '../../modules/fancy-cam/FancyCam.svelte';
	import IndexScene from './spaces/IndexScene.svelte';

	interface $$Props extends SpaceProps {}
	interface $$Events extends SpaceEvents {}

	let has_started = false;
	let is_running = false;

	export const name = 'home';
	export const parent = null;

	function onStart() {
		has_started = true;
	}

	function onDestroy() {}

	function onUpdate(scene: ThrelteContext, dt: number) {}

	useFrame((ctx: ThrelteContext, delta: number): void => {
		has_started ? (is_running ? onUpdate(ctx, delta) : void 0) : onStart();
	});

	transitions();
	interactivity();
</script>

<T.Group
	name="cameraControls"
	transform={[0, 0, 0]}
	on:create={(ref) => {
		allGameObjects.update((v) => {
			v.push(ref.ref);
			v = v;
			return v;
		});
	}}
>
	<T.PerspectiveCamera name="mainCamera" makeDefault fov={50} position={[0, 0, 5]} let:ref>
		<FancyCam camera={ref} />
	</T.PerspectiveCamera>
</T.Group>

<IndexScene />

<!-- lets build a little UI -->
<HTML>
	<Toast position="tl" />
</HTML>
