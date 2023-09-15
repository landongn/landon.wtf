<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Realm from '$lib/realm/Realm.svelte';
	import { EditorState, type EditorRuntimeState } from '$lib/stores/index.js';
	import { Canvas, T } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import { World } from '@threlte/rapier';
	import Mousetrap from 'mousetrap';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { type PerspectiveCamera } from 'three';

	let EditorElement: HTMLElement;
	onMount(async () => {
		const { createEditor } = await import('../lib/editor');
		createEditor(EditorElement);

		Mousetrap.bind('~', (e: KeyboardEvent) => {
			EditorState.update((c: EditorRuntimeState) => {
				c.visible = !c.visible;
				return c;
			});
		});
	});

	$: editorPositionSpring = spring(
		{ x: 0, y: 0, z: 0, opacity: 1 },
		{ damping: 1, precision: 1, stiffness: 1 }
	);

	$: editorVisible = $EditorState.visible;

	let mainCamera: PerspectiveCamera;
</script>

<svelte:head>
	<title>landon.wtf</title>
</svelte:head>

<div class="w-full h-full isolate fixed">
	<Canvas>
		<World>
			<Realm name={'realm'}>
				<T.Group name="mainCameraControlArm" transform={[0, 0, 0]}>
					<T.PerspectiveCamera
						name="mainCamera"
						makeDefault
						fov={80}
						position={[0, 0, 100]}
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
			<HTML>
				<div class="rete" bind:this={EditorElement} />
			</HTML>
		</World>
	</Canvas>
</div>

<style>
	.rete {
		position: relative;
		width: 100vw;
		height: 100vh;
		font-size: 1rem;
		text-align: left;
		border: 1px solid #cbd0db;
	}
</style>
