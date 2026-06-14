# OpenGeoResearch

**Open-source research data collection and geospatial analytics platform.**

OpenGeoResearch is an open-source platform that enables researchers, NGOs, public health professionals, government agencies, and academic institutions to collect, manage, analyze, and visualize research data using modern web technologies and geospatial analytics.

The platform combines survey management, GPS-enabled data collection, GIS visualization, AI-powered insights, and statistical reporting in a unified system designed for field and academic research.

---

## Vision

To provide a free, open, and extensible platform that bridges the gap between research data collection and geospatial intelligence.

OpenGeoResearch empowers researchers to move seamlessly from survey design and field data collection to spatial analysis, visualization, and evidence generation.

---

## Key Features

### Research Project Management

* Create and manage research projects
* Organize surveys within projects
* Invite collaborators
* Assign user roles and permissions
* Track project activity

### Advanced Survey Builder

* Text questions
* Long text questions
* Numeric questions
* Date questions
* Single-choice questions
* Multiple-choice questions
* Likert scales
* GPS location fields
* Image uploads

### Skip Logic and Conditional Branching

Create dynamic questionnaires using rules such as:

* Show questions based on previous answers
* Skip sections automatically
* Branch respondents to different pathways
* Build complex epidemiological and social science instruments

### Repeating Groups

Collect data for:

* Household members
* Pregnancies
* Children
* Facilities
* Communities

without duplicating survey structures.

### GPS-Enabled Data Collection

* Automatic GPS capture
* Manual coordinate entry
* Coordinate validation
* Geotagged survey responses

### Geospatial Analytics

#### Point Mapping

Visualize individual survey locations.

#### Heat Maps

Identify concentrations and hotspots.

#### Choropleth Maps

Aggregate and visualize indicators across:

* Countries
* States
* Districts
* LGAs
* Wards
* Custom administrative boundaries

#### GeoJSON Support

* Import GeoJSON boundaries
* Export spatial datasets
* Integrate with external GIS tools

### Data Export

Export datasets in:

* CSV
* Excel
* JSON

Future support:

* SPSS (.sav)
* STATA (.dta)
* GeoPackage
* Shapefile

### AI-Powered Research Insights

Generate automated insights from collected data.

Examples:

* Geographic hotspot detection
* Demographic summaries
* Data quality assessments
* Pattern recognition
* Natural language data exploration

Example:

> "Respondents aged 18–24 reported the highest average stigma scores."

> "Three spatial clusters of elevated prevalence were identified in the northeastern study area."

### Audit Logging

Track:

* Data modifications
* Survey changes
* User actions
* Administrative activities

for accountability and reproducibility.

---

## Technology Stack

### Backend

* Django
* Django REST Framework
* PostgreSQL
* PostGIS

### Frontend

* React
* TypeScript
* Tailwind CSS
* React Query

### Mapping & GIS

* Leaflet
* React Leaflet

### Analytics

* GeoPandas
* PySAL
* Pandas
* NumPy

### DevOps

* Docker
* GitHub Actions

---

## System Architecture

```text
React Frontend
       │
       ▼
Django REST API
       │
       ▼
PostgreSQL + PostGIS
       │
       ▼
Analytics Engine
       │
       ▼
AI Insight Engine
```

---

## Core Modules

### Authentication

* Registration
* Login
* Password Reset
* Role-Based Access Control

### Projects

* Create Projects
* Manage Teams
* Project Metadata

### Surveys

* Survey Builder
* Sections
* Question Types
* Validation Rules

### Responses

* Data Collection
* GPS Capture
* Media Uploads

### Mapping

* Point Layers
* Heat Maps
* Choropleth Maps
* Boundary Management

### Analytics

* Descriptive Statistics
* Data Quality Reports
* Spatial Analytics

### AI Insights

* Automated Findings
* Geographic Interpretation
* Natural Language Queries

---

## Target Users

* Public Health Researchers
* Epidemiologists
* NGOs
* Monitoring & Evaluation Teams
* Academic Institutions
* Government Agencies
* Social Science Researchers
* Environmental Researchers
* Agricultural Researchers

---

## Open Source Principles

OpenGeoResearch is built on the principles of:

* Transparency
* Reproducibility
* Community Collaboration
* Open Science
* Data-Driven Decision Making

---

## Roadmap

### Version 1.0

* Authentication
* Project Management
* Survey Builder
* Skip Logic
* Repeating Groups
* GPS Capture
* Point Maps
* Heat Maps
* Choropleth Maps
* CSV/Excel Export
* AI Insights
* Audit Logging

### Version 2.0

* Offline Data Collection
* Mobile Applications
* Advanced Spatial Statistics
* Electronic Consent Forms
* Dashboard Builder
* SPSS/STATA Export
* Multi-language Surveys

### Version 3.0

* Predictive Analytics
* Advanced AI Research Assistant
* Geospatial Forecasting
* Real-time Monitoring Dashboards

---

## Contributing

We welcome contributions from developers, GIS specialists, data scientists, public health professionals, researchers, and open-source enthusiasts.

Please see:

* CONTRIBUTING.md
* CODE_OF_CONDUCT.md

for contribution guidelines.

---

## License

OpenGeoResearch is released under the MIT License.

---

## Mission Statement

Collect. Analyze. Map. Understand.

OpenGeoResearch exists to make research-grade data collection and geospatial analytics accessible to everyone.
