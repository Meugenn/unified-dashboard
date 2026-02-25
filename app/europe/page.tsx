import RegionTemplate from "@/components/RegionTemplate";

export default function EuropePage() {
  return (
    <RegionTemplate
      regionName="Europe"
      dataUrl="https://raw.githubusercontent.com/Meugenn/europe-data/main/data/synthetic_gdp.csv"
      color="#10b981"
    />
  );
}