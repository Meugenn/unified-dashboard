"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

// Dynamically import Leaflet to avoid SSR issues
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

interface DataPoint {
  year: string;
  gdp: number;
  population?: number;
  inflation?: number;
}

export default function Home() {
  const [globalData, setGlobalData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGlobalData();
  }, []);

  const fetchGlobalData = async () => {
    try {
      // Fetch data from all repositories
      const urls = [
        "https://raw.githubusercontent.com/Meugenn/west-africa-data/main/data/synthetic_gdp.csv",
        "https://raw.githubusercontent.com/Meugenn/europe-data/main/data/synthetic_gdp.csv",
        "https://raw.githubusercontent.com/Meugenn/world-data/main/data/synthetic_gdp.csv",
        "https://raw.githubusercontent.com/Meugenn/regions-data/main/data/synthetic_gdp.csv",
      ];

      const responses = await Promise.all(urls.map(url => axios.get(url)));
      
      // Parse CSV data (simplified - in real app, use proper CSV parsing)
      const allData: DataPoint[] = [];
      responses.forEach((response, index) => {
        const lines = response.data.split('\n');
        lines.slice(1).forEach((line: string) => {
          const [year, gdp] = line.split(',');
          if (year && gdp) {
            allData.push({
              year: year.trim(),
              gdp: parseFloat(gdp.trim()) || 0,
            });
          }
        });
      });

      // Aggregate data by year
      const aggregated = allData.reduce((acc: {[key: string]: DataPoint}, item) => {
        if (!acc[item.year]) {
          acc[item.year] = { ...item };
        } else {
          acc[item.year].gdp += item.gdp;
        }
        return acc;
      }, {});

      const sortedData = Object.values(aggregated)
        .sort((a, b) => parseInt(a.year) - parseInt(b.year))
        .slice(-10); // Last 10 years

      setGlobalData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Fallback sample data
      setGlobalData([
        { year: "2015", gdp: 78000 },
        { year: "2016", gdp: 81000 },
        { year: "2017", gdp: 85000 },
        { year: "2018", gdp: 89000 },
        { year: "2019", gdp: 92000 },
        { year: "2020", gdp: 88000 },
        { year: "2021", gdp: 95000 },
        { year: "2022", gdp: 98000 },
        { year: "2023", gdp: 102000 },
        { year: "2024", gdp: 105000 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ["Year", "GDP"];
    const csvContent = [
      headers.join(","),
      ...globalData.map(row => [row.year, row.gdp].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "global_data.csv";
    a.click();
  };

  const filteredData = globalData.filter(item =>
    item.year.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Global Dashboard</h1>
          <p className="text-gray-600">Overview of data from all pipelines</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by year..."
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
        {/* World Map */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">World Map</h2>
          <div className="h-96 rounded-lg overflow-hidden">
            <Map />
          </div>
        </div>

        {/* GDP Growth Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Global GDP Growth</h2>
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
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="GDP (in billions)"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Comparative Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Regional Comparison</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="gdp" fill="#10b981" name="Total GDP" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Raw Data</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GDP (in billions)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => {
                const prevGdp = index > 0 ? filteredData[index - 1].gdp : item.gdp;
                const growthRate = ((item.gdp - prevGdp) / prevGdp * 100).toFixed(2);
                return (
                  <tr key={item.year}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.gdp.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        parseFloat(growthRate) >= 0 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {growthRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}