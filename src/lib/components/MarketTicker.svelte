<script lang="ts">
	import { tickerItems } from '$lib/ticker/ticker-config.js';
</script>

<aside class="ticker-strip" aria-label="Live market ticker">
	<div class="ticker-track">
		{#each [0, 1] as copy (copy)}
			<div class="ticker-group" aria-hidden={copy === 1}>
				{#each tickerItems as item, index (item.symbol)}
					<span class="ticker-item">
						<strong>{item.symbol}</strong>
						<span>{item.value}</span>
						<span
							class="change"
							class:up={item.direction === 'up'}
							class:down={item.direction === 'down'}
						>
							{item.change}
						</span>
					</span>
					{#if index < tickerItems.length - 1}
						<span class="sep">/</span>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</aside>

<style>
	.ticker-strip {
		position: fixed;
		top: 84px;
		left: 0;
		right: 0;
		z-index: 49;
		padding: 6px 0;
		overflow: hidden;
		white-space: nowrap;
		user-select: none;
		background-color: #070a0f;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 12px;
		line-height: 1.4;
	}

	.ticker-track {
		display: flex;
		width: max-content;
		animation: tickerSlide 35s linear infinite;
	}

	.ticker-strip:hover .ticker-track {
		animation-play-state: paused;
	}

	.ticker-group {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 0 1rem;
		color: rgba(163, 163, 163, 1);
	}

	.ticker-item {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
	}

	.ticker-item strong {
		color: rgba(229, 229, 229, 1);
		font-weight: 600;
	}

	.change {
		font-weight: 600;
	}

	.change.up {
		color: #34d399;
	}

	.change.down {
		color: #fb7185;
	}

	.sep {
		color: rgba(64, 64, 64, 1);
	}

	@keyframes tickerSlide {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (max-width: 640px) {
		.ticker-strip {
			top: 60px;
			font-size: 11px;
		}

		.ticker-group {
			gap: 1.25rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ticker-track {
			animation: none;
		}
	}
</style>
