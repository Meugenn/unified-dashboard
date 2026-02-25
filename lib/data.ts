import type { AnalysisData, City } from "./types";
import rawData from "./analysis-data.json";

export const data: AnalysisData = rawData as unknown as AnalysisData;

// ── Bloc colors ──
export const BLOC_COLORS: Record<string, string> = {
  ECOWAS: "#00d4aa",
  UEMOA: "#818cf8",
  SUSPENDED: "#ff4466",
  EXTERNAL: "#94a3b8",
};

export const EDGE_TYPE_COLORS: Record<string, string> = {
  TRADE: "#00d4aa",
  POLITICAL: "#818cf8",
  CULTURAL: "#c084fc",
  MIGRATORY: "#fbbf24",
  LABOUR: "#f97316",
  INFRASTRUCTURE: "#38bdf8",
  FINANCIAL: "#f472b6",
};

// ── Helpers ──
export function getBlocColor(bloc: string): string {
  return BLOC_COLORS[bloc] ?? "#64748b";
}

export function getEdgeTypeColor(type: string): string {
  return EDGE_TYPE_COLORS[type] ?? "#64748b";
}

export function getCityById(id: string): City | undefined {
  return data.cities.find((c) => c.id === id);
}

export function getCityName(id: string): string {
  return getCityById(id)?.name ?? id;
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
