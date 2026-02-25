"use client";

import { useState, useMemo } from "react";
import { data, formatScore } from "@/lib/data";

type SortKey = "gap" | "confidence" | "model_score" | "actual_score" | "signal_type";

export default function OpportunitiesPage() {
  const [sortKey, setSortKey] = useState<SortKey>("gap");
  const [sortAsc, setSortAsc] = useState(false);
  const [filterType, setFilterType] = useState<string>("ALL");

  const filtered = useMemo(() => {
    let items = [...data.opportunities];
    if (filterType !== "ALL") {
      items = items.filter((o) => o.signal_type === filterType);
    }
    items.sort((a, b) => {
      if (sortKey === "signal_type") {
        return sortAsc
          ? a.signal_type.localeCompare(b.signal_type)
          : b.signal_type.localeCompare(a.signal_type);
      }
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortAsc ? av - bv : bv - av;
    });
    return items;
  }, [sortKey, sortAsc, filterType]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const counts = useMemo(() => {
    const c = { OPPORTUNITY: 0, RISK: 0, NEUTRAL: 0 };
    for (const o of data.opportunities) {
      c[o.signal_type]++;
    }
    return c;
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <span className="label-mono">Signals</span>
      </div>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 8,
          color: "var(--text-primary)",
        }}
      >
        Opportunity Signals
      </h1>
      <p
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          marginBottom: 32,
        }}
      >
        Detected opportunity and risk signals across FTZ target cities based on
        model predictions vs actual connectivity scores.
      </p>

      {/* Summary cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div className="card" style={{ padding: "16px 20px" }}>
          <div className="label-mono" style={{ marginBottom: 8 }}>
            Opportunities
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "var(--accent-green)",
            }}
          >
            {counts.OPPORTUNITY}
          </div>
        </div>
        <div className="card" style={{ padding: "16px 20px" }}>
          <div className="label-mono" style={{ marginBottom: 8 }}>
            Risks
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "var(--accent-red)",
            }}
          >
            {counts.RISK}
          </div>
        </div>
        <div className="card" style={{ padding: "16px 20px" }}>
          <div className="label-mono" style={{ marginBottom: 8 }}>
            Neutral
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "var(--text-secondary)",
            }}
          >
            {counts.NEUTRAL}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {["ALL", "OPPORTUNITY", "RISK", "NEUTRAL"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: 4,
              border:
                filterType === type
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid rgba(255,255,255,0.06)",
              background:
                filterType === type
                  ? "rgba(255,255,255,0.06)"
                  : "transparent",
              color:
                filterType === type
                  ? "var(--text-primary)"
                  : "var(--text-muted)",
              cursor: "pointer",
              fontFamily: "var(--font-jetbrains), monospace",
            }}
          >
            {type === "ALL" ? `All (${data.opportunities.length})` : `${type} (${counts[type as keyof typeof counts]})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 24, overflow: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th
                onClick={() => handleSort("signal_type")}
                style={{
                  color:
                    sortKey === "signal_type"
                      ? "var(--accent-green)"
                      : undefined,
                  cursor: "pointer",
                }}
              >
                Type
                {sortKey === "signal_type" && (sortAsc ? " ^" : " v")}
              </th>
              <th>City</th>
              <th>Country</th>
              <th
                onClick={() => handleSort("model_score")}
                style={{
                  color:
                    sortKey === "model_score"
                      ? "var(--accent-green)"
                      : undefined,
                  cursor: "pointer",
                }}
              >
                Model Score
                {sortKey === "model_score" && (sortAsc ? " ^" : " v")}
              </th>
              <th
                onClick={() => handleSort("actual_score")}
                style={{
                  color:
                    sortKey === "actual_score"
                      ? "var(--accent-green)"
                      : undefined,
                  cursor: "pointer",
                }}
              >
                Actual Score
                {sortKey === "actual_score" && (sortAsc ? " ^" : " v")}
              </th>
              <th
                onClick={() => handleSort("gap")}
                style={{
                  color:
                    sortKey === "gap" ? "var(--accent-green)" : undefined,
                  cursor: "pointer",
                }}
              >
                Gap
                {sortKey === "gap" && (sortAsc ? " ^" : " v")}
              </th>
              <th
                onClick={() => handleSort("confidence")}
                style={{
                  color:
                    sortKey === "confidence"
                      ? "var(--accent-green)"
                      : undefined,
                  cursor: "pointer",
                }}
              >
                Confidence
                {sortKey === "confidence" && (sortAsc ? " ^" : " v")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((opp, i) => (
              <tr key={opp.city_id}>
                <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                <td>
                  <span
                    className={`signal-badge ${opp.signal_type.toLowerCase()}`}
                  >
                    {opp.signal_type}
                  </span>
                </td>
                <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                  {opp.city_name}
                </td>
                <td>{opp.country}</td>
                <td>
                  <span style={{ color: "var(--accent-purple)" }}>
                    {formatScore(opp.model_score)}
                  </span>
                </td>
                <td>{formatScore(opp.actual_score)}</td>
                <td>
                  <span
                    style={{
                      color:
                        opp.gap > 0
                          ? "var(--accent-green)"
                          : opp.gap < 0
                          ? "var(--accent-red)"
                          : "var(--text-secondary)",
                      fontWeight: 500,
                    }}
                  >
                    {opp.gap > 0 ? "+" : ""}
                    {formatScore(opp.gap)}
                  </span>
                </td>
                <td>
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
                          width: `${opp.confidence * 100}%`,
                          background: "var(--accent-purple)",
                        }}
                      />
                    </div>
                    <span>{fmtPct(opp.confidence)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function fmtPct(n: number): string {
  return `${(n * 100).toFixed(0)}%`;
}