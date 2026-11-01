<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import MarketTicker from '$lib/components/MarketTicker.svelte';
	import NavPills from '$lib/components/NavPills.svelte';
	import SignInModal from '$lib/components/auth/SignInModal.svelte';
	import '@fontsource/plus-jakarta-sans';
	import '@fontsource/cinzel/400.css';
	import '@fontsource/cinzel/600.css';
	import '@fontsource/cinzel/700.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/500.css';
	import '@fontsource/jetbrains-mono/600.css';

	let { children } = $props();
	let signInOpen = $state(false);
	let signedIn = $state(false);
</script>

<header class="nav-bar">
	<div class="brand">
		<!-- svelte-ignore a11y_missing_attribute -->
		<img src="space_craft.png" height="60" />
	</div>

	<NavPills />

	<div class="header-actions">
		{#if signedIn}
			<button type="button" class="sign-in-btn signed-in" onclick={() => (signInOpen = true)}>
				<span class="status-dot"></span>Portfolio Pro
			</button>
		{:else}
			<button type="button" class="sign-in-btn" onclick={() => (signInOpen = true)}>Sign in</button>
		{/if}
	</div>
</header>
<MarketTicker />
<SignInModal bind:open={signInOpen} onSignedIn={() => (signedIn = true)} />
{@render children()}

<style>
	.nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding: 0.75rem 2rem;
		background-color: rgba(5, 7, 10, 0.75);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.brand {
		justify-self: start;
		display: flex;
		align-items: center;
	}

	.brand img {
		display: block;
		height: 60px;
		width: auto;
	}

	.header-actions {
		justify-self: end;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.sign-in-btn {
		padding: 6px 16px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 12px;
		font-weight: 500;
		color: #d4d4d4;
		background-color: #171717;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 9999px;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.sign-in-btn:hover {
		color: #fff;
		background-color: #262626;
	}

	.sign-in-btn.signed-in {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}

	.status-dot {
		width: 6px;
		height: 6px;
		background-color: #34d399;
		border-radius: 9999px;
	}

	.sign-in-btn:focus-visible {
		outline: 2px solid rgba(34, 211, 238, 0.6);
		outline-offset: 2px;
	}

	@media (max-width: 640px) {
		.nav-bar {
			padding: 0.5rem 1rem;
		}

		.brand img {
			height: 44px;
		}
	}
</style>
