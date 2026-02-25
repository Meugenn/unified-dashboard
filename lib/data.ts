import type { AnalysisData, City } from "./types";
import westAfricaRaw from "./analysis-data.json";
import europeRaw from "./europe-data.json";
import worldRaw from "./world-data.json";
import regionsRaw from "./regions-data.json";

export const datasets = {
  "west-africa": westAfricaRaw as unknown as AnalysisData,
  "europe": europeRaw as unknown as AnalysisData,
  "world": worldRaw as unknown as AnalysisData,
  "regions": regionsRaw as unknown as AnalysisData,
};

// Keep backward compat
export const data: AnalysisData = datasets["west-africa"];

// ── Region-specific bloc colors ──
export const BLOC_COLORS: Record<string, Record<string, string>> = {
  "west-africa": {
    ECOWAS: "#00d4aa",
    UEMOA: "#818cf8",
    SUSPENDED: "#ff4466",
    EXTERNAL: "#94a3b8",
  },
  "europe": {
    EU: "#0033cc",
    EEA: "#6699ff",
    CANDIDATE: "#ff9900",
    PARTNER: "#9966cc",
    EFTA: "#00cc99",
    OTHER: "#94a3b8",
  },
  "world": {
    G7: "#0033cc",
    BRICS: "#cc3300",
    ASEAN: "#009933",
    AU: "#ff9900",
    EU: "#6699ff",
    MERCOSUR: "#cc0066",
    GCC: "#006666",
    APEC: "#9900cc",
    OTHER: "#94a3b8",
  },
  "regions": {
    NAFTA: "#0033cc",
    EU: "#6699ff",
    ASEAN: "#009933",
    AU: "#ff9900",
    MERCOSUR: "#cc0066",
    GCC: "#006666",
    CPTPP: "#9900cc",
    OTHER: "#94a3b8",
  },
};

// ── Region-specific edge type colors ──
export const EDGE_TYPE_COLORS: Record<string, Record<string, string>> = {
  "west-africa": {
    TRADE: "#00d4aa",
    POLITICAL: "#818cf8",
    CULTURAL: "#c084fc",
    MIGRATORY: "#fbbf24",
    LABOUR: "#f97316",
    INFRASTRUCTURE: "#38bdf8",
    FINANCIAL: "#f472b6",
  },
  "europe": {
    TRADE: "#00d4aa",
    POLITICAL: "#0033cc",
    CULTURAL: "#c084fc",
    MIGRATORY: "#fbbf24",
    FINANCIAL: "#f472b6",
    INFRASTRUCTURE: "#38bdf8",
    ENERGY: "#ff9900",
  },
  "world": {
    TRADE: "#00d4aa",
    POLITICAL: "#0033cc",
    CULTURAL: "#c084fc",
    MIGRATORY: "#fbbf24",
    FINANCIAL: "#f472b6",
    SUPPLY_CHAIN: "#ff9900",
    DIPLOMATIC: "#9900cc",
  },
  "regions": {
    TRADE: "#00d4aa",
    POLITICAL: "#0033cc",
    AID: "#009933",
    MIGRATORY: "#fbbf24",
    FINANCIAL: "#f472b6",
    COMMODITY: "#ff9900",
    TECH_TRANSFER: "#9900cc",
  },
};

// ── Helpers ──
export function getBlocColor(bloc: string, region: Region = "west-africa"): string {
  return BLOC_COLORS[region]?.[bloc] ?? BLOC_COLORS["west-africa"]?.[bloc] ?? "#64748b";
}

export function getEdgeTypeColor(type: string, region: Region = "west-africa"): string {
  return EDGE_TYPE_COLORS[region]?.[type] ?? EDGE_TYPE_COLORS["west-africa"]?.[type] ?? "#64748b";
}

export function getCityById(id: string, region: Region = "west-africa"): City | undefined {
  return datasets[region]?.cities.find((c) => c.id === id);
}

export function getCityName(id: string, region: Region = "west-africa"): string {
  return getCityById(id, region)?.name ?? id;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatPercent(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

export function formatScore(n: number): string {
  return n.toFixed(2);
}

// Region utilities
export type Region = keyof typeof datasets;
export const REGIONS = Object.keys(datasets) as Region[];
