import RegionTemplate from "@/components/RegionTemplate";

export default function WestAfricaPage() {
  return (
    <RegionTemplate
      regionName="West Africa"
      dataUrl="https://raw.githubusercontent.com/Meugenn/west-africa-data/main/data/synthetic_gdp.csv"
      color="#3b82f6"
    />
  );
}