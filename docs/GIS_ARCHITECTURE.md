# GIS Architecture

## Overview

OpenGeoResearch is a GIS-native research platform.

Unlike traditional survey systems that merely store GPS coordinates, OpenGeoResearch is designed to:

- Collect geospatial data
- Visualize spatial distributions
- Perform spatial analysis
- Generate geospatial insights
- Support location-based decision making

The GIS subsystem is built around:

- PostgreSQL
- PostGIS
- GeoJSON
- Leaflet
- React-Leaflet

Future support:

- MapLibre
- OpenLayers
- Deck.gl

---

# GIS Objectives

The GIS engine should support:

## Data Collection

- GPS capture
- Manual coordinate entry
- Geometry uploads

---

## Visualization

- Point Maps
- Heat Maps
- Choropleth Maps
- Cluster Maps
- Density Maps

---

## Analysis

- Spatial aggregation
- Distance calculations
- Hotspot analysis
- Spatial clustering

---

## AI Integration

AI should be able to answer:

- Which areas have the highest prevalence?
- Where are response clusters?
- Which regions are underserved?
- Where should interventions be prioritized?

---

# GIS Architecture

```text
Survey Responses
        │
        ▼

 GPS Coordinates

        │
        ▼

     PostGIS

        │
 ┌──────┼────────┐
 ▼      ▼        ▼

Maps  Analytics  AI

 │       │       │
 ▼       ▼       ▼

Frontend API Layer
```

---

# Core Components

## 1. GPS Collection Engine

Purpose:

Capture coordinates during survey completion.

Data Collected:

```json
{
  "latitude": 7.3775,
  "longitude": 3.9470,
  "accuracy": 8
}
```

Stored As:

```sql
POINT(longitude latitude)
```

Example:

```sql
POINT(3.9470 7.3775)
```

SRID:

```text
4326
```

---

## 2. Spatial Data Storage

Database:

```text
PostgreSQL + PostGIS
```

Supported Geometries:

```text
POINT
LINESTRING
POLYGON
MULTIPOINT
MULTIPOLYGON
```

---

# Geometry Models

## Response Location

```python
class Location(BaseModel):
    response = OneToOneField(Response)

    point = PointField(
        geography=True,
        srid=4326
    )

    accuracy_meters = FloatField()
```

---

## Administrative Boundaries

```python
class BoundaryFeature(BaseModel):
    geometry = GeometryField()
```

Examples:

- Countries
- States
- Provinces
- LGAs
- Districts
- Wards
- Health Zones

---

# Supported Spatial Formats

Version 1:

- GeoJSON

Version 1.1:

- Shapefile
- KML

Version 2:

- GeoPackage

Version 3:

- WMS
- WFS

---

# Map Rendering Engine

Frontend Library:

```text
Leaflet
```

React Integration:

```text
React Leaflet
```

Basemaps:

```text
OpenStreetMap
```

Future:

```text
Mapbox
MapLibre
Google Maps
```

---

# Visualization Types

## Point Map

Purpose:

Display individual survey locations.

Example:

```text
● ● ● ● ●
```

Use Cases:

- Household surveys
- Facility mapping
- Service availability

---

## Heat Map

Purpose:

Visualize concentration.

Example:

```text
Low → Medium → High
```

Data Source:

```sql
GPS Coordinates
```

Frontend:

```text
Leaflet Heat
```

---

## Choropleth Map

Purpose:

Visualize aggregated metrics by area.

Example:

```text
Ward A = 5%
Ward B = 10%
Ward C = 25%
```

Color Scale:

```text
Light → Dark
```

Examples:

- HIV prevalence
- Stigma score
- Vaccination coverage

---

## Cluster Map

Purpose:

Improve rendering performance.

Method:

```text
Marker Clustering
```

Useful for:

```text
10,000+ points
```

---

# Spatial Analysis Engine

## Point-in-Polygon

Purpose:

Assign responses to boundaries.

Example:

```sql
ST_Contains()
```

Question:

Which ward contains this respondent?

---

## Distance Analysis

Purpose:

Measure travel burden.

Example:

```sql
ST_Distance()
```

Use Cases:

- Distance to facility
- Distance to school
- Distance to water source

---

## Buffer Analysis

Purpose:

Identify nearby features.

Example:

```sql
ST_Buffer()
```

Question:

Who lives within 5 km of a clinic?

---

## Spatial Join

Purpose:

Combine geometry and attributes.

Example:

```sql
ST_Intersects()
```

---

# Advanced Spatial Analytics

Version 2

## Hotspot Analysis

Methods:

- Getis-Ord Gi*
- Local Moran's I

Purpose:

Detect high-risk clusters.

---

## Cluster Detection

Algorithms:

- DBSCAN
- HDBSCAN

Examples:

- Disease outbreaks
- Service gaps

---

## Spatial Autocorrelation

Methods:

- Moran's I

Question:

Are responses geographically clustered?

---

# GIS API Endpoints

## Points Layer

```http
GET /maps/points/
```

Returns:

```json
GeoJSON FeatureCollection
```

---

## Heatmap Layer

```http
GET /maps/heatmap/
```

Returns:

```json
[
  [lat, lon, intensity]
]
```

---

## Choropleth Layer

```http
GET /maps/choropleth/
```

Parameters:

```text
boundary_layer
metric
```

---

# Boundary Management

## Upload Layer

Supported:

- GeoJSON
- Shapefile
- KML

Validation:

- Geometry validity
- Coordinate system
- Duplicate detection

---

## Layer Metadata

Store:

```json
{
  "name": "Ibadan Wards",
  "geometry_type": "MULTIPOLYGON",
  "feature_count": 11
}
```

---

# GIS Performance

## Spatial Indexing

Required:

```sql
CREATE INDEX idx_geom
ON boundary_features
USING GIST (geometry);
```

---

## Coordinate Index

Required:

```sql
CREATE INDEX idx_location
ON locations
USING GIST (point);
```

---

# GIS Security

Sensitive coordinates may require protection.

Options:

- Coordinate masking
- Coordinate rounding
- Aggregated display
- Access restrictions

---

# GIS and AI Integration

AI can use GIS outputs to generate insights.

Example:

Input:

```text
Show areas with highest stigma score.
```

Process:

```text
GIS Aggregation
→ Statistics
→ AI Summary
```

Output:

```text
Ward 4 has the highest average stigma score,
approximately 2.3 times higher than the project average.
```

---

# GIS Reporting

Export Formats:

- GeoJSON
- CSV
- Excel

Future:

- PDF Map Reports
- Spatial Dashboards

---

# Offline GIS (Version 2)

Support:

- Offline GPS capture
- Cached tiles
- Offline maps

Technology:

```text
React Native
```

---

# Future GIS Enhancements

Version 2

- Spatial statistics
- Raster support
- Offline mapping

Version 3

- Satellite imagery integration
- Real-time tracking
- Remote sensing analytics

Version 4

- Machine learning spatial models
- Predictive geospatial analytics

---

# GIS Philosophy

Geospatial data should not merely be stored.

It should be analyzed, visualized, interpreted, and transformed into actionable knowledge.

OpenGeoResearch treats geography as a first-class research variable rather than a supplementary field.