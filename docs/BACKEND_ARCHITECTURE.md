# Backend Architecture

## Overview

The OpenGeoResearch backend is responsible for:

- Authentication and Authorization
- Project Management
- Survey Definition
- Survey Execution
- Response Management
- GIS Processing
- Analytics
- AI Integration
- Audit Logging
- Data Export

The backend follows a modular monolith architecture.

Version 1 intentionally avoids microservices to reduce complexity and maintenance burden.

---

# Architectural Principles

## Modular Monolith

Version 1 architecture:

```text
Django Application

├── Users
├── Projects
├── Surveys
├── Responses
├── GIS
├── Analytics
├── AI
├── Exports
└── Audit
```

Benefits:

- Easier development
- Simpler deployment
- Faster onboarding
- Reduced operational complexity

---

## API First

All functionality should be exposed through APIs.

The frontend must communicate exclusively through documented APIs.

No business logic should exist in React.

---

## Service Layer Pattern

Business logic should not be placed directly in:

- Views
- Serializers
- Models

Instead:

```text
View
 ↓
Service
 ↓
Repository / ORM
 ↓
Database
```

---

# Technology Stack

## Framework

Django 5+

## API

Django REST Framework

## GIS

GeoDjango

## Database

PostgreSQL 16+

PostGIS 3+

## Authentication

JWT

## Background Jobs

Celery

## Message Broker

Redis

---

# Application Structure

```text
backend/

apps/
│
├── users/
├── projects/
├── surveys/
├── responses/
├── gis/
├── analytics/
├── ai/
├── exports/
├── audit/
└── common/

config/
│
├── settings/
├── urls.py
├── celery.py
└── wsgi.py

tests/
```

---

# Core Applications

## Users App

Responsibilities:

- Authentication
- User Profiles
- Roles
- Permissions

Models:

```text
User
Role
UserRole
```

---

## Projects App

Responsibilities:

- Research Projects
- Team Membership
- Project Settings

Models:

```text
Project
ProjectMember
```

---

## Surveys App

Responsibilities:

- Survey Builder
- Sections
- Questions
- Skip Logic
- Repeating Groups

Models:

```text
Survey
SurveyVersion
Question
LogicRule
RepeatingGroup
```

---

## Responses App

Responsibilities:

- Response Collection
- Answers
- Drafts
- Submission

Models:

```text
Response
Answer
DraftResponse
```

---

## GIS App

Responsibilities:

- GPS Storage
- GeoJSON Layers
- Spatial Analysis

Models:

```text
Location
BoundaryLayer
BoundaryFeature
```

---

## Analytics App

Responsibilities:

- Statistical Analysis
- Data Summaries
- Reporting

Models:

```text
DatasetSummary
StatisticResult
```

---

## AI App

Responsibilities:

- Insight Generation
- Query Processing
- AI Conversations

Models:

```text
Insight
PromptVersion
AIConversation
```

---

## Exports App

Responsibilities:

- CSV Export
- Excel Export
- GeoJSON Export

Models:

```text
ExportJob
```

---

## Audit App

Responsibilities:

- Activity Tracking
- Compliance Logging

Models:

```text
AuditEvent
```

---

# Layered Architecture

## API Layer

Purpose:

Receive requests.

Components:

```text
Views
ViewSets
Routers
```

Responsibilities:

- Authentication
- Validation
- Response formatting

Must NOT:

- Contain business logic

---

## Service Layer

Purpose:

Business operations.

Examples:

```python
SurveyService

ResponseService

GISAnalysisService

AIInsightService
```

Responsibilities:

- Workflow orchestration
- Business rules
- Cross-model operations

---

## Repository Layer (Optional)

Version 1:

Django ORM directly.

Future:

Repository abstraction if complexity grows.

---

## Database Layer

Responsibilities:

- Persistence
- Indexing
- Transactions

Database is never accessed directly from frontend.

---

# API Design Standards

## REST Principles

Example:

```http
GET /projects/

POST /projects/

GET /projects/{id}/

PATCH /projects/{id}/

DELETE /projects/{id}/
```

---

## Versioning

All APIs:

```text
/api/v1/
```

Future:

```text
/api/v2/
```

---

## Response Format

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Age is required."
  }
}
```

---

# Authentication Architecture

## Login Flow

```text
User

 ↓

JWT Login

 ↓

Access Token

 ↓

Protected API
```

---

## Token Strategy

Access Token:

```text
15 Minutes
```

Refresh Token:

```text
7 Days
```

---

# Authorization Architecture

Role-Based Access Control.

Roles:

```text
Admin
Principal Investigator
Research Assistant
Data Analyst
Viewer
```

---

# Database Transactions

Use transactions for:

- Survey Submission
- Exports
- Membership Updates
- AI Insight Storage

Example:

```python
with transaction.atomic():
    ...
```

---

# GIS Processing Architecture

Workflow:

```text
Survey Response

 ↓

GPS Coordinates

 ↓

PostGIS

 ↓

Spatial Analysis

 ↓

Map Layer
```

---

# Analytics Architecture

Workflow:

```text
Responses

 ↓

Pandas

 ↓

Statistics Engine

 ↓

Results
```

---

# AI Architecture Integration

Workflow:

```text
User Query

 ↓

Context Builder

 ↓

Analytics Engine

 ↓

GIS Engine

 ↓

LLM

 ↓

Insight
```

---

# Background Job Architecture

Use Celery for:

- Exports
- AI Insight Generation
- Large Analytics Jobs
- Scheduled Reports

Workflow:

```text
Request

 ↓

Task Queue

 ↓

Worker

 ↓

Result
```

---

# Caching Strategy

Version 1:

Redis

Cache:

- Project summaries
- Survey definitions
- Analytics results
- Map aggregations

---

# File Storage Architecture

Store:

- Images
- Attachments
- Exports

Development:

```text
Local Storage
```

Production:

```text
S3 Compatible Storage
```

---

# Audit Logging

Track:

- Logins
- Survey Edits
- Data Exports
- Permission Changes

Example:

```json
{
  "action": "survey_published",
  "user": "...",
  "timestamp": "..."
}
```

---

# Error Handling

Standardized exceptions.

Example:

```python
ValidationException

PermissionException

GISException

AIException
```

---

# Security Architecture

Requirements:

- HTTPS
- JWT
- RBAC
- Input Validation
- Rate Limiting

Sensitive operations require:

- Permission checks
- Audit logging

---

# Testing Strategy

Backend tests include:

## Unit Tests

Models

Services

Utilities

---

## Integration Tests

API endpoints

Database interactions

---

## GIS Tests

Spatial queries

Geometry validation

---

## AI Tests

Prompt generation

Insight validation

---

# Performance Targets

API Response:

```text
< 300 ms
```

Analytics Queries:

```text
< 5 seconds
```

Map Aggregations:

```text
< 2 seconds
```

---

# Future Evolution

Version 2:

- Event-driven architecture
- WebSocket notifications
- Real-time dashboards

Version 3:

- Service extraction
- Horizontal scaling
- Multi-tenant architecture

---

# Backend Philosophy

The backend should be:

- Predictable
- Secure
- Testable
- Modular
- GIS-aware
- Research-focused

Every feature should support reproducible, auditable, and scientifically defensible research workflows.