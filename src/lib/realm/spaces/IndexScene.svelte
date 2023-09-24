<script lang="ts">
	import { T } from '@threlte/core';

	import type { Behavior } from '$lib/cmp/primitives/types';
	import trace from '$lib/logger';
	import { allGameObjects } from '$lib/stores/GameObjects';
	import { Grid, RoundedBoxGeometry } from '@threlte/extras';
	import { Collider } from '@threlte/rapier';

	interface $$Events extends Behavior {}

	const Awake = (e) => {
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

<T.Group name="Floor" position={[0, 1, 0]}>
	<Collider>
		<T.Mesh>
			<RoundedBoxGeometry args={[4, 1, 1]} />
			<T.MeshPhongMaterial />
		</T.Mesh>
	</Collider>
</T.Group>
