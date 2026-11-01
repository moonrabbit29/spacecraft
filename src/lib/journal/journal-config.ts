export const articleCategories = [
	{ id: 'macro', label: 'Macro & Rates' },
	{ id: 'equities', label: 'Equities' },
	{ id: 'crypto', label: 'Digital Assets' },
	{ id: 'energy', label: 'Energy & Metals' },
	{ id: 'venture', label: 'AI & Tech Capex' }
] as const;

export type JournalCategory = (typeof articleCategories)[number]['id'];

export const categoryFilters = [{ id: 'all', label: 'All Sectors' }, ...articleCategories] as const;

export type CategoryFilter = (typeof categoryFilters)[number]['id'];

export const journalSources = [
	{ id: 'sec', label: '🏛️ SEC Filings' },
	{ id: 'reuters', label: '⚡ Bloomberg Wire' },
	{ id: 'fed', label: '🏦 Central Banks' },
	{ id: 'spacecraft', label: '🚀 Cosmic Research' }
] as const;

export type JournalSource = (typeof journalSources)[number]['id'];

export const sourceFilters = [{ id: 'all', label: 'All Desks' }, ...journalSources] as const;

export type SourceFilter = (typeof sourceFilters)[number]['id'];

export const journalTabs = [
	{ id: 'all', label: 'Live Stream' },
	{ id: 'analysis', label: 'Deep Analysis' },
	{ id: 'earnings', label: 'Earnings & Filings' },
	{ id: 'saved', label: 'Watchlist' }
] as const;

export type JournalTab = (typeof journalTabs)[number]['id'];

export type JournalFeed = 'live' | 'analysis' | 'earnings';

export type TagTone = 'up' | 'down' | 'neutral';

export type JournalTag = {
	label: string;
	tone: TagTone;
};

export type JournalImpact = {
	label: string;
	text: string;
};

export type JournalArticle = {
	id: string;
	feed: JournalFeed;
	category: JournalCategory;
	source: JournalSource;
	sourceLabel: string;
	dotTone: 'cyan' | 'emerald' | 'indigo' | 'amber';
	time: string;
	status?: string;
	title: string;
	summary: string;
	impact: JournalImpact[];
	tags: JournalTag[];
	readMeta: string;
	saved?: boolean;
};

export const journalArticles: JournalArticle[] = [
	{
		id: 'fomc-terminal-rate-plateau',
		feed: 'live',
		category: 'macro',
		source: 'fed',
		sourceLabel: 'Federal Reserve Dispatch',
		dotTone: 'cyan',
		time: '14m ago',
		status: 'High Volatility',
		title:
			'FOMC Signals Terminal Rate Plateau as PCE Price Index Decelerates to 2.4% Annual Run-Rate',
		summary:
			'Chair notes core disinflation is broadening across service sectors. Balance sheet run-off pace will maintain current trajectory through next quarter as swap markets reprice rate cut odds to 68%.',
		impact: [
			{
				label: 'Bonds',
				text: '2-year Treasury yields pulled back 6 bps to 3.98% as traders price lower likelihood of near-term hikes.'
			},
			{
				label: 'Equities',
				text: 'Growth and long-duration tech valuations benefit directly from multiple expansion.'
			},
			{
				label: 'Action',
				text: "Monitor tomorrow's non-farm payroll revisions for confirmation of labor moderation."
			}
		],
		tags: [
			{ label: '$SPY +0.64%', tone: 'up' },
			{ label: '$DXY -0.38%', tone: 'down' },
			{ label: 'US10Y 4.24%', tone: 'neutral' }
		],
		readMeta: '4 min read · Full FOMC Transcript Attached'
	},
	{
		id: 'hyperscaler-ai-capex',
		feed: 'analysis',
		category: 'equities',
		source: 'spacecraft',
		sourceLabel: 'SpaceCraft Research Desk',
		dotTone: 'emerald',
		time: '42m ago',
		title:
			'Hyperscaler AI Capex Run-Rate Surpasses $200B: Margin Breakdown for Semiconductor Suppliers',
		summary:
			'Sec filings from Big Tech reveal accelerated data center build-outs for customized ASIC clusters and liquid-cooled rack architectures, pushing back-end packaging suppliers to near-100% capacity.',
		impact: [
			{
				label: 'Winners',
				text: 'Advanced packaging suppliers (TSMC, ASE) and high-bandwidth memory (SK Hynix, Micron).'
			},
			{
				label: 'Risk Factor',
				text: 'Power availability in Northern Virginia and Ireland grids acting as bottleneck.'
			}
		],
		tags: [
			{ label: '$NVDA +3.12%', tone: 'up' },
			{ label: '$TSM +2.45%', tone: 'up' },
			{ label: '$INTC -1.10%', tone: 'down' }
		],
		readMeta: '6 min read · Deep Dive',
		saved: true
	},
	{
		id: 'tokenized-treasury-funds',
		feed: 'live',
		category: 'crypto',
		source: 'reuters',
		sourceLabel: 'Global Liquidity Wire',
		dotTone: 'indigo',
		time: '1h 12m ago',
		title:
			'Institutional Tokenized Treasury Funds Cross $2.4B as Tier-1 Banks Pilot On-Chain Repo Settlement',
		summary:
			'Major custody banks announce interoperability standards for tokenized US debt obligations, offering 24/7 collateral mobilization and reducing overnight bilateral counterparty risks.',
		impact: [
			{
				label: 'Liquidity',
				text: 'Frees trapped intraday capital for multinational trading desks.'
			},
			{
				label: 'Adoption',
				text: 'Public permissionless protocols seeing increased secondary volume for yield-bearing stable assets.'
			}
		],
		tags: [
			{ label: '$BTC +2.18%', tone: 'up' },
			{ label: '$ETH +1.74%', tone: 'up' }
		],
		readMeta: '3 min read'
	},
	{
		id: 'tsmc-advanced-packaging-guidance',
		feed: 'earnings',
		category: 'equities',
		source: 'sec',
		sourceLabel: 'SEC Filings Desk',
		dotTone: 'amber',
		time: '2h 05m ago',
		status: '8-K Filing',
		title: 'TSMC Guides Above Consensus as Advanced Packaging Demand Outpaces Supply Through 2027',
		summary:
			'Quarterly filing points to a 28% year-over-year increase in capital expenditure as CoWoS capacity remains sold out and hyperscalers lock in multi-year allocations for AI accelerators.',
		impact: [
			{
				label: 'Supply',
				text: 'CoWoS packaging remains the binding constraint, keeping pricing power with leading-edge foundries.'
			},
			{
				label: 'Margins',
				text: 'Mix shift toward advanced nodes should offset the drag from overseas fab ramp costs.'
			}
		],
		tags: [
			{ label: '$TSM +2.45%', tone: 'up' },
			{ label: '$NVDA +3.12%', tone: 'up' },
			{ label: '$ASML +1.60%', tone: 'up' }
		],
		readMeta: '5 min read · Filing Review'
	},
	{
		id: 'brent-opec-output-restoration',
		feed: 'live',
		category: 'energy',
		source: 'reuters',
		sourceLabel: 'Energy & Commodities Wire',
		dotTone: 'amber',
		time: '2h 40m ago',
		title: 'Brent Crude Slips Below $75 as OPEC+ Signals Gradual Output Restoration',
		summary:
			'Delegates indicate a phased return of voluntary cuts beginning next quarter, easing near-term supply fears even as refinery margins remain above seasonal averages.',
		impact: [
			{
				label: 'Energy',
				text: 'Lower crude inputs support transport and industrial margins while pressuring upstream cash flows.'
			},
			{
				label: 'Watch',
				text: 'Inventory draws at Cushing will determine whether the pullback extends beyond technical support.'
			}
		],
		tags: [
			{ label: 'BRENT -0.82%', tone: 'down' },
			{ label: '$XLE -0.44%', tone: 'down' },
			{ label: '$USO -1.10%', tone: 'down' }
		],
		readMeta: '4 min read · Commodities'
	},
	{
		id: 'ai-infra-venture-funding',
		feed: 'analysis',
		category: 'venture',
		source: 'spacecraft',
		sourceLabel: 'Cosmic Venture Desk',
		dotTone: 'emerald',
		time: '3h 10m ago',
		title: 'AI Infrastructure Startups Pull $18B in Q3 as Sovereign Funds Chase Compute Deals',
		summary:
			'Data center developers and inference platforms accounted for most of the quarter’s mega-rounds, with sovereign wealth funds increasingly anchoring late-stage syndicates.',
		impact: [
			{
				label: 'Capital',
				text: 'Dry powder is concentrating in proven operators with secured power and land agreements.'
			},
			{
				label: 'Risk',
				text: 'Rising depreciation schedules could pressure returns if utilization normalizes faster than expected.'
			}
		],
		tags: [
			{ label: '$NVDA +3.12%', tone: 'up' },
			{ label: 'AI INFRA +5.40%', tone: 'up' },
			{ label: '$SMCI -2.05%', tone: 'down' }
		],
		readMeta: '7 min read · Deep Dive',
		saved: true
	},
	{
		id: 'treasury-auction-tail-duration',
		feed: 'live',
		category: 'macro',
		source: 'fed',
		sourceLabel: 'Federal Reserve Dispatch',
		dotTone: 'cyan',
		time: '3h 55m ago',
		title: 'Treasury Auction Tail Signals Duration Anxiety Even as Inflation Expectations Ease',
		summary:
			'The long-end auction cleared at a modest tail as dealers absorbed increased supply, while five-year breakevens drifted lower on softer shelter and services data.',
		impact: [
			{
				label: 'Rates',
				text: 'A steeper curve suggests investors are demanding more term premium for duration risk.'
			},
			{
				label: 'Equities',
				text: 'Long-duration growth names remain sensitive to any renewed rise in real yields.'
			}
		],
		tags: [
			{ label: 'US10Y 4.24%', tone: 'neutral' },
			{ label: '$TLT -0.52%', tone: 'down' },
			{ label: '$DXY -0.38%', tone: 'down' }
		],
		readMeta: '4 min read · Rates'
	},
	{
		id: 'spot-ether-etf-inflows',
		feed: 'live',
		category: 'crypto',
		source: 'reuters',
		sourceLabel: 'Global Liquidity Wire',
		dotTone: 'indigo',
		time: '4h 20m ago',
		title: 'Spot Ether ETFs Log Fourth Straight Week of Inflows as Staking Yield Premium Widens',
		summary:
			'Institutional allocations accelerated after custody providers introduced yield-sharing structures, narrowing the discount between spot ETH and staked alternatives.',
		impact: [
			{
				label: 'Flows',
				text: 'Steady ETF creation supports liquidity but leaves the market vulnerable to concentrated redemptions.'
			},
			{
				label: 'Structure',
				text: 'Yield-bearing wrappers may accelerate the migration of long-term holders away from raw spot exposure.'
			}
		],
		tags: [
			{ label: '$ETH +1.74%', tone: 'up' },
			{ label: '$BTC +2.18%', tone: 'up' },
			{ label: 'ETH/BTC +0.85%', tone: 'up' }
		],
		readMeta: '3 min read'
	},
	{
		id: 'defense-backlog-repricing',
		feed: 'analysis',
		category: 'equities',
		source: 'spacecraft',
		sourceLabel: 'SpaceCraft Research Desk',
		dotTone: 'emerald',
		time: '5h 05m ago',
		title: 'Defense Contractors Reprice Backlogs as NATO Members Accelerate Procurement Timelines',
		summary:
			'Multi-year framework agreements are shifting toward shorter delivery windows, improving revenue visibility while testing supply chains still recovering from prior ramp constraints.',
		impact: [
			{
				label: 'Backlog',
				text: 'Faster conversion of orders into revenue supports free cash flow through the next fiscal year.'
			},
			{
				label: 'Execution',
				text: 'Labor and specialty component shortages remain the primary risk to margin expansion.'
			}
		],
		tags: [
			{ label: '$LMT +1.85%', tone: 'up' },
			{ label: '$RTX +1.20%', tone: 'up' },
			{ label: '$ITA +0.94%', tone: 'up' }
		],
		readMeta: '6 min read · Deep Dive'
	},
	{
		id: 'regional-bank-cre-reserves',
		feed: 'earnings',
		category: 'equities',
		source: 'sec',
		sourceLabel: 'SEC Filings Desk',
		dotTone: 'amber',
		time: '5h 40m ago',
		status: '10-Q Review',
		title: 'Regional Banks Build Loan-Loss Reserves as Commercial Real Estate Maturities Loom',
		summary:
			'Quarterly disclosures show provisioning rising fastest in office and multifamily portfolios, with several lenders tightening underwriting standards for maturing loans.',
		impact: [
			{
				label: 'Credit',
				text: 'Higher reserves weigh on near-term earnings but reduce the risk of abrupt capital raises.'
			},
			{
				label: 'Regional Banks',
				text: 'Deposit costs remain elevated, leaving smaller lenders more exposed to margin compression.'
			}
		],
		tags: [
			{ label: '$KRE -1.42%', tone: 'down' },
			{ label: '$SPY +0.64%', tone: 'up' },
			{ label: 'CRE LOANS -3.10%', tone: 'down' }
		],
		readMeta: '5 min read · Filing Review'
	},
	{
		id: 'copper-grid-demand-high',
		feed: 'live',
		category: 'energy',
		source: 'reuters',
		sourceLabel: 'Energy & Commodities Wire',
		dotTone: 'amber',
		time: '6h 15m ago',
		title: 'Copper Hits Three-Month High on Grid Build-Out Demand and Mine Supply Disruptions',
		summary:
			'Utility procurement and data center electrification are tightening the refined copper market, while outages at two major mines remove near-term supply from the balance.',
		impact: [
			{
				label: 'Demand',
				text: 'Grid investment is becoming a structural driver less sensitive to cyclical manufacturing swings.'
			},
			{
				label: 'Supply',
				text: 'Treatment charges remain depressed, signaling persistent concentrate tightness.'
			}
		],
		tags: [
			{ label: '$HG +2.30%', tone: 'up' },
			{ label: '$FCX +3.10%', tone: 'up' },
			{ label: '$COPX +1.95%', tone: 'up' }
		],
		readMeta: '3 min read · Commodities'
	},
	{
		id: 'fintech-valuation-reset',
		feed: 'analysis',
		category: 'venture',
		source: 'spacecraft',
		sourceLabel: 'Cosmic Venture Desk',
		dotTone: 'emerald',
		time: '7h 05m ago',
		title: 'Late-Stage Fintech Valuations Reset as IPO Window Cracks Open',
		summary:
			'Secondary trades are clearing at discounts to prior rounds, but payments and embedded finance platforms with positive unit economics are attracting strategic buyers.',
		impact: [
			{
				label: 'Valuation',
				text: 'Price discovery is improving as crossover investors return with tighter return thresholds.'
			},
			{
				label: 'M&A',
				text: 'Incumbents may use the reset to acquire distribution and compliance infrastructure at lower multiples.'
			}
		],
		tags: [
			{ label: '$SQ +1.20%', tone: 'up' },
			{ label: '$PYPL -0.75%', tone: 'down' },
			{ label: 'FINTECH +2.60%', tone: 'up' }
		],
		readMeta: '6 min read · Deep Dive'
	},
	{
		id: 'dollar-g10-policy-convergence',
		feed: 'live',
		category: 'macro',
		source: 'reuters',
		sourceLabel: 'Macro Strategy Desk',
		dotTone: 'cyan',
		time: '8h 20m ago',
		title: 'Dollar Index Slips as G10 Central Banks Converge Toward Easier Policy',
		summary:
			'Softer inflation prints across Europe and Asia are narrowing rate differentials with the US, prompting leveraged funds to reduce long-dollar exposure for a third consecutive week.',
		impact: [
			{
				label: 'FX',
				text: 'A weaker dollar supports commodity prices and emerging-market local-currency assets.'
			},
			{
				label: 'Earnings',
				text: 'Multinationals with large overseas revenue could see a modest translation tailwind next quarter.'
			}
		],
		tags: [
			{ label: '$DXY -0.38%', tone: 'down' },
			{ label: '$EURUSD +0.42%', tone: 'up' },
			{ label: '$USDJPY -0.65%', tone: 'down' }
		],
		readMeta: '4 min read · FX'
	},
	{
		id: 'stablecoin-supply-record',
		feed: 'analysis',
		category: 'crypto',
		source: 'spacecraft',
		sourceLabel: 'Cosmic Research Desk',
		dotTone: 'emerald',
		time: '9h 10m ago',
		title: 'Stablecoin Supply Hits Record $180B as Payments Volume Migrates On-Chain',
		summary:
			'Cross-border settlement and treasury management use cases are driving issuance growth, with regulated issuers capturing a larger share of new supply.',
		impact: [
			{
				label: 'Adoption',
				text: 'Payment rails are becoming stickier as merchants reduce settlement times and FX costs.'
			},
			{
				label: 'Regulation',
				text: 'Reserve disclosure requirements could widen the moat for compliant, audited issuers.'
			}
		],
		tags: [
			{ label: '$USDT 1.00', tone: 'neutral' },
			{ label: '$USDC 1.00', tone: 'neutral' },
			{ label: '$COIN +2.80%', tone: 'up' }
		],
		readMeta: '5 min read · Deep Dive'
	},
	{
		id: 'semicap-second-wave',
		feed: 'analysis',
		category: 'equities',
		source: 'spacecraft',
		sourceLabel: 'SpaceCraft Research Desk',
		dotTone: 'emerald',
		time: '10h 30m ago',
		title: 'Semiconductor Equipment Orders Signal a Second Wave of AI Capacity Spending',
		summary:
			'Bookings for deposition and etch tools are accelerating beyond leading-edge logic, suggesting memory makers are preparing for a broader AI-driven capacity cycle.',
		impact: [
			{
				label: 'Equipment',
				text: 'Order momentum is broadening from a handful of fabs to a multi-year replacement cycle.'
			},
			{
				label: 'Memory',
				text: 'HBM capacity additions could ease bottlenecks but risk oversupply if demand forecasts slip.'
			}
		],
		tags: [
			{ label: '$AMAT +2.10%', tone: 'up' },
			{ label: '$LRCX +1.85%', tone: 'up' },
			{ label: '$KLAC +1.40%', tone: 'up' }
		],
		readMeta: '6 min read · Deep Dive'
	}
];
