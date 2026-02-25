import { data, formatNumber, formatPercent, formatScore, getCityName } from "@/lib/data";

function SeverityColor(severity: number): string {
  if (severity >= 0.7) return "var(--accent-red)";
  if (severity >= 0.5) return "var(--accent-amber)";
  return "var(--accent-green)";
}

export default function CascadesPage() {
  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <span className="label-mono">Scenario Modeling</span>
      </div>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 8,
          color: "var(--text-primary)",
        }}
      >
        Cascade Scenarios
      </h1>
      <p
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          marginBottom: 32,
        }}
      >
        Geopolitical disruption scenarios and their projected impact on the trade network.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 24,
        }}
      >
        {data.cascades.map((scenario, idx) => {
          const sevColor = SeverityColor(scenario.severity);
          return (
            <div
              key={idx}
              className="card"
              style={{ padding: 28 }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 6,
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {scenario.name}
                    </h2>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "2px 8px",
                        borderRadius: 4,
                        background: `${sevColor}15`,
                        color: sevColor,
                        border: `1px solid ${sevColor}30`,
                      }}
                    >
                      {scenario.type}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="label-mono" style={{ marginBottom: 4 }}>
                    Trigger
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-primary)",
                      fontWeight: 500,
                    }}
                  >
                    {getCityName(scenario.trigger)}
                  </div>
                </div>
              </div>

              {/* Severity meter */}
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span className="label-mono">Severity</span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: sevColor,
                    }}
                  >
                    {formatPercent(scenario.severity)}
                  </span>
                </div>
                <div className="severity-meter">
                  <div
                    className="severity-fill"
                    style={{
                      width: `${scenario.severity * 100}%`,
                      background: `linear-gradient(90deg, var(--accent-green), var(--accent-amber), var(--accent-red))`,
                    }}
                  />
                </div>
              </div>

              {/* Metrics grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                <div>
                  <div className="label-mono" style={{ marginBottom: 4 }}>
                    Trade Volume Affected
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--accent-red)",
                    }}
                  >
                    {formatNumber(scenario.trade_volume_affected)}
                  </div>
                </div>
                <div>
                  <div className="label-mono" style={{ marginBottom: 4 }}>
                    New Components
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--accent-amber)",
                    }}
                  >
                    {scenario.new_components}
                  </div>
                </div>
                <div>
                  <div className="label-mono" style={{ marginBottom: 4 }}>
                    Isolated Cities
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--accent-red)",
                    }}
                  >
                    {scenario.isolated_cities.length}
                  </div>
                </div>
                <div>
                  <div className="label-mono" style={{ marginBottom: 4 }}>
                    Trade Disrupted
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {scenario.trade_disrupted_cities.length}
                  </div>
                </div>
              </div>

              {/* Affected cities */}
              <div style={{ marginBottom: 16 }}>
                <div className="label-mono" style={{ marginBottom: 8 }}>
                  Directly Affected Cities
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                  }}
                >
                  {scenario.affected_cities.map((cityId) => (
                    <span
                      key={cityId}
                      style={{
                        fontSize: 10,
                        padding: "3px 8px",
                        borderRadius: 4,
                        background: `${sevColor}10`,
                        color: sevColor,
                        border: `1px solid ${sevColor}25`,
                      }}
                    >
                      {getCityName(cityId)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Isolated cities */}
              {scenario.isolated_cities.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div className="label-mono" style={{ marginBottom: 8 }}>
                    Isolated Cities
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    {scenario.isolated_cities.map((cityId) => (
                      <span
                        key={cityId}
                        style={{
                          fontSize: 10,
                          padding: "3px 8px",
                          borderRadius: 4,
                          background: "rgba(255,68,102,0.10)",
                          color: "var(--accent-red)",
                          border: "1px solid rgba(255,68,102,0.25)",
                        }}
                      >
                        {getCityName(cityId)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trade disrupted cities */}
              {scenario.trade_disrupted_cities.length > 0 && (
                <div>
                  <div className="label-mono" style={{ marginBottom: 8 }}>
                    Trade Disrupted Cities
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    {scenario.trade_disrupted_cities.map((cityId) => (
                      <span
                        key={cityId}
                        style={{
                          fontSize: 10,
                          padding: "3px 8px",
                          borderRadius: 4,
                          background: "rgba(251,191,36,0.10)",
                          color: "var(--accent-amber)",
                          border: "1px solid rgba(251,191,36,0.25)",
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
    </div>
  );
}