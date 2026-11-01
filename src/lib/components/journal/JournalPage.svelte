<script lang="ts">
	import ArticleCard from './ArticleCard.svelte';
	import JournalToolbar from './JournalToolbar.svelte';
	import { journalArticles } from '$lib/journal/journal-config.js';
	import { journalController } from '$lib/journal/journal-controller.svelte.js';
</script>

<main id="journal" class="journal-page">
	<JournalToolbar />

	<div class="articles">
		{#each journalController.filteredArticles as article (article.id)}
			<ArticleCard {article} />
		{/each}
	</div>

	{#if journalController.filteredArticles.length === 0}
		<div class="empty-state">
			<div class="empty-icon">🔍</div>
			<h4>No matching market dispatches</h4>
			<p>Try querying different asset tickers (e.g. $NVDA, $SPY) or broad terms.</p>
		</div>
	{/if}

	<div class="feed-footer">
		<span
			>Showing {journalController.filteredArticles.length} of {journalArticles.length} updates</span
		>
		<button type="button">Load Older Dispatches ↓</button>
	</div>
</main>

<style>
	.journal-page {
		position: relative;
		scroll-margin-top: 114px;
		z-index: 10;
		width: 100%;
		max-width: 896px;
		margin: 0 auto;
		padding: 48px 16px 96px;
		font-family: 'Plus Jakarta Sans', sans-serif;
	}

	.articles {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.empty-state {
		padding: 64px 16px;
		text-align: center;
	}

	.empty-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		margin: 0 auto 12px;
		color: #a3a3a3;
		background-color: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 9999px;
	}

	.empty-state h4 {
		margin: 0;
		font-size: 16px;
		font-weight: 600;
		color: #e5e5e5;
	}

	.empty-state p {
		margin: 4px 0 0;
		font-size: 12px;
		color: #737373;
	}

	.feed-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-top: 32px;
		padding-top: 24px;
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 12px;
		color: #a3a3a3;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.feed-footer button {
		padding: 8px 16px;
		font-family: inherit;
		font-size: 12px;
		color: #e5e5e5;
		background-color: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.feed-footer button:hover {
		background-color: rgba(255, 255, 255, 0.08);
	}

	@media (min-width: 640px) {
		.journal-page {
			padding-right: 24px;
			padding-left: 24px;
		}
	}

	@media (max-width: 640px) {
		.feed-footer {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
