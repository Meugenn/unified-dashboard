import RegionTemplate from "@/components/RegionTemplate";

export default function RegionsPage() {
  return (
    <RegionTemplate
      regionName="Regions"
      dataUrl="https://raw.githubusercontent.com/Meugenn/regions-data/main/data/synthetic_gdp.csv"
      color="#8b5cf6"
    />
  );
}