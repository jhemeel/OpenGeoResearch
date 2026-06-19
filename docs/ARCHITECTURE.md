# ARCHITECTURE.md

# OpenGeoResearch System Architecture

## Overview

OpenGeoResearch is a modular, open-source platform for research data collection, geospatial analytics, and AI-assisted insights.

The architecture follows a service-oriented modular monolith approach in Version 1, allowing future migration to microservices if required.

Core principles:

* Modular design
* API-first development
* GIS-native architecture
* Research integrity
* Scalability
* Extensibility
* Open-source friendliness

---

# High-Level Architecture

```text
┌────────────────────────────┐
│        React Frontend      │
└──────────────┬─────────────┘
               │
               ▼
┌────────────────────────────┐
│      Django REST API       │
└──────────────┬─────────────┘
               │
               ▼
┌────────────────────────────┐
│  PostgreSQL + PostGIS      │
└──────────────┬─────────────┘
               │
      ┌────────┴────────┐
      ▼                 ▼
┌────────────┐   ┌──────────────┐
│ Analytics  │   │ AI Insights  │
│ Engine     │   │ Engine       │
└────────────┘   └──────────────┘
```

---

# Architectural Layers

## Presentation Layer

Technology:

* React
* TypeScript
* Tailwind CSS

Responsibilities:

* User interface
* Form rendering
* Map rendering
* Dashboard visualization
* User interactions

The frontend communicates exclusively through REST APIs.

No direct database access.

---

## API Layer

Technology:

* Django
* Django REST Framework

Responsibilities:

* Authentication
* Authorization
* Business logic
* Validation
* Data processing
* API responses

Acts as the central orchestration layer.

---

## Data Layer

Technology:

* PostgreSQL
* PostGIS

Responsibilities:

* Persistent storage
* Spatial storage
* Spatial queries
* Data integrity

---

## Analytics Layer

Responsibilities:

* Statistical calculations
* Data quality checks
* Aggregations
* Spatial statistics

Libraries:

* Pandas
* NumPy
* GeoPandas
* PySAL

---

## AI Insight Layer

Responsibilities:

* Data interpretation
* Insight generation
* Natural language querying
* Research summaries

The AI layer does not access raw survey data directly.

It consumes processed outputs from the analytics engine.

This reduces hallucinations and improves scientific reliability.

---

# Backend Architecture

## Backend Directory Structure

```text
backend/

├── config/
│
├── apps/
│   ├── accounts/
│   ├── projects/
│   ├── surveys/
│   ├── responses/
│   ├── gis/
│   ├── analytics/
│   ├── ai/
│   ├── exports/
│   └── audit/
│
├── api/
│
├── shared/
│
└── tests/
```

---

# Module Architecture

## Accounts Module

Responsibilities:

* Registration
* Authentication
* Roles
* Permissions

Dependencies:

None

---

## Projects Module

Responsibilities:

* Project management
* Team collaboration

Dependencies:

Accounts

---

## Surveys Module

Responsibilities:

* Survey creation
* Sections
* Questions
* Skip logic
* Repeating groups
* Survey versioning

Dependencies:

Projects

---

## Responses Module

Responsibilities:

* Response submission
* Validation
* Media uploads
* GPS capture

Dependencies:

Surveys

---

## GIS Module

Responsibilities:

* Point mapping
* Choropleth generation
* Heatmap generation
* Spatial aggregation
* Boundary management

Dependencies:

Responses

---

## Analytics Module

Responsibilities:

* Descriptive statistics
* Cross-tabulations
* Data quality checks
* Spatial statistics

Dependencies:

Responses
GIS

---

## AI Module

Responsibilities:

* Insight generation
* Narrative summaries
* Natural language analysis

Dependencies:

Analytics
GIS

---

## Exports Module

Responsibilities:

* CSV export
* Excel export
* JSON export

Dependencies:

Responses
Analytics

---

## Audit Module

Responsibilities:

* Change tracking
* Activity logs
* Research integrity

Dependencies:

All modules

---

# Frontend Architecture

## Frontend Directory Structure

```text
frontend/

├── src/
│
├── pages/
│
├── components/
│
├── features/
│   ├── auth/
│   ├── projects/
│   ├── surveys/
│   ├── mapping/
│   ├── analytics/
│   └── ai/
│
├── services/
│
├── hooks/
│
├── layouts/
│
├── store/
│
└── tests/
```

---

# Mapping Architecture

## GIS Data Flow

```text
Survey Response
        │
        ▼
GPS Coordinates
        │
        ▼
PostGIS Storage
        │
        ▼
Spatial Processing
        │
        ▼
Map Layers
```

---

## Supported Map Types

### Point Layer

Displays individual response locations.

### Heat Map

Displays spatial concentration.

### Choropleth Layer

Displays aggregated indicators by polygon.

### Boundary Layer

Displays uploaded administrative boundaries.

---

# AI Architecture

## Design Principle

AI augments researchers.

AI does not replace researchers.

---

## AI Processing Flow

```text
Survey Data
      │
      ▼
Analytics Engine
      │
      ▼
Computed Metrics
      │
      ▼
AI Interpretation
      │
      ▼
Generated Insights
```

Example:

Analytics computes:

* Mean score = 4.1
* Cluster count = 3
* Missing rate = 12%

AI generates:

"Three spatial clusters were identified and the average score exceeded the project baseline."

---

# Security Architecture

## Authentication

* JWT
* Refresh tokens
* Password hashing

---

## Authorization

Role-based access control.

Roles:

* Administrator
* Principal Investigator
* Data Analyst
* Research Assistant
* Respondent

---

## Data Protection

* HTTPS only
* Encrypted credentials
* Audit logs
* Rate limiting

---

# Scalability Strategy

## Version 1

Modular Monolith

Advantages:

* Faster development
* Easier deployment
* Easier contributor onboarding

---

## Version 2

Background Workers

Technology:

* Celery
* Redis

Used for:

* AI generation
* Large exports
* Spatial processing

---

## Version 3

Optional Microservices

Potential service separation:

* Survey Service
* GIS Service
* AI Service
* Analytics Service

Only if scale requires it.

---

# Deployment Architecture

## Development

```text
React
Django
PostgreSQL
PostGIS
```

All running locally via Docker Compose.

---

## Production

```text
Nginx
   │
   ▼
React Static Build
   │
   ▼
Django API
   │
   ▼
PostgreSQL + PostGIS
```

Optional:

```text
Redis
Celery Workers
Object Storage
```

---

# Design Decisions

## Why PostgreSQL + PostGIS?

* Industry standard GIS database
* Spatial indexing
* Efficient geospatial queries
* Open source

---

## Why React?

* Large ecosystem
* Strong mapping support
* Excellent developer experience

---

## Why Django?

* Rapid development
* Mature ecosystem
* Strong authentication support
* Excellent GIS integration

---

# Architecture Principles

1. API-first design
2. GIS-native platform
3. Modular components
4. Research-grade auditability
5. Survey versioning
6. Extensible AI framework
7. Open-source contributor friendly
8. Cloud and self-hosted deployment support