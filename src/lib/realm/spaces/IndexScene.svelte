<script lang="ts">
	import { T } from '@threlte/core';
	import type { Group } from 'three';
	import { generateUUID } from 'three/src/math/MathUtils';
	import type { GameObject } from '..';

	export let space: string = 'IndexScene';
	export let cmpUUID: string = generateUUID();
	let root_object: Group | undefined;
	export let name = 'IndexScene';

	interface $$Props extends GameObject {
		root_object: Group;
		space: string;
		uuid: string;
		name: string;
	}

	function Awake(ref) {
		root_object = ref.Group;
	}
</script>

<T.Group on:create={Awake}>
	<!-- <SceneLighting lights={['direction']} intensity={1.2} {...$$restProps} /> -->
</T.Group>
