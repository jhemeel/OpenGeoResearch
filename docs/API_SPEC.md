# API_SPEC.md

# OpenGeoResearch API Specification

## Overview

Base URL:

```text
/api/v1/
```

Authentication:

```text
JWT Bearer Token
```

Content Type:

```http
Content-Type: application/json
```

---

# Authentication

## Register

### Endpoint

```http
POST /auth/register/
```

### Request

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "first_name": "John",
  "last_name": "Doe"
}
```

### Response

```json
{
  "id": "uuid",
  "email": "user@example.com"
}
```

---

## Login

### Endpoint

```http
POST /auth/login/
```

### Request

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

### Response

```json
{
  "access": "jwt_token",
  "refresh": "refresh_token"
}
```

---

# Projects

## Create Project

### Endpoint

```http
POST /projects/
```

### Request

```json
{
  "title": "HIV Stigma Study",
  "description": "Research project description",
  "start_date": "2026-01-01"
}
```

### Response

```json
{
  "id": "uuid",
  "title": "HIV Stigma Study"
}
```

---

## List Projects

### Endpoint

```http
GET /projects/
```

### Response

```json
[
  {
    "id": "uuid",
    "title": "Project A"
  }
]
```

---

## Project Details

### Endpoint

```http
GET /projects/{project_id}/
```

---

## Update Project

### Endpoint

```http
PATCH /projects/{project_id}/
```

---

## Archive Project

### Endpoint

```http
DELETE /projects/{project_id}/
```

---

# Project Members

## Invite Member

### Endpoint

```http
POST /projects/{project_id}/members/
```

### Request

```json
{
  "email": "researcher@example.com",
  "role": "research_assistant"
}
```

---

## List Members

### Endpoint

```http
GET /projects/{project_id}/members/
```

---

# Surveys

## Create Survey

### Endpoint

```http
POST /projects/{project_id}/surveys/
```

### Request

```json
{
  "title": "Baseline Survey",
  "description": "Initial assessment"
}
```

---

## List Surveys

### Endpoint

```http
GET /projects/{project_id}/surveys/
```

---

## Survey Details

### Endpoint

```http
GET /surveys/{survey_id}/
```

---

## Publish Survey

### Endpoint

```http
POST /surveys/{survey_id}/publish/
```

Publishing locks the version.

---

# Survey Sections

## Create Section

### Endpoint

```http
POST /surveys/{survey_id}/sections/
```

### Request

```json
{
  "title": "Demographics",
  "order_index": 1
}
```

---

## Reorder Sections

### Endpoint

```http
PATCH /surveys/{survey_id}/sections/reorder/
```

---

# Questions

## Create Question

### Endpoint

```http
POST /sections/{section_id}/questions/
```

### Request

```json
{
  "question_text": "Age",
  "question_type": "integer",
  "required": true
}
```

---

## Update Question

### Endpoint

```http
PATCH /questions/{question_id}/
```

---

## Delete Question

### Endpoint

```http
DELETE /questions/{question_id}/
```

---

# Question Options

## Create Option

### Endpoint

```http
POST /questions/{question_id}/options/
```

### Request

```json
{
  "label": "Male",
  "value": "male"
}
```

---

# Skip Logic

## Create Rule

### Endpoint

```http
POST /surveys/{survey_id}/logic-rules/
```

### Request

```json
{
  "source_question": "uuid",
  "operator": "equals",
  "comparison_value": "Yes",
  "action": "show_question",
  "target_question": "uuid"
}
```

---

## List Rules

### Endpoint

```http
GET /surveys/{survey_id}/logic-rules/
```

---

## Delete Rule

### Endpoint

```http
DELETE /logic-rules/{rule_id}/
```

---

# Repeating Groups

## Create Group

### Endpoint

```http
POST /surveys/{survey_id}/groups/
```

### Request

```json
{
  "title": "Household Members",
  "max_repeats": 20
}
```

---

# Public Survey Access

## Survey Metadata

### Endpoint

```http
GET /public/surveys/{public_token}/
```

Returns survey structure.

---

## Submit Response

### Endpoint

```http
POST /public/surveys/{public_token}/responses/
```

### Request

```json
{
  "answers": [
    {
      "question_id": "uuid",
      "value": 25
    }
  ]
}
```

---

# GPS Collection

## Save GPS Location

### Endpoint

```http
POST /responses/{response_id}/location/
```

### Request

```json
{
  "latitude": 7.3775,
  "longitude": 3.9470,
  "accuracy_meters": 8
}
```

---

# Media Uploads

## Upload Image

### Endpoint

```http
POST /responses/{response_id}/media/
```

### Request

```http
multipart/form-data
```

---

# GIS

## Point Layer

### Endpoint

```http
GET /projects/{project_id}/maps/points/
```

### Response

```json
{
  "type": "FeatureCollection",
  "features": []
}
```

---

## Heat Map

### Endpoint

```http
GET /projects/{project_id}/maps/heatmap/
```

### Response

```json
[
  [7.37, 3.94, 0.9]
]
```

---

## Choropleth Layer

### Endpoint

```http
GET /projects/{project_id}/maps/choropleth/
```

### Parameters

```text
boundary_layer
metric
```

---

# Boundary Management

## Upload Boundary Layer

### Endpoint

```http
POST /projects/{project_id}/boundary-layers/
```

Supported:

* GeoJSON
* KML
* Shapefile

---

## List Layers

### Endpoint

```http
GET /projects/{project_id}/boundary-layers/
```

---

# Analytics

## Project Summary

### Endpoint

```http
GET /projects/{project_id}/analytics/summary/
```

### Response

```json
{
  "responses": 1250,
  "completion_rate": 92.1
}
```

---

## Frequency Analysis

### Endpoint

```http
GET /analytics/questions/{question_id}/frequencies/
```

---

## Cross Tabulation

### Endpoint

```http
POST /analytics/crosstab/
```

### Request

```json
{
  "row_question": "uuid",
  "column_question": "uuid"
}
```

---

# AI Insights

## Generate Insights

### Endpoint

```http
POST /projects/{project_id}/insights/generate/
```

---

## List Insights

### Endpoint

```http
GET /projects/{project_id}/insights/
```

---

## Natural Language Query

### Endpoint

```http
POST /projects/{project_id}/ask/
```

### Request

```json
{
  "question": "Which wards have the highest stigma scores?"
}
```

### Response

```json
{
  "answer": "...",
  "charts": [],
  "maps": []
}
```

---

# Exports

## CSV Export

### Endpoint

```http
GET /projects/{project_id}/exports/csv/
```

---

## Excel Export

### Endpoint

```http
GET /projects/{project_id}/exports/excel/
```

---

## GeoJSON Export

### Endpoint

```http
GET /projects/{project_id}/exports/geojson/
```

---

# Audit Logs

## Project Activity

### Endpoint

```http
GET /projects/{project_id}/audit/
```

---

# Health Check

## API Status

### Endpoint

```http
GET /health/
```

### Response

```json
{
  "status": "healthy"
}
```

---

# API Versioning Strategy

Current Version:

```text
/api/v1/
```

Future Versions:

```text
/api/v2/
/api/v3/
```

Backward compatibility should be maintained whenever possible.

---

# API Design Principles

1. RESTful endpoints
2. JWT authentication
3. Consistent response formats
4. GeoJSON for spatial data
5. Survey version awareness
6. Pagination for large datasets
7. OpenAPI/Swagger documentation
8. Frontend-backend contract stability
