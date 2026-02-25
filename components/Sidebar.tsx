"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRegion, REGIONS } from "@/lib/RegionContext";

const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: "grid" },
  { href: "/map", label: "Network Map", icon: "map" },
  { href: "/impact", label: "FTZ Impact", icon: "bar" },
  { href: "/routes", label: "Trade Routes", icon: "route" },
  { href: "/cascades", label: "Cascades", icon: "alert" },
  { href: "/opportunities", label: "Opportunities", icon: "signal" },
];

function NavIcon({ icon }: { icon: string }) {
  const size = 16;
  const stroke = "currentColor";
  const fill = "none";

  switch (icon) {
    case "grid":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill={fill} stroke={stroke} strokeWidth="1.5">
          <rect x="2" y="2" width="5" height="5" rx="1" />
          <rect x="9" y="2" width="5" height="5" rx="1" />
          <rect x="2" y="9" width="5" height="5" rx="1" />
          <rect x="9" y="9" width="5" height="5" rx="1" />
        </svg>
      );
    case "map":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill={fill} stroke={stroke} strokeWidth="1.5">
          <path d="M1 3.5l4.5-1.5 5 2 4.5-1.5v10l-4.5 1.5-5-2L1 13.5z" />
          <path d="M5.5 2v10M10.5 4v10" />
        </svg>
      );
    case "bar":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill={fill} stroke={stroke} strokeWidth="1.5">
          <rect x="2" y="8" width="3" height="6" rx="0.5" />
          <rect x="6.5" y="4" width="3" height="10" rx="0.5" />
          <rect x="11" y="2" width="3" height="12" rx="0.5" />
        </svg>
      );
    case "route":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill={fill} stroke={stroke} strokeWidth="1.5">
          <circle cx="3" cy="13" r="1.5" />
          <circle cx="13" cy="3" r="1.5" />
          <path d="M3 11.5V8a3 3 0 013-3h4a3 3 0 003-3" />
        </svg>
      );
    case "alert":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill={fill} stroke={stroke} strokeWidth="1.5">
          <path d="M7.13 2.5a1 1 0 011.74 0l5.5 9.5A1 1 0 0113.5 13.5h-11a1 1 0 01-.87-1.5z" />
          <path d="M8 6v3M8 11h.01" />
        </svg>
      );
    case "signal":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill={fill} stroke={stroke} strokeWidth="1.5">
          <path d="M2 14l3-5 3 3 3-7 3 4" />
        </svg>
      );
    default:
      return null;
  }
}

export function Sidebar() {
  const pathname = usePathname();
  const { region, setRegion } = useRegion();

  return (
    <nav className="sidebar">
      <div style={{ padding: "0 24px", marginBottom: 32 }}>
        <div className="label-mono" style={{ fontSize: 8, marginBottom: 4 }}>
          BLOOMSBURY / MAYNARD
        </div>
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "0.02em",
          }}
        >
          Unified Data
        </div>
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 10,
            color: "var(--text-muted)",
            marginTop: 2,
          }}
        >
          Network Analysis
        </div>
      </div>

      {/* Region Switcher */}
      <div style={{ padding: "0 24px", marginBottom: 24 }}>
        <div className="label-mono" style={{ marginBottom: 8, fontSize: 10 }}>
          Region
        </div>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value as any)}
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: 12,
            fontFamily: "var(--font-jetbrains), monospace",
            background: "var(--bg-card)",
            border: "1px solid var(--border-card)",
            borderRadius: 4,
            color: "var(--text-primary)",
            outline: "none",
            cursor: "pointer",
          }}
        >
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r === "west-africa" ? "West Africa" :
               r === "europe" ? "Europe" :
               r === "world" ? "World" :
               r === "regions" ? "Regions" : r}
            </option>
          ))}
        </select>
      </div>

      <div
        className="label-mono"
        style={{ padding: "0 24px", marginBottom: 8 }}
      >
        Navigation
      </div>

      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link${isActive ? " active" : ""}`}
          >
            <NavIcon icon={item.icon} />
            {item.label}
          </Link>
        );
      })}

      <div style={{ flex: 1 }} />

      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid var(--border-card)",
        }}
      >
        <div className="label-mono" style={{ marginBottom: 4 }}>
          Data Source
        </div>
        <div
          style={{
            fontSize: 10,
            color: "var(--text-muted)",
          }}
        >
          {region === "west-africa" ? "analysis-data.json" :
           region === "europe" ? "europe-data.json" :
           region === "world" ? "world-data.json" :
           "regions-data.json"}
        </div>
      </div>
    </nav>
  );
}