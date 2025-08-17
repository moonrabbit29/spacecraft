<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { Col, Container, Row } from '@sveltestrap/sveltestrap';
	import '@fontsource/instrument-serif';
	import '@fontsource/plus-jakarta-sans';
	import '@fontsource/plus-jakarta-sans/300.css';
	import '@fontsource/plus-jakarta-sans/400.css';
	import '@fontsource/instrument-serif';
	import { currentHomePage } from '$lib/stores/HomePageStore.js';
	import { fly } from 'svelte/transition';
	import Marquee from 'svelte-fast-marquee';
	import { onMount, onDestroy, afterUpdate } from 'svelte';

	let isScrolling = false;
	let listOfPartner = ['customer_list/tbd-1.png', 'customer_list/tbd-2.png'];
	let isAtTopPage2 = false;
	let topSentinel: HTMLDivElement;
	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver(
			([entry]) => {
				isAtTopPage2 = entry.isIntersecting;
				console.log(isAtTopPage2);
			},
			{ threshold: 1 }
		); // 100% visible

		if (topSentinel) observer.observe(topSentinel);
	});

	onDestroy(() => {
		if (topSentinel) observer.unobserve(topSentinel);
	});

	afterUpdate(() => {
		if ($currentHomePage === 1 && topSentinel) {
			observer?.disconnect();
			observer.observe(topSentinel);
		}
	});

	function handleScroll(event: WheelEvent) {
		if (isScrolling) {
			event.preventDefault();
			return;
		}
		const delay = $currentHomePage === 0 ? 1000 : 0;
		isScrolling = true;
		currentHomePage.update((n) => {
			if (event.deltaY > 0 && n < 1) {
				event.preventDefault();
				return n + 1;
			}
			if (event.deltaY < 0 && n > 0 && isAtTopPage2) {
				event.preventDefault();
				return n - 1;
			}
			return n;
		});
		setTimeout(() => {
			isScrolling = false;
		}, delay);
	}

	//Review section logic
	let reviewTitles = ['Passengers\nof\nWords', 'Eleya']; //TODO : make dynamic fetching from db
	let reviewDescriptions = [
		`I had the pleasure of working with Spacecraft on a UI/UX design project for my
								company's website redesign. From the start, Spacecraft was professional, responsive,
								and attentive to our needs. They listened carefully to our ideas and goals for the
								website and brought their own creative input to the table. The end result was a
								stunning website that exceeded our expectations. The user interface was intuitive
								and easy to navigate, and the overall design was modern and visually appealing. Hive
								Studio also made sure to incorporate our branding elements throughout the site,
								which really tied everything together.`,
		'Eleya'
	]; //TODO : make dynamic fetching from db

	let maxReviewIndex = reviewTitles.length - 1;
	let currentReviewIndex = 0;

	//param i = 0 -> left arrow click; i=1 -> right arrow click
	function handleReviewDiscover(i: Number) {
		if (i === 0 && currentReviewIndex != 0) {
			currentReviewIndex -= 1;
		} else if (i === 1 && currentReviewIndex != maxReviewIndex) {
			currentReviewIndex += 1;
		}
	}
</script>

<div class="home-page" on:wheel={handleScroll}>
	{#if $currentHomePage === 0}
		<div class="video-wrapper" transition:fly={{ duration: 1000 }}>
			<video src="animated waves.mp4" autoplay muted loop playsinline preload="auto"></video>
			<div class="video-overlay"></div>
			<div class="hero-content">
				<Container fluid>
					<Row
						><div class="larger-text">
							A NEW STEP <em style="text-decoration: underline;">into</em>
						</div></Row
					>
					<Row><div class="largest-text">WHAT'S POSSIBLE.</div></Row>
					<Row class="d-flex justify-content-center">
						<div class="start-project-btn">
							<p>Explore Our Journey</p>
							<img src="icons/White Rocket Icon.png" alt="icon" class="icon" />
						</div>
					</Row>
				</Container>
			</div>
		</div>
	{:else}
		<div class="page2">
			<div style="height: 50px;" bind:this={topSentinel}></div>
			<div class="client-list">
				<Container>
					<Row>
						<Col class="d-flex justify-content-center">
							<div
								style="font-family: 'Instrument Serif', serif;
									   font-size: 1.75rem;
									   font-weight: lighter;
									   color: white;"
							>
								Guided by the stars, grounded in purpose
							</div>
						</Col>
					</Row>
					<Row style="margin-top:50px;">
						<Col md={{ size: 8, offset: 2 }}>
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
				<Container>
					<Row>
						<Col md={{ size: 3, offset: 2 }}>
							<div class="medium-text-jakarta" style="font-weight:bold">Our latest project</div>
						</Col>
						<Col md={{ size: 5 }}>
							<div
								style="font-family: 'Plus Jakarta Sans', serif;
									   font-size: 0.75rem;
									   font-weight: 100;
									   color: white;"
							>
								Lorem ipsum dolor sit amet consectetur. Hac ridiculus enim id sit massa in auctor
								mattis. Nulla ut aliquet odio at sit vitae venenatis fames venenatis. Tortor
								adipiscing dignissim volutpat egestas et ut nulla justo
							</div>
						</Col>
					</Row>
					<Row style="margin-top:30px; height:550px; overflow: hidden;">
						<Col md={{ offset: 3 }}>
							<img
								class="latest-project-img-dashboard"
								src="our_latest_project/T-ORION.jpg"
								alt="project-1"
							/>
						</Col>
						<!-- <Col md={{ size: 4 }}>
							<img
								class="latest-project-img-phone"
								src="our_latest_project/Aiden.png"
								alt="project-1"
							/>
						</Col> -->
					</Row>
					<Row style="margin-top:15px">
						<Col md={{ size: 3, offset: 2 }}>
							<div class="medium-text-jakarta" style="font-weight: bold;">What ever lah</div>
						</Col>
					</Row>
					<Row style="margin-top:10px">
						<Col md={{ offset: 2 }}>
							<div style="display: flex; flex-direction: row; gap: 8px; align-items: flex-start;">
								<div class="latest-project-label">label-1</div>
								<div class="latest-project-label">label-2</div>
							</div>
						</Col>
					</Row>
					<Row style="margin-top:30px">
						<Col md={{ size: 4, offset: 2 }}>
							<div
								style="	font-size: medium;
		font-family: 'Instrument Serif', serif; color:white"
							>
								Lorem ipsum dolor sit amet consectetur. Hac ridiculus enim id sit massa in auctor
								mattis. Nulla ut aliquet odio at sit vitae venenatis fames venenatis. Tortor
								adipiscing dignissim volutpat egestas et ut nulla justo
							</div>
						</Col>
						<Col></Col>
					</Row>
					<Row style="margin-top:50px">
						<Col md={{ offset: 2 }}>
							<img
								style="width:900px; height:450px"
								src="our_latest_project/T-EUNOIA.jpg"
								alt="eunoia"
							/>
						</Col>
					</Row>
					<Row style="margin-top:50px">
						<Col md={{ offset: 5 }}>
							<div class="view-all-project">
								View all project
								<img src="ooui_arrow-next-ltr.png" alt="icon" style="widht:15px;height:15px" />
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<div class="customer-review-section">
				<Container style="padding-top:100px">
					<Row class="mb-5">
						<Col md={{ offset: 2, size: 2 }}>
							<div class="review-title">{reviewTitles[currentReviewIndex]}</div>
						</Col>
						<Col>
							<div class="review-comment">{reviewDescriptions[currentReviewIndex]}</div>
						</Col>
					</Row>
					<Row>
						<Col md={{ offset: 2, size: 2 }}>
							<div class="review-page"><b>{currentReviewIndex}</b> - {maxReviewIndex}</div>
						</Col>
						<Col>
							<div class="review-author">
								<img src="review/avatar-1.png" alt="review-avatar" class="review-avatar" />
								<div style="margin-left:20px">
									<div class="review-author-name">Ehwa Yeon</div>
									<div class="review-author-title">CEO of Moonbeam</div>
								</div>
							</div>
						</Col>
						<Col style="display: flex; flex-direction: row; gap: 1rem; justify-content:center; align-items:center">
							<img class="review-arrow-left" src="review/review-arrow-left-bold.png" alt="review-arrow"/>
							<img class="review-arrow-right" src="review/review-arrow-right-bold.png" alt="review-arrow"/>
						</Col>
					</Row>
				</Container>
			</div>
			<div class="social-media-section">
				<img src="social/cat-stronout.png" alt="cat" class="cat-stronout-img" />
				<Container fluid style="padding-top:75px">
					<Row class="d-flex align-items-center" style="z-index:1; position: relative;">
						<Col md={{ offset: 2 }}>
							<div class="medium-text-jakarta" style="font-size: 3.75rem;">INTERESTED IN</div>
						</Col>
					</Row>
					<Row class="d-flex align-items-center mb-5" style=" z-index:1; position: relative;">
						<Col md={{ offset: 2 }}>
							<div class="medium-text-jakarta" style="font-weight:bold; font-size: 3.75rem;">
								WORKING TOGETHER WITH US?
							</div>
						</Col>
					</Row>
					<Row class="d-flex align-items-center mb-4" style=" z-index:1;">
						<Col md={{ offset: 2 }}>
							<div class="start-a-project-social-media">
								<p
									style="margin-top: 15px;
										   margin-left: 5px;
										   font-size: small;
										   font-family: 'Plus Jakarta Sans', sans-serif;
										   	color: white;  
										   "
								>
									Start a Project
								</p>
								<img src="icons/arrow.png" alt="icon" class="icon-in-social-media-section" />
							</div>
						</Col>
					</Row>
					<Row class="mb-4">
						<Col md={{ offset: 2, size: 8 }}>
							<hr style="border: none; height: 2px; background: white;" />
						</Col>
					</Row>
					<Row class="d-flex align-items-center mb-5">
						<Col md={{ offset: 2 }}>
							<!-- svelte-ignore a11y_consider_explicit_label -->
							<a
								href="https://www.instagram.com/arfianaarya"
								target="_blank"
								style="text-decoration: none;"
							>
								<div class="social-media-button">
									<p
										style="margin-top: 15px;
										   margin-left: 5px;
										   font-size: small;
										   font-family: 'Plus Jakarta Sans', sans-serif;
										   	color: black; 
											font-weight:bold; 
										   "
									>
										Instagram
									</p>
								</div>
							</a>
						</Col>
					</Row>
					<Row class="d-flex align-items-center justify-content-center mt-5">
						<img src="space_craft.png" alt="cat" class="space-craft-footer-img" />
					</Row>
				</Container>
			</div>
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

	.page2 {
		height: 100vh;
		overflow-y: auto;
		scroll-behavior: smooth;
	}

	.page2::-webkit-scrollbar {
		display: none;
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
		width: 180px;
		border: 1px solid #fafafa;
		font-size: medium;
		background-color: rgb(0, 0, 0, 0.4);
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.start-project-btn p {
		margin-top: 12px;
		font-weight: normal;
		font-size: 0.75rem;
		font-family: 'Plus Jakarta Sans', sans-serif;
	}

	.start-project-btn img {
		width: 25px;
		height: 25px;
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
		color: white;
	}
	.largest-text {
		font-family: 'Instrument Serif', serif;
		font-size: 5rem;
		font-weight: lighter;
		color: white;
	}

	.smaller-text {
		font-family: 'Instrument Serif', serif;
		font-size: 1.5rem;
		font-weight: normal;
		color: white;
	}

	.medium-text {
		font-family: 'Instrument Serif', serif;
		font-size: 2rem;
		font-weight: lighter;
		color: white;
	}

	.medium-text-jakarta {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 2rem;
		font-weight: lighter;
		color: white;
	}

	.smallest-text {
		font-family: 'Instrument Serif', serif;
		font-size: 1rem;
		font-weight: lighter;
		color: white;
	}

	.marquee {
		width: 100%;
		overflow: hidden;
		position: relative;
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

	.our-latest-project {
		margin-top: 50px;
	}

	.latest-project-img-dashboard {
		width: 50%;
		height: auto;
	}
	.latest-project-img-phone {
		width: 50%;
		height: 35%;
	}
	.latest-project-label {
		color: white;
		min-width: 75px;
		padding: 4px 8px;
		height: 25px;
		border-radius: 25px;
		border: 1px solid #fafafa;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		font-size: small;
		font-family: 'Plus Jakarta Sans', sans-serif;
	}

	.view-all-project {
		color: white;
		cursor: pointer;
		font-size: medium;
		margin-left: 35px;
	}

	.customer-review-section {
		margin-top: 50px;
		height: 550px;
		width: 100%;
		background-color: #fafafa;
	}

	.social-media-section {
		height: 500px;
		width: 100%;
		background-color: black;
		position: relative;
	}

	.start-a-project-social-media {
		width: 150px;
		height: 30px;
		background-color: black;
		border-radius: 25px;
		border-width: 0.5px;
		border-style: solid;
		border-color: white;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding-left: 12px;
		cursor: pointer;
	}

	.social-media-button {
		width: 125px;
		height: 30px;
		background-color: white;
		border-radius: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.icon-in-social-media-section {
		width: 25px;
		height: 25px;
	}

	.cat-stronout-img {
		position: absolute;
		width: 30%;
		min-height: 50vh;
		z-index: 0;
		right: 0;
		top: 0;
		overflow: hidden;
	}

	.space-craft-footer-img {
		position: relative;
		width: 20%;
		min-height: 20%;
		z-index: 0;
		overflow: hidden;
	}

	.review-title {
		color: black;
		font-family: 'Instrument Serif', serif;
		font-size: 2.25rem;
		word-wrap: break-word;
		white-space: pre-line;
		width: 150px;
		height: auto;
	}
	.review-comment {
		font-size: 1.1rem;
		font-family: 'Plus Jakarta Sans', sans-serif;
		color: black;
		width: 700px;
		height: auto;
		text-align: justify;
		word-wrap: break-word;
	}
	.review-page {
		font-size: 2.5rem;
		font-family: 'Plus Jakarta Sans', sans-serif;
		color: black;
		width: 700px;
		height: 100px;
		text-align: justify;
		word-wrap: break-word;
		font-weight: lighter;
	}

	.review-author {
		display: flex;
		flex-direction: row;
	}
	.review-avatar{
		width: 70px;
		height: 70px;
	}
	.review-author-name {
		font-size: 1.5rem;
		font-family: 'Plus Jakarta Sans', sans-serif;
		color: black;
		font-weight: bold;
	}

	.review-author-title {
		font-size: 0.75rem;
		font-family: 'Plus Jakarta Sans', sans-serif;
		color: black;
		font-weight: lighter;
	}
	.review-arrow-left,
	.review-arrow-right{
		width: 40px;
		height: 40px;
		justify-content: center;
		display: flex;
	}
</style>
