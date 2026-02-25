# Unified Data Dashboard

A Next.js dashboard for visualizing data from multiple pipelines: West Africa, Europe, World, and Regions.

## Features

- **Global Dashboard**: Overview with world map and comparative charts
- **Region-specific Pages**: Detailed analysis for each data pipeline
- **Interactive Visualizations**:
  - Leaflet maps with markers
  - Recharts for GDP trends and comparisons
  - Responsive design with Tailwind CSS
- **Data Features**:
  - Search and filter functionality
  - Export to CSV buttons
  - Side-by-side comparisons
  - Real-time data fetching from GitHub repositories

## Data Sources

The dashboard fetches data from these GitHub repositories:
- West Africa: `https://raw.githubusercontent.com/Meugenn/west-africa-data/main/data/synthetic_gdp.csv`
- Europe: `https://raw.githubusercontent.com/Meugenn/europe-data/main/data/synthetic_gdp.csv`
- World: `https://raw.githubusercontent.com/Meugenn/world-data/main/data/synthetic_gdp.csv`
- Regions: `https://raw.githubusercontent.com/Meugenn/regions-data/main/data/synthetic_gdp.csv`

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Leaflet/React-Leaflet** for maps
- **Axios** for data fetching

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Meugenn/unified-dashboard.git
cd unified-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
unified-dashboard/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home/Global dashboard
│   ├── west-africa/       # West Africa page
│   ├── europe/            # Europe page
│   ├── world/             # World page
│   └── regions/           # Regions page
├── components/            # React components
│   ├── Navigation.tsx     # Navigation bar
│   ├── Map.tsx           # Leaflet map component
│   └── RegionTemplate.tsx # Template for region pages
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## Deployment

This project is configured for easy deployment on Vercel:

1. Push to GitHub
2. Import the repository in Vercel
3. Automatic deployments on push

## License

MIT