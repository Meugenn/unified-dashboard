"use client";

import { useState, useMemo } from "react";
import { data, formatScore, getCityName, getCityById } from "@/lib/data";

interface RouteRow {
  city_id: string;
  risk: number;
  redundancy: number;
  min_cut: number;
  shortest_path: string[];
  shortest_cost: number | null;
  min_cut_nodes: string[];
}

type SortKey = keyof Omit<RouteRow, "city_id" | "shortest_path" | "min_cut_nodes">;

export default function RoutesPage() {
  const [sortKey, setSortKey] = useState<SortKey>("risk");
  const [sortAsc, setSortAsc] = useState(false);

  // Convert trade_routes dict to array
  const rows: RouteRow[] = useMemo(() => {
    return Object.entries(data.trade_routes).map(([cityId, route]) => ({
      city_id: cityId,
      ...route,
    }));
  }, []);

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      // Handle null values for shortest_cost
      if (av === null || bv === null) {
        if (av === null && bv === null) return 0;
        if (av === null) return sortAsc ? -1 : 1;
        if (bv === null) return sortAsc ? 1 : -1;
      }
      return sortAsc ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
  }, [rows, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <span className="label-mono">Analysis</span>
      </div>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 8,
          color: "var(--text-primary)",
        }}
      >
        Trade Routes
      </h1>
      <p
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          marginBottom: 32,
        }}
      >
        Critical trade routes, risk assessment, and network redundancy metrics.
      </p>

      {/* Route cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
          marginBottom: 32,
        }}
      >
        {sorted.map((route) => {
          const city = getCityById(route.city_id);
          const riskColor = route.risk < 0.3 ? "var(--accent-green)" : route.risk < 0.6 ? "var(--accent-amber)" : "var(--accent-red)";
          const redundancyColor = route.redundancy > 50000 ? "var(--accent-green)" : route.redundancy > 30000 ? "var(--accent-amber)" : "var(--accent-red)";
          
          return (
            <div key={route.city_id} className="card card-hover" style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                    {getCityName(route.city_id)}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {city?.country || ""}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 9, color: "var(--text-muted)", marginBottom: 2 }}>Risk</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: riskColor }}>
                    {formatScore(route.risk)}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <div className="label-mono" style={{ marginBottom: 4 }}>Redundancy</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: redundancyColor }}>
                    {route.redundancy.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="label-mono" style={{ marginBottom: 4 }}>Min Cut</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>
                    {route.min_cut}
                  </div>
                </div>
              </div>

              {/* Shortest Path */}
              {route.shortest_path.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div className="label-mono" style={{ marginBottom: 6 }}>Shortest Path</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                    {route.shortest_path.map((cityId, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            fontSize: 10,
                            padding: "3px 8px",
                            borderRadius: 4,
                            background: "rgba(129, 140, 248, 0.12)",
                            color: "var(--accent-purple)",
                            border: "1px solid rgba(129, 140, 248, 0.2)",
                          }}
                        >
                          {getCityName(cityId)}
                        </span>
                        {idx < route.shortest_path.length - 1 && (
                          <span style={{ fontSize: 10, color: "var(--text-muted)", margin: "0 4px" }}>→</span>
                        )}
                      </div>
                    ))}
                    {route.shortest_cost !== null && route.shortest_cost > 0 && (
                      <span style={{ fontSize: 10, color: "var(--text-muted)", marginLeft: 8 }}>
                        ({formatScore(route.shortest_cost)})
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Min Cut Nodes */}
              {route.min_cut_nodes.length > 0 && (
                <div>
                  <div className="label-mono" style={{ marginBottom: 6 }}>Critical Nodes</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {route.min_cut_nodes.map((cityId) => (
                      <span
                        key={cityId}
                        style={{
                          fontSize: 9,
                          padding: "2px 6px",
                          borderRadius: 3,
                          background: "rgba(255, 68, 102, 0.12)",
                          color: "var(--accent-red)",
                          border: "1px solid rgba(255, 68, 102, 0.2)",
                        }}
                      >
                        {getCityName(cityId)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 24, overflow: "auto" }}>
        <div className="label-mono" style={{ marginBottom: 16 }}>Detailed Route Metrics</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>City</th>
              <th>Country</th>
              <th
                onClick={() => handleSort("risk")}
                style={{
                  color: sortKey === "risk" ? "var(--accent-green)" : undefined,
                  cursor: "pointer",
                }}
              >
                Risk
                {sortKey === "risk" && (sortAsc ? " ^" : " v")}
              </th>
              <th
                onClick={() => handleSort("redundancy")}
                style={{
                  color: sortKey === "redundancy" ? "var(--accent-green)" : undefined,
                  cursor: "pointer",
                }}
              >
                Redundancy
                {sortKey === "redundancy" && (sortAsc ? " ^" : " v")}
              </th>
              <th
                onClick={() => handleSort("min_cut")}
                style={{
                  color: sortKey === "min_cut" ? "var(--accent-green)" : undefined,
                  cursor: "pointer",
                }}
              >
                Min Cut
                {sortKey === "min_cut" && (sortAsc ? " ^" : " v")}
              </th>
              <th>Shortest Path</th>
              <th>Critical Nodes</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((route, i) => {
              const city = getCityById(route.city_id);
              const riskColor = route.risk < 0.3 ? "var(--accent-green)" : route.risk < 0.6 ? "var(--accent-amber)" : "var(--accent-red)";
              const redundancyColor = route.redundancy > 50000 ? "var(--accent-green)" : route.redundancy > 30000 ? "var(--accent-amber)" : "var(--accent-red)";
              
              return (
                <tr key={route.city_id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                    {getCityName(route.city_id)}
                  </td>
                  <td>{city?.country || ""}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div className="score-bar" style={{ width: 40 }}>
                        <div
                          className="score-bar-fill"
                          style={{
                            width: `${route.risk * 100}%`,
                            background: riskColor,
                          }}
                        />
                      </div>
                      <span style={{ color: riskColor, fontWeight: 500 }}>
                        {formatScore(route.risk)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span style={{ color: redundancyColor, fontWeight: 500 }}>
                      {route.redundancy.toLocaleString()}
                    </span>
                  </td>
                  <td>{route.min_cut}</td>
                  <td>
                    <div style={{ fontSize: 10, color: "var(--text-secondary)" }}>
                      {route.shortest_path.map(getCityName).join(" → ")}
                      {route.shortest_cost !== null && route.shortest_cost > 0 && ` (${formatScore(route.shortest_cost)})`}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: 9, color: "var(--text-muted)" }}>
                      {route.min_cut_nodes.map(getCityName).join(", ")}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}