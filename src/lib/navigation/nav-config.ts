export type NavItem = {
	id: string;
	label: string;
	target: string;
	page: number;
};

export const navItems = [
	{ id: 'home', label: 'Home', target: 'hero', page: 0 },
	{ id: 'journal', label: 'Cosmic Journal', target: 'journal', page: 1 }
] as const satisfies readonly NavItem[];

export type NavItemId = (typeof navItems)[number]['id'];

export type NavEntry = (typeof navItems)[number];

export const defaultNavId: NavItemId = 'home';
