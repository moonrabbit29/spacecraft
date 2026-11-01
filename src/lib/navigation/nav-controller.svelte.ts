import { tick } from 'svelte';
import { currentHomePage } from '$lib/stores/HomePageStore.js';
import { defaultNavId, navItems, type NavEntry, type NavItemId } from './nav-config.js';

class NavController {
	activeId = $state<NavItemId>(defaultNavId);

	readonly items = navItems;

	isActive(id: NavItemId) {
		return this.activeId === id;
	}

	syncPage(page: number) {
		const activeItem = this.items.find((item) => item.id === this.activeId);

		if (activeItem?.page === page) return;

		const firstItemOnPage = this.items.find((item) => item.page === page);

		if (firstItemOnPage) {
			this.activeId = firstItemOnPage.id;
		}
	}

	async navigate(item: NavEntry) {
		this.activeId = item.id;

		if (typeof document === 'undefined') return;

		currentHomePage.set(item.page);
		await tick();

		document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth' });
	}
}

export const navController = new NavController();
