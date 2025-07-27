<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { fade } from 'svelte/transition';
	import { Row, Col, Container } from '@sveltestrap/sveltestrap';
	let active_tab = $state(1);

	let { children } = $props();
</script>

<div class="nav-bar">
	<Container fluid class="py-2 px-5">
		<Row class="d-flex justify-content-between align-item-center">
			<Col xs="3" class="d-flex align-items-center">
				<!-- svelte-ignore a11y_missing_attribute -->
				<img src="space_craft.png" height="60" />
			</Col>
			<Col xs="6" class="d-flex justify-content-center align-items-center">
				<div class="page-selector">
					<Container fluid class="py-2">
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
									Content-1
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
									Content-2
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
									Content-3
								</div></Col
							>
						</Row>
					</Container>
				</div>
			</Col>
			<Col xs="3" class="d-flex justify-content-end align-items-center">
				<div class="contact-us-nav-bar">
					<p>Contact Us</p>
					<img src="rocket-contact-us.png" alt="icon" class="icon" />
				</div>
			</Col>
		</Row>
	</Container>
</div>
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
		width: 400px;
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

	.contact-us-nav-bar {
		width: 150px;
		height: 30px;
		background-color: white;
		border-radius: 25px;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-left: 12px;
	}
	.contact-us-nav-bar p {
		margin-top: 12px;
		font-size: medium;
	}
	.icon {
		width: 30px;
		height: 30px;
	}
</style>
