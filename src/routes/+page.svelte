<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Realm from '$lib/realm/Realm.svelte';
	import { Canvas } from '@threlte/core';
	import { World } from '@threlte/rapier';
	import Mousetrap, { type ExtendedKeyboardEvent } from 'mousetrap';
	import { onMount } from 'svelte';

	let EditorElement: HTMLElement;

	onMount(() => {
		Mousetrap.bind('i d d q d', (e: ExtendedKeyboardEvent) => {
			console.log('god mode activated');
		});
	});
</script>

<svelte:head>
	<title>landon.wtf</title>
</svelte:head>

<div class="w-full h-full fixed">
	<Canvas>
		<World>
			<Realm name={'home'} />
		</World>
	</Canvas>
</div>

<style>
</style>
