<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Realm from '$lib/realm/Realm.svelte';
	import { Canvas, T } from '@threlte/core';
	import { World } from '@threlte/rapier';
	import type { PerspectiveCamera } from 'three';

	export let data;

	let mainCamera: PerspectiveCamera;
</script>

<svelte:head>
	<title>landon.wtf</title>
</svelte:head>

<div class="w-full h-full isolate fixed">
	<Canvas>
		<World>
			<Realm space={'home'}>
				<T.Group name="mainCameraControlArm" transform={[0, 0, 0]}>
					<T.PerspectiveCamera
						name="mainCamera"
						makeDefault
						fov={80}
						position={[0, 0, 100]}
						on:create={(ctx) => (mainCamera = ctx.ref)}
					>
						<!-- <OrbitControls
							enableDamping={true}
							enableRotate={false}
							mouseButtons={{ RIGHT: MOUSE.PAN, MIDDLE: MOUSE.DOLLY }}
						/> -->
					</T.PerspectiveCamera>
				</T.Group>
			</Realm>
		</World>
	</Canvas>
</div>
