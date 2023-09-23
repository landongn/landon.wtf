<script lang="ts">
	import { T } from '@threlte/core';

	import Waves from '$lib/cmp/background/waves.svelte';
	import type { Behavior } from '$lib/cmp/primitives/types';
	import trace from '$lib/logger';
	import { allGameObjects } from '$lib/stores/GameObjects';
	import { Grid } from '@threlte/extras';
	import type { Group, Object3DEventMap } from 'three';

	interface $$Events extends Behavior {}

	const Awake = (e: { ref: Group<Object3DEventMap> }) => {
		trace.info('indexScene Awake internally', e);
		allGameObjects.update((v) => {
			v.push(e.ref);
			v = v;
			return v;
		});
	};
</script>

<T.Group name="indexSceneRootGroup" on:create={Awake}>
	<T.DirectionalLight intensity={0.9} color={0xffffff} />
	<T.HemisphereLight intensity={1.0} color={0x0feeff} groundColor={0x111111} />
	<Grid
		cellColor={'#d1ffff'}
		cellSize={1}
		cellThickness={1}
		sectionColor={'purple'}
		sectionSize={24}
		sectionThickness={1}
		gridSize={[24, 48]}
		followCamera={false}
		infiniteGrid={true}
	/>
</T.Group>
<Waves />
