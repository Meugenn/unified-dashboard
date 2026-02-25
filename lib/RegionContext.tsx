"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Region } from "./data";

export const REGIONS: Region[] = ["west-africa", "europe", "world", "regions"];

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [region, setRegionState] = useState<Region>("west-africa");

  // Initialize from URL query param
  useEffect(() => {
    const regionParam = searchParams.get("region") as Region;
    if (regionParam && REGIONS.includes(regionParam)) {
      setRegionState(regionParam);
    }
  }, [searchParams]);

  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    
    // Update URL query param
    const params = new URLSearchParams(searchParams.toString());
    params.set("region", newRegion);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
}