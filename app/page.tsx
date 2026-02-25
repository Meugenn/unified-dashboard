import { data, formatNumber, formatScore, getBlocColor, getCityName } from "@/lib/data";
import StatCard from "@/components/StatCard";

export default function OverviewPage() {
  const { summary, metrics, ftz_impact, cities } = data;

  // Convert betweenness dict to sorted array
  const topCentrality = Object.entries(metrics.betweenness)
    .map(([cityId, betweenness]) => ({
      city_id: cityId,
      betweenness,
      degree: metrics.degree[cityId] ?? 0,
      closeness: metrics.closeness[cityId] ?? 0,
    }))
    .sort((a, b) => b.betweenness - a.betweenness)
    .slice(0, 5);

  // Convert ftz_impact dict to sorted array
  const topFTZ = Object.entries(ftz_impact)
    .map(([cityId, scores]) => ({
      city_id: cityId,
      ...scores,
    }))
    .sort((a, b) => b.composite - a.composite)
    .slice(0, 5);

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <span className="label-mono">Dashboard</span>
      </div>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 8,
          color: "var(--text-primary)",
        }}
      >
        Network Overview
      </h1>
      <p
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          marginBottom: 32,
        }}
      >
        Unified network analysis summary
      </p>

      {/* Summary Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginBottom: 40,
        }}
      >
        <StatCard
          label="Nodes"
          value={summary.nodes}
          accent="var(--accent-green)"
        />
        <StatCard
          label="Edges"
          value={summary.edges}
          accent="var(--accent-purple)"
        />
        <StatCard
          label="ECOWAS Active"
          value={summary.ecowas_active}
          accent="var(--accent-green)"
        />
        <StatCard
          label="UEMOA / CFA"
          value={summary.uemoa_cfa}
          accent="var(--accent-purple)"
        />
        <StatCard
          label="Suspended"
          value={summary.suspended}
          accent="var(--accent-red)"
        />
        <StatCard
          label="Port Cities"
          value={summary.port_cities}
          accent="var(--accent-amber)"
        />
        <StatCard
          label="FTZ Targets"
          value={summary.ftz_targets}
          accent="var(--accent-green)"
        />
        <StatCard
          label="External"
          value={summary.external}
          accent="var(--text-secondary)"
        />
      </div>

      {/* Two column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        {/* Top Centrality */}
        <div className="card" style={{ padding: 24 }}>
          <div className="label-mono" style={{ marginBottom: 16 }}>
            Top 5 Cities by Betweenness Centrality
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>City</th>
                <th>Betweenness</th>
                <th>Degree</th>
                <th>Closeness</th>
              </tr>
            </thead>
            <tbody>
              {topCentrality.map((c, i) => {
                const city = cities.find((ct) => ct.id === c.city_id);
                return (
                  <tr key={c.city_id}>
                    <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                    <td>
                      <span style={{ color: "var(--text-primary)" }}>
                        {getCityName(c.city_id)}
                      </span>
                      {city && (
                        <span
                          className="bloc-badge"
                          style={{
                            marginLeft: 8,
                            background: `${getBlocColor(city.bloc)}15`,
                            color: getBlocColor(city.bloc),
                            border: `1px solid ${getBlocColor(city.bloc)}30`,
                          }}
                        >
                          {city.bloc}
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="score-bar" style={{ width: 60 }}>
                          <div
                            className="score-bar-fill"
                            style={{
                              width: `${(c.betweenness / 0.4) * 100}%`,
                              background: "var(--accent-green)",
                            }}
                          />
                        </div>
                        <span>{formatScore(c.betweenness)}</span>
                      </div>
                    </td>
                    <td>{formatScore(c.degree)}</td>
                    <td>{formatScore(c.closeness)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Top FTZ Scores */}
        <div className="card" style={{ padding: 24 }}>
          <div className="label-mono" style={{ marginBottom: 16 }}>
            Top 5 Cities by FTZ Impact Score
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>City</th>
                <th>Composite</th>
                <th>Connectivity</th>
                <th>Stability</th>
              </tr>
            </thead>
            <tbody>
              {topFTZ.map((f, i) => {
                const city = cities.find((ct) => ct.id === f.city_id);
                return (
                  <tr key={f.city_id}>
                    <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                    <td>
                      <span style={{ color: "var(--text-primary)" }}>
                        {getCityName(f.city_id)}
                      </span>
                      {city && (
                        <span
                          style={{
                            fontSize: 9,
                            color: "var(--text-muted)",
                            marginLeft: 6,
                          }}
                        >
                          {city.country}
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="score-bar" style={{ width: 60 }}>
                          <div
                            className="score-bar-fill"
                            style={{
                              width: `${f.composite * 100}%`,
                              background: "var(--accent-purple)",
                            }}
                          />
                        </div>
                        <span style={{ color: "var(--accent-purple)" }}>
                          {formatScore(f.composite)}
                        </span>
                      </div>
                    </td>
                    <td>{formatScore(f.connectivity)}</td>
                    <td>
                      <span
                        style={{
                          color:
                            f.stability < 0.4
                              ? "var(--accent-red)"
                              : "var(--accent-green)",
                        }}
                      >
                        {formatScore(f.stability)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Network metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginTop: 24,
        }}
      >
        <div className="card" style={{ padding: "16px 20px" }}>
          <div className="label-mono" style={{ marginBottom: 8 }}>
            Articulation Points
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)" }}>
            {metrics.articulation_points.length}
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4 }}>
            {metrics.articulation_points.slice(0, 3).map(getCityName).join(", ")}
            {metrics.articulation_points.length > 3 && "..."}
          </div>
        </div>
        <div className="card" style={{ padding: "16px 20px" }}>
          <div className="label-mono" style={{ marginBottom: 8 }}>
            Bridge Edges
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)" }}>
            {metrics.bridges.length}
          </div>
        </div>
        <div className="card" style={{ padding: "16px 20px" }}>
          <div className="label-mono" style={{ marginBottom: 8 }}>
            Components
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)" }}>
            {metrics.component_count}
          </div>
        </div>
      </div>
    </div>
  );
}