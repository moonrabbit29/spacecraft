<script lang="ts">
	import { categoryFilters, journalTabs, sourceFilters } from '$lib/journal/journal-config.js';
	import { journalController } from '$lib/journal/journal-controller.svelte.js';
</script>

<div class="journal-toolbar">
	<div class="tabs-row">
		<div class="tabs">
			{#each journalTabs as tab (tab.id)}
				<button
					type="button"
					class="tab"
					class:active={journalController.activeTab === tab.id}
					aria-pressed={journalController.activeTab === tab.id}
					onclick={() => journalController.selectTab(tab.id)}
				>
					{tab.label}
					{#if tab.id === 'saved'}
						<span class="count">{journalController.savedCount}</span>
					{/if}
				</button>
			{/each}
		</div>

		<button
			type="button"
			class="settings"
			title="Customize Feed Settings"
			aria-label="Feed settings"
		>
			<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<circle cx="12" cy="12" r="2" />
				<circle cx="19" cy="12" r="2" />
				<circle cx="5" cy="12" r="2" />
			</svg>
		</button>
	</div>

	<div class="search">
		<svg
			class="search-icon"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>
		<input
			type="text"
			value={journalController.search}
			placeholder="Search macro topics, tickers ($NVDA, $SPY), or Fed policy..."
			aria-label="Search journal"
			oninput={(event) => journalController.setSearch(event.currentTarget.value)}
		/>
		<kbd>⌘K</kbd>
	</div>

	<div class="chips" aria-label="Asset class filters">
		{#each categoryFilters as category (category.id)}
			<button
				type="button"
				class="pill"
				class:active={journalController.category === category.id}
				aria-pressed={journalController.category === category.id}
				onclick={() => journalController.setCategory(category.id)}
			>
				{category.label}
			</button>
		{/each}
	</div>

	<div class="sources" aria-label="Source filters">
		<span class="sources-label">Sources:</span>
		{#each sourceFilters as source (source.id)}
			<button
				type="button"
				class="source-pill"
				class:active={journalController.source === source.id}
				aria-pressed={journalController.source === source.id}
				onclick={() => journalController.setSource(source.id)}
			>
				{source.label}
			</button>
		{/each}
	</div>
</div>

<style>
	.journal-toolbar {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 32px;
	}

	.tabs-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding-bottom: 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.tabs {
		display: flex;
		align-items: center;
		gap: 24px;
		overflow-x: auto;
	}

	.tab {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 0 0 12px;
		margin-bottom: -13px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 14px;
		font-weight: 500;
		color: #a3a3a3;
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		cursor: pointer;
		white-space: nowrap;
		transition:
			color 0.2s ease,
			border-color 0.2s ease;
	}

	.tab:hover {
		color: #e5e5e5;
	}

	.tab.active {
		font-weight: 600;
		color: #fff;
		border-bottom-color: #fbbf24;
	}

	.count {
		padding: 1px 6px;
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 10px;
		font-weight: 400;
		color: #e5e5e5;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 9999px;
	}

	.settings {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 6px;
		color: #a3a3a3;
		background: none;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition:
			color 0.2s ease,
			background-color 0.2s ease;
	}

	.settings:hover {
		color: #fff;
		background-color: rgba(255, 255, 255, 0.05);
	}

	.settings svg {
		width: 16px;
		height: 16px;
	}

	.search {
		position: relative;
	}

	.search-icon {
		position: absolute;
		top: 50%;
		left: 14px;
		width: 16px;
		height: 16px;
		color: #737373;
		transform: translateY(-50%);
		pointer-events: none;
	}

	.search input {
		width: 100%;
		padding: 10px 40px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 14px;
		color: #e5e5e5;
		background-color: #0d121c;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		outline: none;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.search input::placeholder {
		color: #737373;
	}

	.search input:focus {
		border-color: rgba(34, 211, 238, 0.5);
		box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.4);
	}

	.search kbd {
		position: absolute;
		top: 50%;
		right: 12px;
		padding: 2px 6px;
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 10px;
		color: #737373;
		background-color: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 4px;
		transform: translateY(-50%);
		pointer-events: none;
	}

	.chips,
	.sources {
		display: flex;
		align-items: center;
		gap: 8px;
		overflow-x: auto;
		padding-bottom: 4px;
		font-size: 12px;
	}

	.pill {
		padding: 6px 14px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 12px;
		font-weight: 500;
		color: #d4d4d4;
		background-color: #171717;
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 9999px;
		cursor: pointer;
		white-space: nowrap;
		transition:
			color 0.2s ease,
			background-color 0.2s ease;
	}

	.pill:hover {
		background-color: #262626;
	}

	.pill.active {
		font-weight: 600;
		color: #000;
		background-color: #fff;
		box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
	}

	.sources {
		color: #a3a3a3;
	}

	.sources-label {
		margin-right: 4px;
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #737373;
		white-space: nowrap;
	}

	.source-pill {
		padding: 4px 10px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 12px;
		color: #a3a3a3;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 8px;
		cursor: pointer;
		white-space: nowrap;
		transition:
			color 0.2s ease,
			background-color 0.2s ease;
	}

	.source-pill:hover {
		background-color: rgba(255, 255, 255, 0.05);
	}

	.source-pill.active {
		color: #e5e5e5;
		background-color: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.1);
	}

	@media (max-width: 640px) {
		.tabs {
			gap: 16px;
		}

		.tab {
			font-size: 12px;
		}
	}
</style>
