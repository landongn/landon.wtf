<script lang="ts">
	import {
		AppBar,
		AppRail,
		AppRailAnchor,
		AppRailTile,
		AppShell,
		TreeView,
		TreeViewItem,
		initializeStores
	} from '@skeletonlabs/skeleton';

	import ArchiveBox from '$lib/cmp/primitives/svg/archiveBox.svelte';
	import Cube from '$lib/cmp/primitives/svg/cube.svelte';
	import Globe from '$lib/cmp/primitives/svg/globe.svelte';
	import Users from '$lib/cmp/primitives/svg/users.svelte';
	import { allGameObjects } from '$lib/stores/GameObjects';
	import '../app.postcss';
	let currentTile = 0;
	initializeStores();
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar regionPage="relative" slotPageHeader="sticky top-0 z-10">
			what the <i>F$%@</i>, landon?
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div id="sidebar-left" class="hidden lg:block">
			<AppRail width="w-28">
				<svelte:fragment slot="lead">
					<AppRailAnchor href="/">
						<div class="align-middle justify-center flex">
							<Globe w={8} h={8} /> <span class="mx-1 my-2">Scene</span>
						</div>
					</AppRailAnchor>
				</svelte:fragment>
				<!-- --- -->
				<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
					<svelte:fragment slot="lead">
						<div class="align-middle justify-center flex">
							<Globe w={8} h={8} />
						</div>
					</svelte:fragment>
					<span class="text-sm">Game Objects</span>
				</AppRailTile>
				<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
					<svelte:fragment slot="lead">
						<div class="align-middle justify-center flex">
							<Users w={8} h={8} />
						</div>
					</svelte:fragment>
					<span>Behaviors</span>
				</AppRailTile>
				<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
					<svelte:fragment slot="lead">
						<div class="align-middle justify-center flex">
							<ArchiveBox w={8} h={8} />
						</div>
					</svelte:fragment>
					<span>Assets</span>
				</AppRailTile>
				<!-- --- -->
				<svelte:fragment slot="trail">
					<AppRailAnchor href="/" title="Home">
						<div class="align-middle justify-center flex">
							<Cube w={8} h={8} /> <span class="mx-1 my-2">Settings</span>
						</div>
					</AppRailAnchor>
					<AppRailTile bind:group={currentTile} name="tile-4" value={4} title="tile-4">
						<svelte:fragment slot="lead">
							<div class="align-middle justify-center flex">
								<Cube w={8} h={8} />
							</div>
						</svelte:fragment>
						<span>Project</span>
					</AppRailTile>
					<AppRailTile bind:group={currentTile} name="tile-5" value={5} title="tile-5">
						<svelte:fragment slot="lead">
							<div class="align-middle justify-center flex">
								<Cube w={8} h={8} />
							</div>
						</svelte:fragment>
						<span>Schema</span>
					</AppRailTile>
				</svelte:fragment>
			</AppRail>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<TreeView>
			{#each $allGameObjects as gameObject}
				<TreeViewItem>
					<svelte:fragment slot="lead">
						<Cube w={6} h={6} />
					</svelte:fragment>
					name: {gameObject.id}
					{gameObject.name}
				</TreeViewItem>
			{/each}
		</TreeView>
	</svelte:fragment>
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">@thock.wtf bsky @landongn twitter</svelte:fragment>
	<!-- (footer) -->
</AppShell>
