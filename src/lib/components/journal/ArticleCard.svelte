<script lang="ts">
	import type { JournalArticle } from '$lib/journal/journal-config.js';
	import { journalController } from '$lib/journal/journal-controller.svelte.js';

	let { article }: { article: JournalArticle } = $props();
	let showImpact = $state(false);
</script>

<article class="post-card">
	<div class="meta-row">
		<div class="meta-left">
			<span class="dot {article.dotTone}"></span>
			<span class="source">{article.sourceLabel}</span>
			<span class="divider">·</span>
			<time>{article.time}</time>
			{#if article.status}
				<span class="divider">·</span>
				<span class="status">{article.status}</span>
			{/if}
		</div>

		<div class="meta-actions">
			<button
				type="button"
				class="impact-toggle"
				aria-expanded={showImpact}
				onclick={() => (showImpact = !showImpact)}
			>
				<svg class="spark" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" />
				</svg>
				<span>Impact Analysis</span>
			</button>
			<button
				type="button"
				class="save-toggle"
				class:saved={journalController.isSaved(article.id)}
				aria-label={journalController.isSaved(article.id)
					? 'Remove from watchlist'
					: 'Add to watchlist'}
				title={journalController.isSaved(article.id) ? 'Remove from watchlist' : 'Add to watchlist'}
				onclick={() => journalController.toggleSaved(article.id)}
			>
				<svg
					class="bookmark"
					fill={journalController.isSaved(article.id) ? 'currentColor' : 'none'}
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
					/>
				</svg>
			</button>
		</div>
	</div>

	<h3>{article.title}</h3>
	<p class="summary">{article.summary}</p>

	{#if showImpact}
		<div class="impact-drawer">
			<div class="impact-title">✨ AI Market Impact Synthesis</div>
			<ul>
				{#each article.impact as item (item.label)}
					<li><strong>{item.label}:</strong> {item.text}</li>
				{/each}
			</ul>
		</div>
	{/if}

	<div class="footer">
		<div class="tags">
			{#each article.tags as tag (tag.label)}
				<span class="tag {tag.tone}">{tag.label}</span>
			{/each}
		</div>
		<span class="read-meta">{article.readMeta}</span>
	</div>
</article>

<style>
	.post-card {
		padding: 20px;
		background-color: #090d15;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 16px;
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;
	}

	.post-card:hover {
		background-color: #0c121d;
		border-color: rgba(6, 182, 212, 0.3);
	}

	.meta-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 8px;
		font-size: 12px;
	}

	.meta-left {
		display: flex;
		align-items: center;
		gap: 8px;
		min-width: 0;
		color: #a3a3a3;
	}

	.dot {
		flex: 0 0 auto;
		width: 8px;
		height: 8px;
		border-radius: 9999px;
	}

	.dot.cyan {
		background-color: #22d3ee;
		box-shadow: 0 0 8px #22d3ee;
	}

	.dot.emerald {
		background-color: #34d399;
	}

	.dot.indigo {
		background-color: #818cf8;
	}

	.dot.amber {
		background-color: #fbbf24;
	}

	.source {
		overflow: hidden;
		font-weight: 600;
		color: #d4d4d4;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.divider {
		color: #525252;
	}

	time {
		color: #a3a3a3;
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		white-space: nowrap;
	}

	.status {
		padding: 2px 8px;
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 10px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #fcd34d;
		background-color: rgba(245, 158, 11, 0.1);
		border: 1px solid rgba(245, 158, 11, 0.2);
		border-radius: 4px;
		white-space: nowrap;
	}

	.meta-actions {
		display: flex;
		flex: 0 0 auto;
		align-items: center;
		gap: 12px;
	}

	.impact-toggle,
	.save-toggle {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 0;
		font: inherit;
		font-size: 12px;
		color: #a3a3a3;
		background: none;
		border: none;
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.impact-toggle:hover {
		color: #fcd34d;
	}

	.spark {
		width: 14px;
		height: 14px;
		color: #fbbf24;
	}

	.save-toggle {
		color: #737373;
	}

	.save-toggle:hover {
		color: #fff;
	}

	.save-toggle.saved {
		color: #fbbf24;
	}

	.bookmark {
		width: 16px;
		height: 16px;
	}

	h3 {
		margin: 0 0 8px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 18px;
		font-weight: 600;
		line-height: 1.35;
		color: #f5f5f5;
		transition: color 0.2s ease;
	}

	.post-card:hover h3 {
		color: #a5f3fc;
	}

	.summary {
		display: -webkit-box;
		margin: 0 0 16px;
		overflow: hidden;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 14px;
		font-weight: 300;
		line-height: 1.6;
		color: #a3a3a3;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}

	.impact-drawer {
		margin: 12px 0;
		padding: 14px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 12px;
		color: #d4d4d4;
		background-color: #0e1624;
		border: 1px solid rgba(251, 191, 36, 0.2);
		border-radius: 12px;
	}

	.impact-title {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 8px;
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #fcd34d;
	}

	.impact-drawer ul {
		margin: 0;
		padding-left: 18px;
		line-height: 1.6;
	}

	.impact-drawer li + li {
		margin-top: 4px;
	}

	.footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding-top: 12px;
		border-top: 1px solid rgba(255, 255, 255, 0.04);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
	}

	.tag {
		display: inline-flex;
		align-items: center;
		padding: 4px 10px;
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 12px;
		border: 1px solid transparent;
		border-radius: 6px;
	}

	.tag.up {
		color: #34d399;
		background-color: rgba(16, 185, 129, 0.1);
		border-color: rgba(16, 185, 129, 0.2);
	}

	.tag.down {
		color: #fb7185;
		background-color: rgba(244, 63, 94, 0.1);
		border-color: rgba(244, 63, 94, 0.2);
	}

	.tag.neutral {
		color: #d4d4d4;
		background-color: #262626;
		border-color: rgba(255, 255, 255, 0.05);
	}

	.read-meta {
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 12px;
		color: #737373;
	}

	@media (max-width: 640px) {
		.meta-row {
			align-items: flex-start;
			flex-direction: column;
		}

		.meta-left {
			flex-wrap: wrap;
		}

		.meta-actions {
			width: 100%;
			justify-content: space-between;
		}

		h3 {
			font-size: 16px;
		}

		.read-meta {
			width: 100%;
		}
	}
</style>
