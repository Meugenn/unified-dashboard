"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        color: "var(--text-muted)",
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: 12,
      }}
    >
      Loading map...
    </div>
  ),
});

export default function MapPage() {
  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <span className="label-mono">Visualization</span>
      </div>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 8,
          color: "var(--text-primary)",
        }}
      >
        Network Map
      </h1>
      <p
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          marginBottom: 24,
        }}
      >
        Interactive visualization of West Africa FTZ network
      </p>

      <div
        style={{
          height: "calc(100vh - 200px)",
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid var(--border-card)",
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <MapView />
        </Suspense>
      </div>
    </div>
  );
}