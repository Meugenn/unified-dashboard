"use client";

import { useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { data, getBlocColor, getEdgeTypeColor, formatNumber } from "@/lib/data";
import type { City, Edge } from "@/lib/types";

const EDGE_TYPES = ["TRADE", "POLITICAL", "CULTURAL", "MIGRATORY", "LABOUR", "INFRASTRUCTURE", "FINANCIAL"];

function CityPopup({ city }: { city: City }) {
  return (
    <div style={{ minWidth: 180 }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#e2e8f0",
          marginBottom: 4,
        }}
      >
        {city.name}
      </div>
      <div
        style={{
          fontSize: 10,
          color: "#94a3b8",
          marginBottom: 8,
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
      >
        <span>{city.country}</span>
        <span
          style={{
            padding: "1px 6px",
            borderRadius: 3,
            fontSize: 8,
            fontWeight: 600,
            letterSpacing: "0.06em",
            background: `${getBlocColor(city.bloc)}20`,
            color: getBlocColor(city.bloc),
            border: `1px solid ${getBlocColor(city.bloc)}40`,
          }}
        >
          {city.bloc}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px 12px",
          fontSize: 10,
        }}
      >
        <div style={{ color: "#64748b" }}>Population</div>
        <div style={{ color: "#e2e8f0", textAlign: "right" }}>
          {formatNumber(city.population)}
        </div>
        <div style={{ color: "#64748b" }}>GDP/cap</div>
        <div style={{ color: "#e2e8f0", textAlign: "right" }}>
          ${formatNumber(city.gdp_per_capita)}
        </div>
        <div style={{ color: "#64748b" }}>Port</div>
        <div style={{ color: "#e2e8f0", textAlign: "right" }}>
          {city.is_port ? "Yes" : "No"}
        </div>
        <div style={{ color: "#64748b" }}>Capital</div>
        <div style={{ color: "#e2e8f0", textAlign: "right" }}>
          {city.is_capital ? "Yes" : "No"}
        </div>
        <div style={{ color: "#64748b" }}>FTZ Target</div>
        <div
          style={{
            color: city.is_ftz_target ? "#00d4aa" : "#e2e8f0",
            textAlign: "right",
            fontWeight: city.is_ftz_target ? 600 : 400,
          }}
        >
          {city.is_ftz_target ? "Yes" : "No"}
        </div>
        <div style={{ color: "#64748b" }}>CFA Zone</div>
        <div style={{ color: "#e2e8f0", textAlign: "right" }}>
          {city.cfa_zone ? "Yes" : "No"}
        </div>
      </div>
      {city.tags.length > 0 && (
        <div style={{ marginTop: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>
          {city.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 8,
                padding: "1px 5px",
                borderRadius: 3,
                background: "rgba(255,255,255,0.06)",
                color: "#94a3b8",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MapView() {
  const [activeEdgeTypes, setActiveEdgeTypes] = useState<Set<string>>(
    new Set(EDGE_TYPES)
  );

  const cityMap = useMemo(() => {
    const m = new Map<string, City>();
    for (const c of data.cities) m.set(c.id, c);
    return m;
  }, []);

  const filteredEdges = useMemo(() => {
    return data.edges.filter(
      (e) => e.is_active && activeEdgeTypes.has(e.edge_type)
    );
  }, [activeEdgeTypes]);

  const toggleEdgeType = (type: string) => {
    setActiveEdgeTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Edge type filter */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 1000,
          background: "rgba(10, 10, 15, 0.9)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 8,
          padding: "12px 16px",
        }}
      >
        <div
          className="label-mono"
          style={{ marginBottom: 8, fontSize: 8 }}
        >
          Edge Types
        </div>
        {EDGE_TYPES.map((type) => (
          <label
            key={type}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              fontSize: 11,
              color: activeEdgeTypes.has(type)
                ? getEdgeTypeColor(type)
                : "#64748b",
              marginBottom: 4,
            }}
          >
            <input
              type="checkbox"
              checked={activeEdgeTypes.has(type)}
              onChange={() => toggleEdgeType(type)}
              style={{ accentColor: getEdgeTypeColor(type) }}
            />
            {type}
          </label>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          zIndex: 1000,
          background: "rgba(10, 10, 15, 0.9)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 8,
          padding: "12px 16px",
        }}
      >
        <div className="label-mono" style={{ marginBottom: 8, fontSize: 8 }}>
          Bloc Membership
        </div>
        {Object.entries({
          ECOWAS: "#00d4aa",
          UEMOA: "#818cf8",
          SUSPENDED: "#ff4466",
          EXTERNAL: "#94a3b8",
        }).map(([name, color]) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 10,
              color: "#94a3b8",
              marginBottom: 3,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: color,
              }}
            />
            {name}
          </div>
        ))}
      </div>

      <MapContainer
        center={[9.5, -2.0]}
        zoom={5}
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Edges */}
        {filteredEdges.map((edge: Edge, i: number) => {
          const src = cityMap.get(edge.source);
          const tgt = cityMap.get(edge.target);
          if (!src || !tgt) return null;
          return (
            <Polyline
              key={`${edge.source}-${edge.target}-${edge.edge_type}-${i}`}
              positions={[
                [src.lat, src.lng],
                [tgt.lat, tgt.lng],
              ]}
              pathOptions={{
                color: getEdgeTypeColor(edge.edge_type),
                weight: Math.max(1, edge.weight * 2.5),
                opacity: 0.35,
              }}
            />
          );
        })}

        {/* Cities */}
        {data.cities.map((city: City) => {
          const radius = city.is_ftz_target
            ? 7
            : city.is_port
            ? 5
            : city.is_capital
            ? 4
            : 3;

          return (
            <CircleMarker
              key={city.id}
              center={[city.lat, city.lng]}
              radius={radius}
              pathOptions={{
                fillColor: getBlocColor(city.bloc),
                fillOpacity: city.is_ftz_target ? 0.9 : 0.7,
                color: city.is_ftz_target ? "#fbbf24" : getBlocColor(city.bloc),
                weight: city.is_ftz_target ? 2 : 1,
                opacity: 0.8,
              }}
            >
              <Popup>
                <CityPopup city={city} />
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}