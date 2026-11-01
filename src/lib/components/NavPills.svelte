<script lang="ts">
	import { currentHomePage } from '$lib/stores/HomePageStore.js';
	import { navController } from '$lib/navigation/nav-controller.svelte';

	$effect(() => {
		navController.syncPage($currentHomePage);
	});
</script>

<nav class="page-selector" aria-label="Main navigation">
	{#each navController.items as item (item.id)}
		<button
			type="button"
			class="tab-item"
			class:active-tab={navController.isActive(item.id)}
			onclick={() => navController.navigate(item)}
		>
			{item.label}
		</button>
	{/each}
</nav>

<style>
	.page-selector {
		justify-self: center;
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 4px;
		background-color: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 9999px;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
	}

	.tab-item {
		padding: 7px 20px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 12px;
		font-weight: 500;
		line-height: 1.2;
		color: rgba(255, 255, 255, 0.55);
		background: transparent;
		border: none;
		border-radius: 9999px;
		cursor: pointer;
		white-space: nowrap;
		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.tab-item:hover {
		color: #fff;
	}

	.tab-item.active-tab {
		background-color: #fff;
		color: #000;
		font-weight: 600;
		box-shadow: 0 6px 16px rgba(255, 255, 255, 0.1);
	}

	@media (max-width: 640px) {
		.tab-item {
			padding: 6px 10px;
			font-size: 11px;
		}
	}
</style>
