<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Realm from '$lib/realm/Realm.svelte';
	import { EditorState, type EditorRuntimeState } from '$lib/stores/index.js';
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { World } from '@threlte/rapier';
	import Mousetrap, { type ExtendedKeyboardEvent } from 'mousetrap';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { MOUSE, type PerspectiveCamera } from 'three';
	import { randInt } from 'three/src/math/MathUtils';

	let EditorElement: HTMLElement;
	onMount(async () => {
		const { createEditor } = await import('../lib/editor');
		createEditor(EditorElement);

		Mousetrap.bind('i d d q d', (e: ExtendedKeyboardEvent) => {
			console.log('god mode activated');
			EditorState.update((c: EditorRuntimeState) => {
				c.visible
					? editorPositionSpring.set({
							x: randInt(-1000, 1000),
							y: randInt(-1000, 1000),
							z: randInt(-1000, 1000),
							opacity: 0
					  })
					: editorPositionSpring.set({ x: 0, y: 0, z: 0, opacity: 1 });

				c.visible = !c.visible;
				c = c;

				return c;
			});
		});
	});

	const editorPositionSpring = spring(
		{ x: 0, y: 0, z: 0, opacity: 1 },
		{ damping: 0.235, precision: 0.8, stiffness: 0.1 }
	);

	let mainCamera: PerspectiveCamera;
	editorPositionSpring.set({ x: -100, y: -100, z: -100, opacity: 0 });
</script>

<svelte:head>
	<title>landon.wtf</title>
</svelte:head>

<div class="w-full h-full isolate fixed bg-white">
	<Canvas>
		<World>
			<Realm name={'realm'}>
				<T.Group name="mainCameraControlArm" transform={[0, 0, 0]}>
					<T.PerspectiveCamera
						name="mainCamera"
						makeDefault
						fov={80}
						position={[0, 0, 5]}
						on:create={(ctx) => (mainCamera = ctx.ref)}
					>
						<OrbitControls
							enableDamping={true}
							enableRotate={false}
							mouseButtons={{ RIGHT: MOUSE.PAN, MIDDLE: MOUSE.DOLLY }}
						/>
					</T.PerspectiveCamera>
				</T.Group>
			</Realm>
		</World>
	</Canvas>
	<div
		class="rete"
		bind:this={EditorElement}
		style={`transform: translate3d(${$editorPositionSpring.x}px, ${$editorPositionSpring.y}px, ${$editorPositionSpring.z}px); opacity: ${$editorPositionSpring.opacity}`}
	/>
</div>

<style>
	.rete {
		position: absolute;
		width: 100vw;
		height: 80vh;
		margin: 10vw auto;
		font-size: 1rem;
		text-align: left;
		top: 0;
		left: 0;
	}
</style>
