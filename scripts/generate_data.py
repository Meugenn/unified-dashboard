#!/usr/bin/env python3
"""
Generate synthetic analysis data for Europe, World, and Regions datasets.
Follows the exact AnalysisData schema from types.ts.
"""

import json
import random
from datetime import datetime
from typing import Dict, List, Tuple
import math

# Set random seed for reproducibility
random.seed(42)

def generate_city_data(region: str) -> List[Dict]:
    """Generate city data for a specific region."""
    if region == "europe":
        cities = [
            "London", "Paris", "Berlin", "Rome", "Madrid", "Amsterdam", "Brussels", "Vienna", 
            "Warsaw", "Prague", "Stockholm", "Copenhagen", "Zurich", "Dublin", "Lisbon", 
            "Helsinki", "Oslo", "Athens", "Budapest", "Bucharest", "Istanbul", "Kyiv", 
            "Tbilisi", "Belgrade", "Zagreb", "Bratislava", "Ljubljana", "Tallinn", "Riga", "Vilnius"
        ]
        countries = {
            "London": "United Kingdom", "Paris": "France", "Berlin": "Germany", "Rome": "Italy",
            "Madrid": "Spain", "Amsterdam": "Netherlands", "Brussels": "Belgium", "Vienna": "Austria",
            "Warsaw": "Poland", "Prague": "Czech Republic", "Stockholm": "Sweden", "Copenhagen": "Denmark",
            "Zurich": "Switzerland", "Dublin": "Ireland", "Lisbon": "Portugal", "Helsinki": "Finland",
            "Oslo": "Norway", "Athens": "Greece", "Budapest": "Hungary", "Bucharest": "Romania",
            "Istanbul": "Turkey", "Kyiv": "Ukraine", "Tbilisi": "Georgia", "Belgrade": "Serbia",
            "Zagreb": "Croatia", "Bratislava": "Slovakia", "Ljubljana": "Slovenia", "Tallinn": "Estonia",
            "Riga": "Latvia", "Vilnius": "Lithuania"
        }
        country_codes = {
            "United Kingdom": "GBR", "France": "FRA", "Germany": "DEU", "Italy": "ITA",
            "Spain": "ESP", "Netherlands": "NLD", "Belgium": "BEL", "Austria": "AUT",
            "Poland": "POL", "Czech Republic": "CZE", "Sweden": "SWE", "Denmark": "DNK",
            "Switzerland": "CHE", "Ireland": "IRL", "Portugal": "PRT", "Finland": "FIN",
            "Norway": "NOR", "Greece": "GRC", "Hungary": "HUN", "Romania": "ROU",
            "Turkey": "TUR", "Ukraine": "UKR", "Georgia": "GEO", "Serbia": "SRB",
            "Croatia": "HRV", "Slovakia": "SVK", "Slovenia": "SVN", "Estonia": "EST",
            "Latvia": "LVA", "Lithuania": "LTU"
        }
        blocs = ["EU", "EEA", "CANDIDATE", "PARTNER", "EFTA"]
        bloc_assignments = {
            "London": "PARTNER", "Paris": "EU", "Berlin": "EU", "Rome": "EU", "Madrid": "EU",
            "Amsterdam": "EU", "Brussels": "EU", "Vienna": "EU", "Warsaw": "EU", "Prague": "EU",
            "Stockholm": "EU", "Copenhagen": "EU", "Zurich": "EFTA", "Dublin": "EU", "Lisbon": "EU",
            "Helsinki": "EU", "Oslo": "EEA", "Athens": "EU", "Budapest": "EU", "Bucharest": "EU",
            "Istanbul": "CANDIDATE", "Kyiv": "CANDIDATE", "Tbilisi": "PARTNER", "Belgrade": "CANDIDATE",
            "Zagreb": "EU", "Bratislava": "EU", "Ljubljana": "EU", "Tallinn": "EU", "Riga": "EU", "Vilnius": "EU"
        }
        coordinates = {
            "London": (51.5074, -0.1278), "Paris": (48.8566, 2.3522), "Berlin": (52.5200, 13.4050),
            "Rome": (41.9028, 12.4964), "Madrid": (40.4168, -3.7038), "Amsterdam": (52.3676, 4.9041),
            "Brussels": (50.8503, 4.3517), "Vienna": (48.2082, 16.3738), "Warsaw": (52.2297, 21.0122),
            "Prague": (50.0755, 14.4378), "Stockholm": (59.3293, 18.0686), "Copenhagen": (55.6761, 12.5683),
            "Zurich": (47.3769, 8.5417), "Dublin": (53.3498, -6.2603), "Lisbon": (38.7223, -9.1393),
            "Helsinki": (60.1699, 24.9384), "Oslo": (59.9139, 10.7522), "Athens": (37.9838, 23.7275),
            "Budapest": (47.4979, 19.0402), "Bucharest": (44.4268, 26.1025), "Istanbul": (41.0082, 28.9784),
            "Kyiv": (50.4501, 30.5234), "Tbilisi": (41.7151, 44.8271), "Belgrade": (44.7866, 20.4489),
            "Zagreb": (45.8150, 15.9819), "Bratislava": (48.1486, 17.1077), "Ljubljana": (46.0569, 14.5058),
            "Tallinn": (59.4370, 24.7536), "Riga": (56.9496, 24.1052), "Vilnius": (54.6872, 25.2797)
        }
        ftz_targets = ["Rotterdam", "Hamburg", "Antwerp", "Piraeus", "Gdansk"]
        
    elif region == "world":
        cities = [
            "New York", "London", "Tokyo", "Shanghai", "Singapore", "Dubai", "São Paulo", "Mumbai",
            "Sydney", "Hong Kong", "Toronto", "Lagos", "Nairobi", "Cairo", "Moscow", "Seoul",
            "Jakarta", "Bangkok", "Mexico City", "Buenos Aires", "Johannesburg", "Riyadh", "Istanbul",
            "Berlin", "Paris", "Los Angeles", "Chicago", "San Francisco", "Beijing", "Shenzhen",
            "Delhi", "Karachi", "Lima", "Bogota", "Santiago", "Kuala Lumpur", "Manila", "Hanoi",
            "Addis Ababa", "Accra"
        ]
        countries = {
            "New York": "United States", "London": "United Kingdom", "Tokyo": "Japan", "Shanghai": "China",
            "Singapore": "Singapore", "Dubai": "United Arab Emirates", "São Paulo": "Brazil", "Mumbai": "India",
            "Sydney": "Australia", "Hong Kong": "China", "Toronto": "Canada", "Lagos": "Nigeria",
            "Nairobi": "Kenya", "Cairo": "Egypt", "Moscow": "Russia", "Seoul": "South Korea",
            "Jakarta": "Indonesia", "Bangkok": "Thailand", "Mexico City": "Mexico", "Buenos Aires": "Argentina",
            "Johannesburg": "South Africa", "Riyadh": "Saudi Arabia", "Istanbul": "Turkey", "Berlin": "Germany",
            "Paris": "France", "Los Angeles": "United States", "Chicago": "United States", "San Francisco": "United States",
            "Beijing": "China", "Shenzhen": "China", "Delhi": "India", "Karachi": "Pakistan",
            "Lima": "Peru", "Bogota": "Colombia", "Santiago": "Chile", "Kuala Lumpur": "Malaysia",
            "Manila": "Philippines", "Hanoi": "Vietnam", "Addis Ababa": "Ethiopia", "Accra": "Ghana"
        }
        country_codes = {
            "United States": "USA", "United Kingdom": "GBR", "Japan": "JPN", "China": "CHN",
            "Singapore": "SGP", "United Arab Emirates": "ARE", "Brazil": "BRA", "India": "IND",
            "Australia": "AUS", "Canada": "CAN", "Nigeria": "NGA", "Kenya": "KEN",
            "Egypt": "EGY", "Russia": "RUS", "South Korea": "KOR", "Indonesia": "IDN",
            "Thailand": "THA", "Mexico": "MEX", "Argentina": "ARG", "South Africa": "ZAF",
            "Saudi Arabia": "SAU", "Turkey": "TUR", "Germany": "DEU", "France": "FRA",
            "Pakistan": "PAK", "Peru": "PER", "Colombia": "COL", "Chile": "CHL",
            "Malaysia": "MYS", "Philippines": "PHL", "Vietnam": "VNM", "Ethiopia": "ETH", "Ghana": "GHA"
        }
        blocs = ["G7", "BRICS", "ASEAN", "AU", "EU", "MERCOSUR", "GCC", "APEC"]
        bloc_assignments = {
            "New York": "G7", "London": "G7", "Tokyo": "G7", "Shanghai": "BRICS", "Singapore": "ASEAN",
            "Dubai": "GCC", "São Paulo": "BRICS", "Mumbai": "BRICS", "Sydney": "APEC", "Hong Kong": "APEC",
            "Toronto": "G7", "Lagos": "AU", "Nairobi": "AU", "Cairo": "AU", "Moscow": "BRICS",
            "Seoul": "APEC", "Jakarta": "ASEAN", "Bangkok": "ASEAN", "Mexico City": "APEC", "Buenos Aires": "MERCOSUR",
            "Johannesburg": "BRICS", "Riyadh": "GCC", "Istanbul": "G20", "Berlin": "EU", "Paris": "EU",
            "Los Angeles": "G7", "Chicago": "G7", "San Francisco": "G7", "Beijing": "BRICS", "Shenzhen": "BRICS",
            "Delhi": "BRICS", "Karachi": "SAARC", "Lima": "APEC", "Bogota": "APEC", "Santiago": "APEC",
            "Kuala Lumpur": "ASEAN", "Manila": "ASEAN", "Hanoi": "ASEAN", "Addis Ababa": "AU", "Accra": "AU"
        }
        coordinates = {
            "New York": (40.7128, -74.0060), "London": (51.5074, -0.1278), "Tokyo": (35.6762, 139.6503),
            "Shanghai": (31.2304, 121.4737), "Singapore": (1.3521, 103.8198), "Dubai": (25.2048, 55.2708),
            "São Paulo": (-23.5505, -46.6333), "Mumbai": (19.0760, 72.8777), "Sydney": (-33.8688, 151.2093),
            "Hong Kong": (22.3193, 114.1694), "Toronto": (43.6532, -79.3832), "Lagos": (6.5244, 3.3792),
            "Nairobi": (-1.2921, 36.8219), "Cairo": (30.0444, 31.2357), "Moscow": (55.7558, 37.6173),
            "Seoul": (37.5665, 126.9780), "Jakarta": (-6.2088, 106.8456), "Bangkok": (13.7563, 100.5018),
            "Mexico City": (19.4326, -99.1332), "Buenos Aires": (-34.6037, -58.3816), "Johannesburg": (-26.2041, 28.0473),
            "Riyadh": (24.7136, 46.6753), "Istanbul": (41.0082, 28.9784), "Berlin": (52.5200, 13.4050),
            "Paris": (48.8566, 2.3522), "Los Angeles": (34.0522, -118.2437), "Chicago": (41.8781, -87.6298),
            "San Francisco": (37.7749, -122.4194), "Beijing": (39.9042, 116.4074), "Shenzhen": (22.5431, 114.0579),
            "Delhi": (28.7041, 77.1025), "Karachi": (24.8607, 67.0011), "Lima": (-12.0464, -77.0428),
            "Bogota": (4.7110, -74.0721), "Santiago": (-33.4489, -70.6693), "Kuala Lumpur": (3.1390, 101.6869),
            "Manila": (14.5995, 120.9842), "Hanoi": (21.0285, 105.8542), "Addis Ababa": (9.0320, 38.7469),
            "Accra": (5.6037, -0.1870)
        }
        ftz_targets = ["Singapore", "Dubai", "Hong Kong", "Panama", "Shenzhen"]
        
    else:  # regions
        # Mix of regional hubs — 5-7 per continent
        cities = [
            # Americas
            "New York", "Mexico City", "São Paulo", "Toronto", "Buenos Aires", "Lima", "Bogota",
            # Europe
            "London", "Paris", "Berlin", "Rome", "Madrid", "Warsaw", "Istanbul",
            # Asia
            "Tokyo", "Shanghai", "Singapore", "Mumbai", "Seoul", "Jakarta", "Bangkok",
            # Africa
            "Lagos", "Nairobi", "Cairo", "Johannesburg", "Accra", "Addis Ababa", "Casablanca",
            # Middle East
            "Dubai", "Riyadh", "Tehran", "Doha", "Abu Dhabi", "Kuwait City", "Muscat",
            # Oceania
            "Sydney", "Melbourne", "Auckland", "Wellington", "Suva", "Port Moresby", "Honolulu"
        ]
        countries = {
            "New York": "United States", "Mexico City": "Mexico", "São Paulo": "Brazil", "Toronto": "Canada",
            "Buenos Aires": "Argentina", "Lima": "Peru", "Bogota": "Colombia", "London": "United Kingdom",
            "Paris": "France", "Berlin": "Germany", "Rome": "Italy", "Madrid": "Spain", "Warsaw": "Poland",
            "Istanbul": "Turkey", "Tokyo": "Japan", "Shanghai": "China", "Singapore": "Singapore",
            "Mumbai": "India", "Seoul": "South Korea", "Jakarta": "Indonesia", "Bangkok": "Thailand",
            "Lagos": "Nigeria", "Nairobi": "Kenya", "Cairo": "Egypt", "Johannesburg": "South Africa",
            "Accra": "Ghana", "Addis Ababa": "Ethiopia", "Casablanca": "Morocco", "Dubai": "United Arab Emirates",
            "Riyadh": "Saudi Arabia", "Tehran": "Iran", "Doha": "Qatar", "Abu Dhabi": "United Arab Emirates",
            "Kuwait City": "Kuwait", "Muscat": "Oman", "Sydney": "Australia", "Melbourne": "Australia",
            "Auckland": "New Zealand", "Wellington": "New Zealand", "Suva": "Fiji", "Port Moresby": "Papua New Guinea",
            "Honolulu": "United States"
        }
        country_codes = {
            "United States": "USA", "Mexico": "MEX", "Brazil": "BRA", "Canada": "CAN",
            "Argentina": "ARG", "Peru": "PER", "Colombia": "COL", "United Kingdom": "GBR",
            "France": "FRA", "Germany": "DEU", "Italy": "ITA", "Spain": "ESP",
            "Poland": "POL", "Turkey": "TUR", "Japan": "JPN", "China": "CHN",
            "Singapore": "SGP", "India": "IND", "South Korea": "KOR", "Indonesia": "IDN",
            "Thailand": "THA", "Nigeria": "NGA", "Kenya": "KEN", "Egypt": "EGY",
            "South Africa": "ZAF", "Ghana": "GHA", "Ethiopia": "ETH", "Morocco": "MAR",
            "United Arab Emirates": "ARE", "Saudi Arabia": "SAU", "Iran": "IRN", "Qatar": "QAT",
            "Kuwait": "KWT", "Oman": "OMN", "Australia": "AUS", "New Zealand": "NZL",
            "Fiji": "FJI", "Papua New Guinea": "PNG"
        }
        blocs = ["NAFTA", "EU", "ASEAN", "AU", "MERCOSUR", "GCC", "CPTPP"]
        bloc_assignments = {
            "New York": "NAFTA", "Mexico City": "NAFTA", "São Paulo": "MERCOSUR", "Toronto": "NAFTA",
            "Buenos Aires": "MERCOSUR", "Lima": "CPTPP", "Bogota": "CPTPP", "London": "EU",
            "Paris": "EU", "Berlin": "EU", "Rome": "EU", "Madrid": "EU", "Warsaw": "EU",
            "Istanbul": "EU_CANDIDATE", "Tokyo": "CPTPP", "Shanghai": "CPTPP", "Singapore": "ASEAN",
            "Mumbai": "SAARC", "Seoul": "CPTPP", "Jakarta": "ASEAN", "Bangkok": "ASEAN",
            "Lagos": "AU", "Nairobi": "AU", "Cairo": "AU", "Johannesburg": "AU",
            "Accra": "AU", "Addis Ababa": "AU", "Casablanca": "AU", "Dubai": "GCC",
            "Riyadh": "GCC", "Tehran": "ECO", "Doha": "GCC", "Abu Dhabi": "GCC",
            "Kuwait City": "GCC", "Muscat": "GCC", "Sydney": "CPTPP", "Melbourne": "CPTPP",
            "Auckland": "CPTPP", "Wellington": "CPTPP", "Suva": "PIF", "Port Moresby": "PIF",
            "Honolulu": "NAFTA"
        }
        coordinates = {
            "New York": (40.7128, -74.0060), "Mexico City": (19.4326, -99.1332), "São Paulo": (-23.5505, -46.6333),
            "Toronto": (43.6532, -79.3832), "Buenos Aires": (-34.6037, -58.3816), "Lima": (-12.0464, -77.0428),
            "Bogota": (4.7110, -74.0721), "London": (51.5074, -0.1278), "Paris": (48.8566, 2.3522),
            "Berlin": (52.5200, 13.4050), "Rome": (41.9028, 12.4964), "Madrid": (40.4168, -3.7038),
            "Warsaw": (52.2297, 21.0122), "Istanbul": (41.0082, 28.9784), "Tokyo": (35.6762, 139.6503),
            "Shanghai": (31.2304, 121.4737), "Singapore": (1.3521, 103.8198), "Mumbai": (19.0760, 72.8777),
            "Seoul": (37.5665, 126.9780), "Jakarta": (-6.2088, 106.8456), "Bangkok": (13.7563, 100.5018),
            "Lagos": (6.5244, 3.3792), "Nairobi": (-1.2921, 36.8219), "Cairo": (30.0444, 31.2357),
            "Johannesburg": (-26.2041, 28.0473), "Accra": (5.6037, -0.1870), "Addis Ababa": (9.0320, 38.7469),
            "Casablanca": (33.5731, -7.5898), "Dubai": (25.2048, 55.2708), "Riyadh": (24.7136, 46.6753),
            "Tehran": (35.6892, 51.3890), "Doha": (25.2854, 51.5310), "Abu Dhabi": (24.4539, 54.3773),
            "Kuwait City": (29.3759, 47.9774), "Muscat": (23.5880, 58.3829), "Sydney": (-33.8688, 151.2093),
            "Melbourne": (-37.8136, 144.9631), "Auckland": (-36.8485, 174.7633), "Wellington": (-41.2865, 174.7762),
            "Suva": (-18.1248, 178.4501), "Port Moresby": (-9.4438, 147.1803), "Honolulu": (21.3069, -157.8583)
        }
        ftz_targets = ["Singapore", "Dubai", "Hong Kong", "Panama", "Shenzhen", "Rotterdam", "Miami"]
    
    cities_data = []
    for city_name in cities:
        city_id = city_name.lower().replace(" ", "-")
        country = countries[city_name]
        country_iso3 = country_codes.get(country, "XXX")
        bloc = bloc_assignments.get(city_name, "OTHER")
        lat, lng = coordinates[city_name]
        
        # Generate realistic population based on region
        if region == "europe":
            population = random.randint(500000, 15000000)
            gdp_per_capita = random.uniform(20000, 80000)
            trade_openness = random.uniform(0.4, 0.8)
            ease_of_business = random.uniform(60, 90)
        elif region == "world":
            if city_name in ["New York", "London", "Tokyo", "Paris"]:
                population = random.randint(8000000, 20000000)
                gdp_per_capita = random.uniform(30000, 100000)
            elif city_name in ["Lagos", "Nairobi", "Karachi", "Dhaka"]:
                population = random.randint(10000000, 25000000)
                gdp_per_capita = random.uniform(1000, 5000)
            else:
                population = random.randint(1000000, 15000000)
                gdp_per_capita = random.uniform(5000, 40000)
            trade_openness = random.uniform(0.3, 0.9)
            ease_of_business = random.uniform(40, 95)
        else:  # regions
            population = random.randint(1000000, 12000000)
            gdp_per_capita = random.uniform(5000, 60000)
            trade_openness = random.uniform(0.3, 0.85)
            ease_of_business = random.uniform(45, 90)
        
        # Determine if city is a port (coastal cities or major river ports)
        is_port = random.random() < 0.4 or city_name in ["London", "Rotterdam", "Hamburg", "Singapore", "Dubai", "Hong Kong", "Shanghai"]
        
        # Determine if capital (simplified)
        is_capital = city_name in ["London", "Paris", "Berlin", "Rome", "Madrid", "Brussels", "Vienna", "Warsaw", 
                                  "Prague", "Stockholm", "Copenhagen", "Dublin", "Lisbon", "Helsinki", "Oslo", 
                                  "Athens", "Budapest", "Bucharest", "Ankara", "Kyiv", "Tbilisi", "Belgrade", 
                                  "Zagreb", "Bratislava", "Ljubljana", "Tallinn", "Riga", "Vilnius", "Tokyo",
                                  "Beijing", "Seoul", "Jakarta", "Bangkok", "Mexico City", "Buenos Aires",
                                  "Johannesburg", "Riyadh", "Cairo", "Nairobi", "Addis Ababa", "Accra", "Wellington"]
        
        # CFA zone only relevant for West Africa
        cfa_zone = False
        
        # FTZ target
        is_ftz_target = city_name in ftz_targets
        
        # Tags
        tags = []
        if is_port:
            tags.append("port")
        if is_capital:
            tags.append("capital")
        if population > 5000000:
            tags.append("megacity")
        if gdp_per_capita > 30000:
            tags.append("high_income")
        if "financial" in city_name.lower() or city_name in ["London", "New York", "Singapore", "Hong Kong", "Zurich"]:
            tags.append("financial_center")
        if random.random() < 0.3:
            tags.append("manufacturing")
        if random.random() < 0.3:
            tags.append("tech_hub")
        if random.random() < 0.2:
            tags.append("transport_hub")
        
        cities_data.append({
            "id": city_id,
            "name": city_name,
            "lat": lat,
            "lng": lng,
            "country": country,
            "country_iso3": country_iso3,
            "bloc": bloc,
            "population": population,
            "is_port": is_port,
            "is_capital": is_capital,
            "gdp_per_capita": round(gdp_per_capita, 1),
            "trade_openness": round(trade_openness, 2),
            "ease_of_business": round(ease_of_business, 1),
            "cfa_zone": cfa_zone,
            "is_ftz_target": is_ftz_target,
            "tags": tags
        })
    
    return cities_data

def generate_edges(cities: List[Dict], region: str) -> List[Dict]:
    """Generate edges between cities."""
    if region == "europe":
        edge_types = ["TRADE", "POLITICAL", "CULTURAL", "MIGRATORY", "FINANCIAL", "INFRASTRUCTURE", "ENERGY"]
    elif region == "world":
        edge_types = ["TRADE", "POLITICAL", "CULTURAL", "MIGRATORY", "FINANCIAL", "SUPPLY_CHAIN", "DIPLOMATIC"]
    else:  # regions
        edge_types = ["TRADE", "POLITICAL", "AID", "MIGRATORY", "FINANCIAL", "COMMODITY", "TECH_TRANSFER"]
    
    edges = []
    city_ids = [city["id"] for city in cities]
    
    # Generate 80-150 edges
    num_edges = random.randint(80, 150)
    
    for _ in range(num_edges):
        source = random.choice(city_ids)
        target = random.choice(city_ids)
        while target == source:
            target = random.choice(city_ids)
        
        edge_type = random.choice(edge_types)
        
        # Calculate distance (simplified)
        source_city = next(c for c in cities if c["id"] == source)
        target_city = next(c for c in cities if c["id"] == target)
        
        # Simple distance calculation (approximate)
        lat_diff = abs(source_city["lat"] - target_city["lat"])
        lng_diff = abs(source_city["lng"] - target_city["lng"])
        distance_km = int(math.sqrt(lat_diff**2 + lng_diff**2) * 111)  # Rough km per degree
        
        # Weight based on city size and distance
        weight = random.uniform(0.1, 1.0)
        
        # Volume based on population and GDP
        volume = int((source_city["population"] * target_city["population"] * 
                     source_city["gdp_per_capita"] * target_city["gdp_per_capita"]) / 1e12 * random.uniform(0.1, 2.0))
        
        is_active = random.random() < 0.9  # 90% active
        
        tariff_rate = random.uniform(0.0, 0.15)  # 0-15% tariff
        
        descriptions = {
            "TRADE": f"Trade route between {source_city['name']} and {target_city['name']}",
            "POLITICAL": f"Political alliance between {source_city['country']} and {target_city['country']}",
            "CULTURAL": f"Cultural exchange between {source_city['name']} and {target_city['name']}",
            "MIGRATORY": f"Migration flow from {source_city['name']} to {target_city['name']}",
            "FINANCIAL": f"Financial corridor {source_city['name']}-{target_city['name']}",
            "INFRASTRUCTURE": f"Infrastructure project connecting {source_city['name']} and {target_city['name']}",
            "ENERGY": f"Energy pipeline/grid between {source_city['name']} and {target_city['name']}",
            "SUPPLY_CHAIN": f"Supply chain link {source_city['name']}-{target_city['name']}",
            "DIPLOMATIC": f"Diplomatic relations {source_city['country']}-{target_city['country']}",
            "AID": f"Development aid from {source_city['country']} to {target_city['country']}",
            "COMMODITY": f"Commodity trade {source_city['name']}-{target_city['name']}",
            "TECH_TRANSFER": f"Technology transfer {source_city['name']}-{target_city['name']}"
        }
        
        description = descriptions.get(edge_type, f"Connection between {source_city['name']} and {target_city['name']}")
        
        edges.append({
            "source": source,
            "target": target,
            "edge_type": edge_type,
            "weight": round(weight, 3),
            "volume": volume,
            "distance_km": distance_km,
            "is_active": is_active,
            "tariff_rate": round(tariff_rate, 3),
            "description": description
        })
    
    return edges

def generate_metrics(cities: List[Dict], edges: List[Dict]) -> Dict:
    """Generate network metrics."""
    city_ids = [city["id"] for city in cities]
    
    # Calculate degree centrality (simplified)
    degree = {}
    for city_id in city_ids:
        # Count edges where city appears as source or target
        edge_count = sum(1 for edge in edges if edge["source"] == city_id or edge["target"] == city_id)
        degree[city_id] = round(edge_count / len(edges), 4)
    
    # Calculate betweenness centrality (simplified)
    betweenness = {}
    for city_id in city_ids:
        # Simplified betweenness: random value scaled by degree
        betweenness[city_id] = round(random.uniform(0, 0.4) * degree[city_id], 4)
    
    # Calculate closeness centrality (simplified)
    closeness = {}
    for city_id in city_ids:
        closeness[city_id] = round(random.uniform(0.3, 0.7), 4)
    
    # Articulation points (simplified)
    articulation_points = random.sample(city_ids, min(5, len(city_ids) // 10))
    
    # Bridges (simplified)
    bridges = []
    if len(edges) > 10:
        for _ in range(random.randint(3, 8)):
            source = random.choice(city_ids)
            target = random.choice(city_ids)
            if source != target:
                bridges.append([source, target])
    
    # Region-specific cut vertices
    cut_vertices = random.sample(city_ids, min(3, len(city_ids) // 15))
    
    # Component count
    component_count = random.randint(1, 3)
    
    return {
        "betweenness": betweenness,
        "degree": degree,
        "closeness": closeness,
        "articulation_points": articulation_points,
        "bridges": bridges,
        "ecowas_cut_vertices": cut_vertices,  # Keeping name for schema compatibility
        "component_count": component_count
    }

def generate_ftz_impact(cities: List[Dict], region: str) -> Dict[str, Dict]:
    """Generate FTZ impact scores for target cities."""
    ftz_impact = {}
    ftz_cities = [city for city in cities if city["is_ftz_target"]]
    
    for city in ftz_cities:
        # Generate realistic scores
        connectivity = random.uniform(0.6, 0.95)
        port_access = 0.9 if city["is_port"] else random.uniform(0.3, 0.7)
        tariff_exposure = random.uniform(0.7, 0.95)
        trade_volume = random.uniform(0.5, 0.9)
        diversification = random.uniform(0.4, 0.85)
        border_proximity = random.uniform(0.5, 0.9)
        stability = random.uniform(0.6, 0.95)
        
        # Composite score (weighted average)
        composite = (
            connectivity * 0.2 +
            port_access * 0.15 +
            tariff_exposure * 0.15 +
            trade_volume * 0.15 +
            diversification * 0.1 +
            border_proximity * 0.1 +
            stability * 0.15
        )
        
        ftz_impact[city["id"]] = {
            "composite": round(composite, 3),
            "connectivity": round(connectivity, 3),
            "port_access": round(port_access, 3),
            "tariff_exposure": round(tariff_exposure, 3),
            "trade_volume": round(trade_volume, 3),
            "diversification": round(diversification, 3),
            "border_proximity": round(border_proximity, 3),
            "stability": round(stability, 3)
        }
    
    return ftz_impact

def generate_trade_routes(cities: List[Dict], region: str) -> Dict[str, Dict]:
    """Generate trade route data."""
    trade_routes = {}
    city_ids = [city["id"] for city in cities]
    
    # Generate 10-20 trade routes
    num_routes = random.randint(10, 20)
    
    for i in range(num_routes):
        route_id = f"route-{i+1:03d}"
        
        # Select 3-8 cities for the route
        route_length = random.randint(3, 8)
        route_cities = random.sample(city_ids, min(route_length, len(city_ids)))
        
        risk = random.uniform(0.1, 0.8)
        redundancy = random.uniform(0.2, 0.9)
        min_cut = random.randint(1, 3)
        
        shortest_path = route_cities
        shortest_cost = random.randint(1000, 10000)
        
        # Select some cities as critical nodes
        min_cut_nodes = random.sample(route_cities, min(2, len(route_cities)))
        
        trade_routes[route_id] = {
            "risk": round(risk, 3),
            "redundancy": round(redundancy, 3),
            "min_cut": min_cut,
            "shortest_path": shortest_path,
            "shortest_cost": shortest_cost,
            "min_cut_nodes": min_cut_nodes
        }
    
    return trade_routes

def generate_cascades(cities: List[Dict], region: str) -> List[Dict]:
    """Generate cascade scenarios."""
    city_ids = [city["id"] for city in cities]
    
    if region == "europe":
        cascade_templates = [
            {
                "name": "Brexit Impact Cascade",
                "trigger": "UK trade policy shift",
                "type": "TRADE_DISRUPTION",
                "severity": 0.7
            },
            {
                "name": "Ukraine Conflict Fallout",
                "trigger": "Military conflict escalation",
                "type": "SECURITY_CRISIS",
                "severity": 0.8
            },
            {
                "name": "Energy Crisis Cascade",
                "trigger": "Gas pipeline shutdown",
                "type": "ENERGY_SHOCK",
                "severity": 0.6
            },
            {
                "name": "Schengen Collapse",
                "trigger": "Border control reinstatement",
                "type": "MIGRATION_CRISIS",
                "severity": 0.5
            },
            {
                "name": "Eurozone Debt Crisis",
                "trigger": "Sovereign default",
                "type": "FINANCIAL_CONTAGION",
                "severity": 0.65
            }
        ]
    elif region == "world":
        cascade_templates = [
            {
                "name": "US-China Decoupling",
                "trigger": "Trade war escalation",
                "type": "TECH_DECOUPLING",
                "severity": 0.75
            },
            {
                "name": "SWIFT Sanctions Cascade",
                "trigger": "Financial system exclusion",
                "type": "FINANCIAL_ISOLATION",
                "severity": 0.7
            },
            {
                "name": "Pandemic Supply Chain Shock",
                "trigger": "Global health crisis",
                "type": "SUPPLY_CHAIN_COLLAPSE",
                "severity": 0.6
            },
            {
                "name": "Suez Blockage Ripple",
                "trigger": "Major shipping lane closure",
                "type": "LOGISTICS_DISRUPTION",
                "severity": 0.55
            },
            {
                "name": "Climate Migration Wave",
                "trigger": "Extreme weather events",
                "type": "MIGRATION_CRISIS",
                "severity": 0.65
            },
            {
                "name": "Digital Currency War",
                "trigger": "CBDC competition",
                "type": "MONETARY_CONFLICT",
                "severity": 0.5
            }
        ]
    else:  # regions
        cascade_templates = [
            {
                "name": "Regional Decoupling",
                "trigger": "Trade bloc fragmentation",
                "type": "REGIONAL_ISOLATION",
                "severity": 0.6
            },
            {
                "name": "Commodity Price Shock",
                "trigger": "Resource nationalism",
                "type": "COMMODITY_CRISIS",
                "severity": 0.55
            },
            {
                "name": "Migration Crisis Cascade",
                "trigger": "Political instability",
                "type": "DEMOGRAPHIC_SHOCK",
                "severity": 0.5
            },
            {
                "name": "Infrastructure Cyber Attack",
                "trigger": "State-sponsored hacking",
                "type": "CYBER_WARFARE",
                "severity": 0.65
            },
            {
                "name": "Climate Finance Gap",
                "trigger": "Green investment withdrawal",
                "type": "FINANCIAL_SHORTFALL",
                "severity": 0.45
            },
            {
                "name": "Tech Sovereignty Conflict",
                "trigger": "Digital platform bans",
                "type": "TECH_FRAGMENTATION",
                "severity": 0.55
            }
        ]
    
    cascades = []
    for template in cascade_templates:
        # Select affected cities
        num_affected = random.randint(5, min(15, len(city_ids)))
        affected_cities = random.sample(city_ids, num_affected)
        
        # Some cities become isolated
        num_isolated = random.randint(2, min(5, num_affected))
        isolated_cities = random.sample(affected_cities, num_isolated)
        
        # Trade disrupted cities
        trade_disrupted = random.sample(affected_cities, random.randint(3, min(8, num_affected)))
        
        new_components = random.randint(1, 3)
        trade_volume_affected = random.uniform(0.2, 0.8) * 1e9  # Billions
        
        cascades.append({
            "name": template["name"],
            "trigger": template["trigger"],
            "type": template["type"],
            "affected_cities": affected_cities,
            "isolated_cities": isolated_cities,
            "trade_disrupted_cities": trade_disrupted,
            "new_components": new_components,
            "trade_volume_affected": round(trade_volume_affected),
            "severity": template["severity"]
        })
    
    return cascades

def generate_opportunities(cities: List[Dict], region: str) -> List[Dict]:
    """Generate opportunity signals."""
    opportunities = []
    
    # Generate 15-25 opportunities
    num_opportunities = random.randint(15, 25)
    
    for i in range(num_opportunities):
        city = random.choice(cities)
        
        signal_types = ["OPPORTUNITY", "RISK", "NEUTRAL"]
        weights = [0.6, 0.3, 0.1]  # More opportunities than risks
        signal_type = random.choices(signal_types, weights=weights)[0]
        
        gap = random.uniform(-0.3, 0.3)
        model_score = random.uniform(0.3, 0.9)
        actual_score = model_score + gap
        confidence = random.uniform(0.6, 0.95)
        
        opportunities.append({
            "city_id": city["id"],
            "city_name": city["name"],
            "country": city["country"],
            "signal_type": signal_type,
            "gap": round(gap, 3),
            "model_score": round(model_score, 3),
            "actual_score": round(actual_score, 3),
            "confidence": round(confidence, 3)
        })
    
    return opportunities

def generate_summary(cities: List[Dict], edges: List[Dict], region: str) -> Dict:
    """Generate network summary."""
    ftz_targets = sum(1 for city in cities if city["is_ftz_target"])
    port_cities = sum(1 for city in cities if city["is_port"])
    
    # Region-specific summary metrics
    if region == "europe":
        eu_count = sum(1 for city in cities if city["bloc"] == "EU")
        eea_count = sum(1 for city in cities if city["bloc"] == "EEA")
        candidate_count = sum(1 for city in cities if city["bloc"] == "CANDIDATE")
        partner_count = sum(1 for city in cities if city["bloc"] == "PARTNER")
        efta_count = sum(1 for city in cities if city["bloc"] == "EFTA")
        
        return {
            "nodes": len(cities),
            "edges": len(edges),
            "ecowas_active": eu_count,  # Reusing field names for compatibility
            "uemoa_cfa": eea_count,
            "suspended": candidate_count,
            "external": partner_count,
            "port_cities": port_cities,
            "ftz_targets": ftz_targets
        }
    elif region == "world":
        g7_count = sum(1 for city in cities if city["bloc"] == "G7")
        brics_count = sum(1 for city in cities if city["bloc"] == "BRICS")
        asean_count = sum(1 for city in cities if city["bloc"] == "ASEAN")
        au_count = sum(1 for city in cities if city["bloc"] == "AU")
        
        return {
            "nodes": len(cities),
            "edges": len(edges),
            "ecowas_active": g7_count,
            "uemoa_cfa": brics_count,
            "suspended": asean_count,
            "external": au_count,
            "port_cities": port_cities,
            "ftz_targets": ftz_targets
        }
    else:  # regions
        nafta_count = sum(1 for city in cities if city["bloc"] == "NAFTA")
        eu_count = sum(1 for city in cities if city["bloc"] == "EU")
        asean_count = sum(1 for city in cities if city["bloc"] == "ASEAN")
        au_count = sum(1 for city in cities if city["bloc"] == "AU")
        
        return {
            "nodes": len(cities),
            "edges": len(edges),
            "ecowas_active": nafta_count,
            "uemoa_cfa": eu_count,
            "suspended": asean_count,
            "external": au_count,
            "port_cities": port_cities,
            "ftz_targets": ftz_targets
        }

def generate_dataset(region: str) -> Dict:
    """Generate complete dataset for a region."""
    print(f"Generating {region} dataset...")
    
    cities = generate_city_data(region)
    edges = generate_edges(cities, region)
    
    dataset = {
        "generated_at": datetime.now().isoformat(),
        "summary": generate_summary(cities, edges, region),
        "cities": cities,
        "edges": edges,
        "metrics": generate_metrics(cities, edges),
        "ftz_impact": generate_ftz_impact(cities, region),
        "trade_routes": generate_trade_routes(cities, region),
        "cascades": generate_cascades(cities, region),
        "opportunities": generate_opportunities(cities, region)
    }
    
    print(f"  Generated: {len(cities)} cities, {len(edges)} edges, {len(dataset['cascades'])} cascades, {len(dataset['opportunities'])} opportunities")
    
    return dataset

def main():
    """Generate all three datasets."""
    regions = ["europe", "world", "regions"]
    
    for region in regions:
        dataset = generate_dataset(region)
        
        # Save to file
        filename = f"/Users/meuge/Coding/unified-dashboard/lib/{region}-data.json"
        with open(filename, "w") as f:
            json.dump(dataset, f, indent=2)
        
        print(f"  Saved to: {filename}")
    
    print("\nAll datasets generated successfully!")

if __name__ == "__main__":
    main()