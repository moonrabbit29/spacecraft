export type TickerDirection = 'up' | 'down' | 'flat';

export type TickerItem = {
	symbol: string;
	value: string;
	change: string;
	direction: TickerDirection;
};

export const tickerItems: TickerItem[] = [
	{ symbol: 'S&P 500', value: '5,864.67', change: '+0.41%', direction: 'up' },
	{ symbol: 'NASDAQ', value: '18,518.61', change: '-0.15%', direction: 'down' },
	{ symbol: 'BTC/USD', value: '$68,430.00', change: '+2.18%', direction: 'up' },
	{ symbol: 'US 10Y', value: '4.241%', change: '+1.8 bps', direction: 'up' },
	{ symbol: 'BRENT CRUDE', value: '$74.29', change: '-0.82%', direction: 'down' },
	{ symbol: 'NVDA', value: '$141.54', change: '+3.12%', direction: 'up' }
];
