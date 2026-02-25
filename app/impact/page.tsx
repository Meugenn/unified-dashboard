"use client";

import { useState, useMemo } from "react";
import { datasets, formatScore, getCityName, getCityById } from "@/lib/data";
import { useRegion } from "@/lib/RegionContext";

interface FTZRow {
  city_id: string;
  composite: number;
  connectivity: number;
  port_access: number;
  tariff_exposure: number;
  trade_volume: number;
  diversification: number;
  border_proximity: number;
  stability: number;
}

type SortKey = keyof Omit<FTZRow, "city_id">;

const SCORE_COLUMNS: { key: SortKey; label: string; color: string }[] = [
  { key: "composite", label: "Composite", color: "var(--accent-purple)" },
  { key: "connectivity", label: "Connectivity", color: "var(--accent-green)" },
  { key: "port_access", label: "Port Access", color: "var(--accent-green)" },
  { key: "tariff_exposure", label: "Tariff Exp.", color: "var(--accent-amber)" },
  { key: "trade_volume", label: "Trade Vol", color: "var(--accent-green)" },
  { key: "diversification", label: "Diversif.", color: "var(--accent-purple)" },
  { key: "border_proximity", label: "Border Prox.", color: "var(--accent-amber)" },
  { key: "stability", label: "Stability", color: "var(--accent-green)" },
];

export default function ImpactPage() {
  const { region } = useRegion();
  const data = datasets[region];
  const [sortKey, setSortKey] = useState<SortKey>("composite");
  const [sortAsc, setSortAsc] = useState(false);

  // Convert ftz_impact dict to array
  const rows: FTZRow[] = useMemo(() => {
    return Object.entries(data.ftz_impact).map(([cityId, scores]) => ({
      city_id: cityId,
      ...scores,
    }));
  }, [data.ftz_impact]);

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      return sortAsc ? av - bv : bv - av;
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
        FTZ Impact Scores
      </h1>
      <p
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          marginBottom: 32,
        }}
      >
        Ranked table of all FTZ target cities with composite and sub-scores.
        Click column headers to sort.
      </p>

      {/* Bar Chart */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div className="label-mono" style={{ marginBottom: 16 }}>
          Composite Score Breakdown
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sorted.map((city) => (
            <div
              key={city.city_id}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <div
                style={{
                  width: 100,
                  fontSize: 11,
                  color: "var(--text-secondary)",
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {getCityName(city.city_id, region)}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 20,
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 4,
                  overflow: "hidden",
                  display: "flex",
                }}
              >
                {SCORE_COLUMNS.filter((c) => c.key !== "composite" && c.key !== "stability").map(
                  (col) => {
                    const val = city[col.key];
                    return (
                      <div
                        key={col.key}
                        style={{
                          width: `${(val / 6) * 100}%`,
                          height: "100%",
                          background: col.color,
                          opacity: 0.6,
                          borderRight: "1px solid rgba(10,10,15,0.5)",
                        }}
                        title={`${col.label}: ${formatScore(val)}`}
                      />
                    );
                  }
                )}
              </div>
              <div
                style={{
                  width: 40,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--accent-purple)",
                  textAlign: "right",
                }}
              >
                {formatScore(city.composite)}
              </div>
            </div>
          ))}
        </div>
        {/* Legend */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 16,
            flexWrap: "wrap",
          }}
        >
          {SCORE_COLUMNS.filter((c) => c.key !== "composite" && c.key !== "stability").map(
            (col) => (
              <div
                key={col.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 9,
                  color: "var(--text-muted)",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: col.color,
                    opacity: 0.6,
                  }}
                />
                {col.label}
              </div>
            )
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 24, overflow: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>City</th>
              <th>Country</th>
              {SCORE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    color:
                      sortKey === col.key
                        ? col.color
                        : undefined,
                    cursor: "pointer",
                  }}
                >
                  {col.label}
                  {sortKey === col.key && (sortAsc ? " ^" : " v")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((city, i) => {
              const cityInfo = getCityById(city.city_id, region);
              return (
                <tr key={city.city_id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                    {getCityName(city.city_id, region)}
                  </td>
                  <td>{cityInfo?.country ?? ""}</td>
                  {SCORE_COLUMNS.map((col) => {
                    const val = city[col.key];
                    const isStability = col.key === "stability";
                    return (
                      <td key={col.key}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <div className="score-bar" style={{ width: 40 }}>
                            <div
                              className="score-bar-fill"
                              style={{
                                width: `${val * 100}%`,
                                background: isStability
                                  ? val < 0.4
                                    ? "var(--accent-red)"
                                    : "var(--accent-green)"
                                  : col.color,
                              }}
                            />
                          </div>
                          <span
                            style={{
                              color: isStability
                                ? val < 0.4
                                  ? "var(--accent-red)"
                                  : "var(--accent-green)"
                                : undefined,
                            }}
                          >
                            {formatScore(val)}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}