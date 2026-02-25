// ── West Africa FTZ Network — Type Definitions ──

export interface City {
  id: string;
  name: string;
  lat: number;
  lng: number;
  country: string;
  country_iso3: string;
  bloc: string;
  population: number;
  is_port: boolean;
  is_capital: boolean;
  gdp_per_capita: number;
  trade_openness: number;
  ease_of_business: number;
  cfa_zone: boolean;
  is_ftz_target: boolean;
  tags: string[];
}

export interface Edge {
  source: string;
  target: string;
  edge_type: string;
  weight: number;
  volume: number;
  distance_km: number;
  is_active: boolean;
  tariff_rate: number;
  description: string;
}

export interface NetworkSummary {
  nodes: number;
  edges: number;
  ecowas_active: number;
  uemoa_cfa: number;
  suspended: number;
  external: number;
  port_cities: number;
  ftz_targets: number;
}

export interface NetworkMetrics {
  betweenness: Record<string, number>;
  degree: Record<string, number>;
  closeness: Record<string, number>;
  articulation_points: string[];
  bridges: [string, string][];
  ecowas_cut_vertices: string[];
  component_count: number;
}

export interface FTZImpactScore {
  composite: number;
  connectivity: number;
  port_access: number;
  tariff_exposure: number;
  trade_volume: number;
  diversification: number;
  border_proximity: number;
  stability: number;
}

export interface TradeRouteData {
  risk: number;
  redundancy: number;
  min_cut: number;
  shortest_path: string[];
  shortest_cost: number | null;
  min_cut_nodes: string[];
}

export interface CascadeScenario {
  name: string;
  trigger: string;
  type: string;
  affected_cities: string[];
  isolated_cities: string[];
  trade_disrupted_cities: string[];
  new_components: number;
  trade_volume_affected: number;
  severity: number;
}

export interface OpportunitySignal {
  city_id: string;
  city_name: string;
  country: string;
  signal_type: "OPPORTUNITY" | "RISK" | "NEUTRAL";
  gap: number;
  model_score: number;
  actual_score: number;
  confidence: number;
}

export interface AnalysisData {
  generated_at: string;
  summary: NetworkSummary;
  cities: City[];
  edges: Edge[];
  metrics: NetworkMetrics;
  ftz_impact: Record<string, FTZImpactScore>;
  trade_routes: Record<string, TradeRouteData>;
  cascades: CascadeScenario[];
  opportunities: OpportunitySignal[];
}
