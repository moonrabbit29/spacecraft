import { SvelteSet } from 'svelte/reactivity';
import {
	journalArticles,
	type CategoryFilter,
	type JournalTab,
	type SourceFilter
} from './journal-config.js';

class JournalController {
	activeTab = $state<JournalTab>('all');
	search = $state('');
	category = $state<CategoryFilter>('all');
	source = $state<SourceFilter>('all');
	savedIds = new SvelteSet(
		journalArticles.filter((article) => article.saved).map((article) => article.id)
	);

	filteredArticles = $derived.by(() => {
		const query = this.search.trim().toLowerCase();

		return journalArticles.filter((article) => {
			const tabMatch =
				this.activeTab === 'all' ||
				(this.activeTab === 'saved'
					? this.savedIds.has(article.id)
					: article.feed === this.activeTab);
			const categoryMatch = this.category === 'all' || article.category === this.category;
			const sourceMatch = this.source === 'all' || article.source === this.source;
			const searchable = [
				article.title,
				article.summary,
				article.sourceLabel,
				...article.tags.map((tag) => tag.label)
			]
				.join(' ')
				.toLowerCase();
			const searchMatch = !query || searchable.includes(query);

			return tabMatch && categoryMatch && sourceMatch && searchMatch;
		});
	});

	get savedCount() {
		return this.savedIds.size;
	}

	isSaved(id: string) {
		return this.savedIds.has(id);
	}

	selectTab(tab: JournalTab) {
		this.activeTab = tab;
	}

	setSearch(value: string) {
		this.search = value;
	}

	setCategory(category: CategoryFilter) {
		this.category = category;
	}

	setSource(source: SourceFilter) {
		this.source = source;
	}

	toggleSaved(id: string) {
		if (this.savedIds.has(id)) {
			this.savedIds.delete(id);
		} else {
			this.savedIds.add(id);
		}
	}
}

export const journalController = new JournalController();
