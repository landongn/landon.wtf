<script lang="ts">
	import { T, forwardEventHandlers, useThrelte } from '@threlte/core';
	import { Grid } from '@threlte/extras';

	import type { Behavior } from '$lib/cmp/primitives/types';
	import trace from '$lib/logger';
	import { Vector3, type Group, type Object3DEventMap } from 'three';

	const dispatch = forwardEventHandlers();

	// interface $$Props extends GameObject {
	// 	position: ,
	// 	scale: undefined;
	// }

	interface $$Events extends Behavior {}

	const Awake = (e: { ref: Group<Object3DEventMap> }) => {
		trace.info('indexScene Awake internally', e);
	};

	const ctx = useThrelte();
	ctx.camera.current.lookAt(new Vector3(0, 0, 0));
	ctx.camera.current.position.set(0, 10, 10);
</script>

<T.Group bind:this={$dispatch} on:create={Awake}>
	<T.DirectionalLight intensity={1.0} color={0xffffff} />
	<T.HemisphereLight intensity={1.0} color={0x0feeff} groundColor={0x111111} />
	<Grid
		cellColor={'white'}
		cellSize={1}
		cellThickness={1}
		sectionColor={'purple'}
		sectionSize={24}
		sectionThickness={1}
		gridSize={[24, 48]}
		followCamera={false}
		infiniteGrid={true}
		fadeDistance={1}
		fadeStrength={1}
	/>
</T.Group>
