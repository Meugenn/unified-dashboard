import RegionTemplate from "@/components/RegionTemplate";

export default function WorldPage() {
  return (
    <RegionTemplate
      regionName="World"
      dataUrl="https://raw.githubusercontent.com/Meugenn/world-data/main/data/synthetic_gdp.csv"
      color="#f59e0b"
    />
  );
}