<script lang="ts">
	import SceneLoader from '$lib/cmp/util/SceneLoader.svelte';
	import { useFrame, type ThrelteContext } from '@threlte/core';

	let has_started = false;
	let last_tick_ms = 0;
	let is_running = false;

	export let space = 'home';

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

<slot name="loader">
	<SceneLoader />
</slot>
