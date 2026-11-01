<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	let { open = $bindable(false), onSignedIn }: { open?: boolean; onSignedIn?: () => void } =
		$props();

	let dialogCard = $state<HTMLDivElement>();

	$effect(() => {
		if (!open) return;

		dialogCard?.focus();

		const { body } = document;
		body.classList.add('overflow-hidden');

		return () => {
			body.classList.remove('overflow-hidden');
		};
	});

	function close() {
		open = false;
	}

	function handleGoogleSignIn() {
		onSignedIn?.();
		close();
	}
</script>

<svelte:window
	onkeydown={(event) => {
		if (open && event.key === 'Escape') close();
	}}
/>

{#if open}
	<div
		class="backdrop"
		role="presentation"
		tabindex="-1"
		transition:fade={{ duration: 200 }}
		onclick={(event) => {
			if (event.target === event.currentTarget) close();
		}}
		onkeydown={(event) => {
			if (event.key === 'Escape') close();
		}}
	>
		<div
			class="sign-in-card"
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			aria-labelledby="sign-in-title"
			bind:this={dialogCard}
			transition:scale={{ duration: 200, start: 0.95, opacity: 0 }}
		>
			<h3 id="sign-in-title">Sign in</h3>

			<p class="lede">
				Follow your custom tickers &amp; market desks, and keep what you've read, annotated, and
				saved in sync across your devices.
			</p>

			<button type="button" class="google-btn" onclick={handleGoogleSignIn}>
				<svg class="google-logo" viewBox="0 0 24 24" aria-hidden="true">
					<path
						fill="#4285F4"
						d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
					/>
					<path
						fill="#34A853"
						d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.26 21.36 7.33 24 12 24z"
					/>
					<path
						fill="#FBBC05"
						d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.13z"
					/>
					<path
						fill="#EA4335"
						d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
					/>
				</svg>
				<span>Continue with Google</span>
			</button>

			<p class="privacy">We only see your name and profile picture.</p>

			<button type="button" class="not-now" onclick={close}>Not now</button>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		background-color: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	.sign-in-card {
		position: relative;
		width: 100%;
		max-width: 390px;
		padding: 28px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		text-align: center;
		background-color: #14171d;
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 24px;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9);
		outline: none;
	}

	h3 {
		margin: 0 0 10px;
		font-size: 20px;
		font-weight: 700;
		color: #f5f5f5;
		text-align: left;
	}

	.lede {
		margin: 0 0 24px;
		font-size: 13.5px;
		font-weight: 400;
		line-height: 1.6;
		color: #a3a3a3;
		text-align: left;
	}

	.google-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		width: 100%;
		padding: 12px 16px;
		margin-bottom: 12px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 14px;
		font-weight: 500;
		color: #171717;
		background-color: #fff;
		border: none;
		border-radius: 9999px;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			transform 0.1s ease;
	}

	.google-btn:hover {
		background-color: #f5f5f5;
	}

	.google-btn:active {
		transform: scale(0.98);
	}

	.google-logo {
		flex-shrink: 0;
		width: 16px;
		height: 16px;
	}

	.privacy {
		margin: 0 0 20px;
		font-size: 11.5px;
		color: #737373;
	}

	.not-now {
		padding: 4px 12px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 12px;
		font-weight: 600;
		color: #d4d4d4;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.not-now:hover {
		color: #fff;
	}
</style>
