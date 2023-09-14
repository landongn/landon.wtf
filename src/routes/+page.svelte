<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Realm from '$lib/realm/Realm.svelte';
	import { Canvas } from '@threlte/core';
	import { World } from '@threlte/rapier';

	export let data;
</script>

<svelte:head>
	<title>Landon "Thock" Noss</title>
</svelte:head>

<div class="w-full h-full isolate fixed">
	<Canvas>
		<World>
			<Realm space={'home'} />
		</World>
	</Canvas>
</div>
