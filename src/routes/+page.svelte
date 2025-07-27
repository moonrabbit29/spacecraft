<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { Col, Container, Row } from '@sveltestrap/sveltestrap';
	import { onDestroy, onMount } from 'svelte';
	import '@fontsource/instrument-serif';
</script>

<div class="home-page">
	<div class="video-wrapper">
		<video src="animated waves.mp4" autoplay muted loop playsinline preload="auto"></video>
		<div class="video-overlay"></div>
		<div class="hero-content">
			<Container fluid>
				<Row><h2>A NEW STEP <em>into</em></h2></Row>
				<Row><h1>WHAT'S POSSIBLE.</h1></Row>
				<Row class="d-flex justify-content-center">
					<div class="start-project-btn">Start a project</div></Row
				>
			</Container>
		</div>
	</div>
    <div class="client-list">
        <h1>Guided by the stars, grounded in purpose</h1>
    </div>
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
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-content {
		position: relative;
		z-index: 4;
		color: white;
		text-align: center;
		padding-top: 65vh;
	}

	.hero-content h1,
	.hero-content h2,
	.hero-content {
		font-family: 'Instrument Serif', serif;
	}

	.start-project-btn {
		border-radius: 25px;
		width: 125px;
		border: 1px solid #fafafa;
		font-size: medium;
		background-color: rgb(0, 0, 0, 0.4);
		color: white;
		cursor: pointer;
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
    }
</style>
