"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

interface DataPoint {
  year: string;
  gdp: number;
  population?: number;
  inflation?: number;
  region?: string;
}

interface RegionTemplateProps {
  regionName: string;
  dataUrl: string;
  color: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function RegionTemplate({ regionName, dataUrl, color }: RegionTemplateProps) {
  const [regionData, setRegionData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRegionData();
  }, [dataUrl]);

  const fetchRegionData = async () => {
    try {
      const response = await fetch(dataUrl);
      const text = await response.text();
      const lines = text.split('\n');
      
      const data: DataPoint[] = [];
      lines.slice(1).forEach((line: string) => {
        const [year, gdp] = line.split(',');
        if (year && gdp) {
          data.push({
            year: year.trim(),
            gdp: parseFloat(gdp.trim()) || 0,
            region: regionName,
          });
        }
      });

      const sortedData = data
        .sort((a, b) => parseInt(a.year) - parseInt(b.year))
        .slice(-10);

      setRegionData(sortedData);
    } catch (error) {
      console.error(`Error fetching ${regionName} data:`, error);
      // Fallback sample data
      const sampleData = Array.from({ length: 10 }, (_, i) => ({
        year: (2015 + i).toString(),
        gdp: 5000 + Math.random() * 10000,
        population: 1000000 + Math.random() * 5000000,
        inflation: 1 + Math.random() * 5,
        region: regionName,
      }));
      setRegionData(sampleData);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ["Year", "GDP", "Population", "Inflation", "Region"];
    const csvContent = [
      headers.join(","),
      ...regionData.map(row => [
        row.year,
        row.gdp,
        row.population || "",
        row.inflation || "",
        row.region || ""
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${regionName.toLowerCase().replace(/\s+/g, '_')}_data.csv`;
    a.click();
  };

  const filteredData = regionData.filter(item =>
    item.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.region?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pieData = filteredData.slice(-5).map(item => ({
    name: item.year,
    value: item.gdp,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{regionName} Dashboard</h1>
          <p className="text-gray-600">Detailed analysis of {regionName} data</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Export to CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Region Map */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">{regionName} Map</h2>
          <div className="h-96 rounded-lg overflow-hidden">
            <Map />
          </div>
        </div>

        {/* GDP Trend Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">GDP Trend</h2>
          <div className="h-96">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="gdp"
                    stroke={color}
                    strokeWidth={2}
                    name="GDP"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">GDP Distribution (Last 5 Years)</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Yearly Comparison</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="gdp" fill={color} name="GDP" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">{regionName} Data</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GDP
                </th>
                <th className="px-6 py-3 text-left text-xs font-group-medium text-gray-500 uppercase tracking-wider">
                  Population
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inflation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={`${item.year}-${index}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.gdp.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.population ? item.population.toLocaleString() : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.inflation ? `${item.inflation.toFixed(2)}%` : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.region}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}