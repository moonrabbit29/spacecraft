<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { Col, Container, Row } from '@sveltestrap/sveltestrap';
	import '@fontsource/instrument-serif';
	import { currentHomePage } from '$lib/stores/HomePageStore.js';
	import { fly, fade } from 'svelte/transition';
	import Marquee from 'svelte-fast-marquee';

	let isScrolling = false;
	let listOfPartner = ['customer_list/tbd-1.png', 'customer_list/tbd-2.png'];
	function handleScroll(event: WheelEvent) {
		event.preventDefault();
		if (isScrolling) {
			event.preventDefault();
			return;
		}
		isScrolling = true;
		currentHomePage.update((n) => {
			if (event.deltaY > 0 && n < 1) return n + 1;
			if (event.deltaY < 0 && n > 0) return n - 1;
			return n;
		});

		setTimeout(() => {
			isScrolling = false;
		}, 1000); // 1.5 second delay between scrolls
	}
</script>

<div class="home-page" on:wheel={handleScroll}>
	{#if $currentHomePage === 0}
		<div class="video-wrapper" transition:fly={{ duration: 1000 }}>
			<video src="animated waves.mp4" autoplay muted loop playsinline preload="auto"></video>
			<div class="video-overlay"></div>
			<div class="hero-content">
				<Container fluid>
					<Row><div class="larger-text">A NEW STEP <em>into</em></div></Row>
					<Row><div class="largest-text">WHAT'S POSSIBLE.</div></Row>
					<Row class="d-flex justify-content-center">
						<div class="start-project-btn">
							<p>Start a project</p>
							<img src="arrow.png" alt="icon" class="icon" />
						</div>
					</Row>
				</Container>
			</div>
		</div>
	{:else}
		<div style="height: 50px;"></div>
		<div class="client-list">
			<Container>
				<Row>
					<Col class="d-flex justify-content-center">
						<div class="medium-text">Guided by the stars, grounded in purpose</div>
					</Col>
				</Row>
				<Row style="margin-top:50px">
					<Col md={{ size: 10, offset: 1 }}>
						<div class="marquee">
							<div class="overlay left"></div>
							<Marquee pauseOnHover={true} speed={50}>
								{#each Array(4) as _, i}
									{#each listOfPartner as item}
										<div class="customer-logo-container">
											<img class="customer-logo" src={item} alt="customer-logo" />
										</div>
									{/each}
								{/each}
							</Marquee>
							<div class="overlay right"></div>
						</div></Col
					>
				</Row>
			</Container>
		</div>
		<div class="our-latest-project">
			
		</div>
	{/if}
</div>

<style>
	.home-page {
		background-color: black;
		min-height: 100vh;
		position: relative;
	}
	.video-wrapper {
		position: relative;
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		z-index: 3;
	}

	.video-wrapper video {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 120%;
		object-fit: cover;
	}

	.hero-content {
		position: relative;
		z-index: 4;
		color: white;
		text-align: center;
		padding-top: 60vh;
	}

	.hero-content {
		font-family: 'Instrument Serif', serif;
	}

	.start-project-btn {
		border-radius: 25px;
		width: 150px;
		border: 1px solid #fafafa;
		font-size: medium;
		background-color: rgb(0, 0, 0, 0.4);
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.start-project-btn p {
		margin-top: 12px;
		font-size: 1rem;
		font-weight: lighter;
		font-family: 'Instrument Serif', serif;
	}
	.video-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 1;
	}

	.client-list {
		z-index: 2;
		font-family: 'Instrument Serif', serif;
		color: white;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.icon {
		width: 30px;
		height: 30px;
	}

	.larger-text {
		font-family: 'Instrument Serif', serif;
		font-size: 2.5rem;
		font-weight: lighter;
	}
	.largest-text {
		font-family: 'Instrument Serif', serif;
		font-size: 5rem;
		font-weight: lighter;
	}

	.medium-text {
		font-family: 'Instrument Serif', serif;
		font-size: 1.5rem;
		font-weight: lighter;
	}

	.marquee {
		width: 100%;
		overflow: hidden;
		position:relative
	}

	.customer-logo-container {
		padding: 1rem;
	}
	.customer-logo {
		width: 100px;
	}
	.overlay {
		position: absolute;
		top: 0;
		width: 50px;
		height: 100%;
		z-index: 2;
		pointer-events: none;
	}

	.left {
		background: linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent);
	}

	.right {
		right: 0;
		background: linear-gradient(to left, rgba(0, 0, 0, 0.8), transparent);
	}
</style>
