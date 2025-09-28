<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { Row, Col, Container } from '@sveltestrap/sveltestrap';
	import { currentHomePage } from '$lib/stores/HomePageStore.js';
	import "@fontsource/plus-jakarta-sans"
	import { page } from '$app/state';

	const getCurrentPage = page; // declare $page for rune usage
	const currentPath = $derived(getCurrentPage.url.pathname);
	let active_tab = $state(1);
	let { children } = $props();
</script>

{#if $currentHomePage === 0 || currentPath!="/"}
<div class="nav-bar">
	<Container fluid class="py-2 px-5">
		<Row class="d-flex justify-content-between align-item-center">
			<Col xs="3" class="d-flex align-items-center">
				<!-- svelte-ignore a11y_missing_attribute -->
				<img src="space_craft.png" height="60" />
			</Col>
			<Col xs="6" class="d-flex justify-content-center align-items-center">
				<div class="page-selector">
					<Container fluid class="py-2 px-3">
						<Row class="justify-content-between align-item-center">
							<Col>
								<div
									class="tab-item"
									class:active-tab={active_tab === 1}
									on:click={() => {
										active_tab = 1;
										console.log('active_tab berubah:', active_tab);
									}}
								>
									Home
								</div></Col
							>
							<Col
								><div
									class="tab-item"
									class:active-tab={active_tab === 2}
									on:click={() => {
										active_tab = 2;
									}}
								>
									StarLog
								</div></Col
							>
							<Col
								><div
									class="tab-item"
									class:active-tab={active_tab === 3}
									on:click={() => {
										active_tab = 3;
									}}
								>
									Cosmic Journal
								</div></Col
							>
						</Row>
					</Container>
				</div>
			</Col>
			<Col xs="3" class="d-flex justify-content-end align-items-center">
				<div class="start-a-project-nav-bar">
					<p>Start a Project</p>
					<img src="icons/start-a-project-arrow.png" alt="icon" class="icon" />
				</div>
			</Col>
		</Row>
	</Container>
</div>
{/if}
{@render children()}

<style>
	.nav-bar {
		position: absolute;
		background-color: white;
		background-color: transparent;
		z-index: 4;
		width: 100%;
	}
	.page-selector {
		width: 450px;
		height: 50px;
		background-color: rgba(255, 255, 255, 0.12);
		margin-top: 0.6rem;
		border-radius: 25px;
		border: 1px solid #fafafa;
	}

	.tab-item {
		display: flex;
		color: white;
		font-size: 15px;
		height: 4vh;
		border-radius: 20px;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.tab-item.active-tab {
		background-color: white;
		color: black;
	}

	.start-a-project-nav-bar {
		width: 150px;
		height: 30px;
		background-color: white;
		border-radius: 25px;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding-left: 12px;
		cursor: pointer;
	}
	.start-a-project-nav-bar p {
		margin-top: 15px;
		margin-left: 5px;
		font-size: small;
		font-weight: 800;
		font-family: 'Plus Jakarta Sans', sans-serif;
	}
	.icon {
		width: 30px;
		height: 30px;
	}
</style>
