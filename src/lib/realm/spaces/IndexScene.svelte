<script lang="ts">
	import SceneLighting from '$lib/cmp/primitives/SceneLighting.svelte';
	import T from '@threlte/core/dist/components/T/T.svelte';
	import { generateUUID } from 'three/src/math/MathUtils';

	export let space: string = 'IndexScene';

	export let cmpUUID: string = generateUUID();
</script>

<T.Group name="IndexScene">
	<SceneLighting active={true} lights={['direction']} id={cmpUUID} intensity={2.0} />
</T.Group>
