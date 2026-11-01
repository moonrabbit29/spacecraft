<script lang="ts">
	import { Container } from '@sveltestrap/sveltestrap';
	import { onMount, onDestroy, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { browser } from '$app/environment';
	import JournalPage from '$lib/components/journal/JournalPage.svelte';
	import SocialMediaSection from '$lib/components/sections/SocialMediaSection.svelte';
	import { currentHomePage } from '$lib/stores/HomePageStore.js';

	let isScrolling = false;
	let isAtTopPage2 = false;
	let isAtBtmPage1 = false;
	let topPage2Sentinel = $state<HTMLDivElement>();
	let bottomPage1Sentinel = $state<HTMLDivElement>();
	let observer: IntersectionObserver;
	let lastPage: number | null = null;
	const transitionDuration = 1000;

	$effect(() => {
		void handlePageChange($currentHomePage);
	});

	function observeAll() {
		if (topPage2Sentinel && $currentHomePage === 1) observer.observe(topPage2Sentinel);
		if (bottomPage1Sentinel && $currentHomePage === 0) observer.observe(bottomPage1Sentinel);
	}

	onMount(() => {
		if (!browser) return;

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.target === topPage2Sentinel) {
						isAtTopPage2 = entry.isIntersecting;
					}
					if (entry.target === bottomPage1Sentinel) {
						isAtBtmPage1 = entry.isIntersecting;
					}
				});
			},
			{ threshold: 0 }
		);
		observeAll();
	});

	onDestroy(() => {
		if (!browser) return;
		observer?.disconnect();
	});

	async function handlePageChange(page: number) {
		await tick();
		if (!observer) return;
		if (page === lastPage) return;
		if (page !== 0) {
			isAtBtmPage1 = false;
		}
		if (page !== 1) {
			isAtTopPage2 = false;
		}
		lastPage = page;
		observer.disconnect();
		await tick();
		observeAll();
	}

	async function goToJournal() {
		currentHomePage.set(1);
		await tick();
		document.getElementById('journal')?.scrollIntoView({ behavior: 'smooth' });
	}

	function handleScroll(event: WheelEvent) {
		if (isScrolling) {
			event.preventDefault();
			return;
		}

		const delay = $currentHomePage === 0 ? transitionDuration : 0;
		isScrolling = true;

		currentHomePage.update((page) => {
			if (event.deltaY > 0 && isAtBtmPage1) {
				event.preventDefault();
				return page + 1;
			}
			if (event.deltaY < 0 && page > 0 && isAtTopPage2) {
				event.preventDefault();
				return page - 1;
			}
			return page;
		});

		setTimeout(() => {
			isScrolling = false;
		}, delay);
	}
</script>

<div class="home-page" onwheel={handleScroll}>
	{#if $currentHomePage === 0}
		<div id="hero" class="video-wrapper" transition:fly={{ duration: transitionDuration }}>
			<video src="animated wave 2.mp4" autoplay muted loop playsinline preload="auto"></video>
			<div class="video-overlay"></div>
			<div class="hero-content">
				<Container fluid>
					<div class="hero-inner">
						<div class="eyebrow">Intelligence &amp; Capital Desks</div>
						<div class="larger-text">
							A NEW STEP <span class="accent-word">into</span>
						</div>
						<div class="largest-text" bind:this={bottomPage1Sentinel}>WHAT'S POSSIBLE.</div>
						<button type="button" class="start-project-btn" onclick={goToJournal}>
							<span class="cta-label">Explore Daily Journal</span>
							<span class="cta-icon">
								<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.5"
										d="M19 14l-7 7m0 0l-7-7m7 7V3"
									/>
								</svg>
							</span>
						</button>
					</div>
				</Container>
			</div>
		</div>
	{:else if $currentHomePage === 1}
		<div class="page2">
			<div class="page2-sentinel" bind:this={topPage2Sentinel}></div>
			<JournalPage />
			<SocialMediaSection />
		</div>
	{/if}
</div>

<style>
	.home-page {
		position: relative;
		min-height: 100vh;
		background-color: black;
	}

	.video-wrapper {
		position: relative;
		z-index: 3;
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
	}

	.page2 {
		height: 100vh;
		padding-top: 64px;
		overflow-y: auto;
		scroll-behavior: smooth;
	}

	.page2::-webkit-scrollbar {
		display: none;
	}

	.page2-sentinel {
		height: 50px;
	}

	.video-wrapper video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center center;
	}

	.video-overlay {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	.hero-content {
		position: relative;
		z-index: 4;
		padding-top: 52vh;
		font-family: 'Plus Jakarta Sans', sans-serif;
		color: white;
		text-align: center;
	}

	.hero-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.eyebrow {
		display: inline-block;
		padding: 4px 14px;
		margin-bottom: 12px;
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 11px;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: #67e8f9;
		background-color: rgba(8, 51, 68, 0.4);
		border: 1px solid rgba(6, 182, 212, 0.2);
		border-radius: 9999px;
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	.larger-text {
		margin-bottom: 10px;
		font-family: 'Cinzel', serif;
		font-size: clamp(1.1rem, 2.4vw, 1.5rem);
		font-weight: 400;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: #d4d4d4;
	}

	.accent-word {
		margin-left: 0.18em;
		font-family: 'Instrument Serif', serif;
		font-style: italic;
		font-weight: 400;
		letter-spacing: normal;
		text-transform: none;
		color: rgba(253, 230, 138, 0.9);
	}

	.largest-text {
		margin-bottom: 32px;
		font-family: 'Cinzel', serif;
		font-size: clamp(2.75rem, 7vw, 5.5rem);
		font-weight: 700;
		line-height: 1.05;
		letter-spacing: 0.01em;
		color: #fff;
		text-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
	}

	.start-project-btn {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		padding: 12px 20px 12px 24px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.6);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 9999px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		cursor: pointer;
		transition:
			background-color 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease;
	}

	.start-project-btn:hover {
		color: #000;
		background-color: #fff;
		border-color: #fff;
	}

	.cta-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		color: #000;
		background-color: #fff;
		border-radius: 9999px;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.start-project-btn:hover .cta-icon {
		color: #fff;
		background-color: #000;
	}

	.cta-icon svg {
		width: 14px;
		height: 14px;
		transition: transform 0.3s ease;
	}

	.start-project-btn:hover .cta-icon svg {
		transform: translateY(2px);
	}

	@media (max-width: 768px) {
		.hero-content {
			padding-top: 50vh;
		}

		.eyebrow {
			font-size: 9px;
			letter-spacing: 0.2em;
		}

		.larger-text {
			font-size: 0.95rem;
			letter-spacing: 0.18em;
		}

		.largest-text {
			font-size: clamp(2rem, 10vw, 3rem);
		}
	}
</style>
