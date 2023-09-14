<script lang="ts">
	import { supervisor } from '$lib/stores/supervisor';
	import { T, forwardEventHandlers } from '@threlte/core';
	import { spawn } from 'nact';
	import { generateUUID } from 'three/src/math/MathUtils';

	const component = forwardEventHandlers();

	const statefulBehavior = spawn(supervisor, (state, msg, ctx) => {});
	// how do we model an "inbox"?
</script>

<T.Group name={generateUUID()} {...$$restProps}>
	<T.Mesh position.y={0.5} bind:this={$component}>
		<T.BoxGeometry />
		<T.MeshStandardMaterial />
	</T.Mesh>
	<slot />
</T.Group>
