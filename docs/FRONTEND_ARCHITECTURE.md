# Frontend Architecture

## Overview

The OpenGeoResearch frontend provides the user interface for:

- Project Management
- Survey Design
- Survey Execution
- GIS Visualization
- Analytics Dashboards
- AI Insights
- User Administration

The frontend follows a modern React architecture using:

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Material UI
- React Leaflet

---

# Design Principles

## API First

All data must come from backend APIs.

Frontend must not:

- Access databases
- Perform business logic
- Implement analytics calculations

Responsibilities:

- Presentation
- User interaction
- State management
- Visualization

---

## Component Driven Development

UI should be built using reusable components.

Example:

```text
Button
Card
DataTable
MapContainer
SurveyQuestion
```

Avoid page-specific duplication.

---

## Accessibility First

Target:

```text
WCAG 2.1 AA
```

Requirements:

- Keyboard navigation
- Screen reader support
- Accessible forms
- Accessible maps where possible

---

## Mobile Responsive

Supported:

- Desktop
- Tablet
- Mobile

Priority:

```text
Desktop First
```

Version 1 focuses on desktop research workflows.

---

# Technology Stack

## Core

React 19+

TypeScript

Vite

---

## Routing

React Router

---

## Server State

TanStack Query

Responsibilities:

- API requests
- Caching
- Refetching
- Optimistic updates

---

## Client State

Zustand

Use for:

- User session
- UI preferences
- Sidebar state
- Temporary survey runtime state

---

## UI Framework

Material UI (MUI)

---

## Mapping

Leaflet

React Leaflet

---

# Application Structure

```text
frontend/

src/

├── app/
├── pages/
├── features/
├── components/
├── services/
├── hooks/
├── store/
├── layouts/
├── routes/
├── utils/
├── types/
└── assets/
```

---

# Directory Structure

## app/

Application bootstrap.

Contains:

```text
App.tsx
Providers.tsx
```

---

## pages/

Route-level pages.

Examples:

```text
DashboardPage
ProjectsPage
SurveyBuilderPage
GISPage
AnalyticsPage
```

---

## features/

Business feature modules.

Examples:

```text
auth/
projects/
surveys/
gis/
analytics/
ai/
```

Each feature contains:

```text
components/
hooks/
services/
types/
```

---

## components/

Reusable UI components.

Examples:

```text
Button
Modal
Table
Chart
Map
```

---

## services/

API communication layer.

Examples:

```text
authService.ts
surveyService.ts
gisService.ts
```

---

## hooks/

Reusable React hooks.

Examples:

```text
useAuth
useProjects
useSurvey
```

---

## store/

Zustand stores.

Examples:

```text
authStore
uiStore
surveyRuntimeStore
```

---

# Routing Architecture

```text
/
├── login
├── register
├── dashboard
├── projects
├── surveys
├── maps
├── analytics
├── ai
└── admin
```

---

# Layout Architecture

## Public Layout

Pages:

```text
Login
Register
Forgot Password
```

---

## Application Layout

Components:

```text
Sidebar
Top Navigation
Main Content
Footer
```

---

# Authentication Flow

```text
Login

 ↓

JWT Token

 ↓

Store Token

 ↓

Protected Routes
```

Protected pages require:

```text
Authenticated User
```

---

# Authorization

Frontend respects RBAC permissions.

Example:

```text
Admin

Can Manage Users
```

```text
Research Assistant

Cannot Manage Users
```

UI should hide unauthorized actions.

Backend remains the source of truth.

---

# Survey Builder Architecture

## Components

```text
SurveyBuilder

├── SectionPanel
├── QuestionPanel
├── LogicBuilder
├── PreviewPane
```

---

## Question Types

Version 1:

- Text
- Number
- Date
- Single Choice
- Multiple Choice
- GPS
- Image

---

# Skip Logic Builder

Visual interface.

Example:

```text
IF Gender = Female

THEN Show Pregnancy Section
```

Components:

```text
RuleEditor
ConditionBuilder
ActionSelector
```

---

# Survey Runtime Architecture

## Runtime State

Stores:

```text
Current Question
Answers
Visible Questions
Progress
```

Managed using:

```text
Zustand
```

---

# GIS Architecture

## GIS Dashboard

Components:

```text
MapContainer
LayerSelector
Legend
FilterPanel
```

---

## Supported Layers

Version 1:

```text
Points
Heatmaps
Choropleths
Clusters
```

---

## Data Format

GeoJSON

Example:

```json
{
  "type": "FeatureCollection"
}
```

---

# Analytics Dashboard

Components:

```text
StatisticsCard
ChartWidget
FilterPanel
DataTable
```

---

# Charts

Version 1:

```text
Bar Chart
Pie Chart
Line Chart
Table
```

Recommended Library:

```text
Recharts
```

---

# AI Interface

## AI Assistant

Components:

```text
ChatPanel
PromptInput
InsightCard
ConversationHistory
```

---

## Example Query

```text
Which districts have the highest stigma scores?
```

---

## Response

```text
Narrative Insight

Statistics

Map Links
```

---

# API Communication

Pattern:

```text
Component

 ↓

Hook

 ↓

Service

 ↓

API
```

Example:

```typescript
ProjectsPage

 ↓

useProjects()

 ↓

projectService.getProjects()

 ↓

GET /api/v1/projects/
```

---

# Error Handling

Standard UI:

```text
Snackbar
Alert
Error Boundary
```

Examples:

- Network failure
- Validation error
- Permission denied

---

# Loading States

All API calls should provide:

```text
Loading
Success
Error
```

Never leave users guessing.

---

# Form Management

Library:

```text
React Hook Form
```

Benefits:

- Performance
- Validation
- TypeScript support

---

# Internationalization

Version 1:

```text
English
```

Version 2:

```text
Multi-language Support
```

Library:

```text
react-i18next
```

---

# Theming

Material UI Theme System.

Support:

```text
Light Mode
Dark Mode
```

Future:

Institution-specific branding.

---

# Accessibility

Requirements:

- Keyboard navigation
- ARIA labels
- Focus management
- Accessible forms

Target:

```text
WCAG 2.1 AA
```

---

# Testing Strategy

## Unit Tests

Tools:

```text
Vitest
React Testing Library
```

---

## Component Tests

Examples:

```text
QuestionEditor
MapView
InsightCard
```

---

## End-to-End Tests

Tool:

```text
Playwright
```

Test:

- Login
- Create Project
- Build Survey
- Submit Survey
- View Map

---

# Performance Goals

Initial Load:

```text
< 3 seconds
```

Route Changes:

```text
< 500 ms
```

Map Rendering:

```text
< 2 seconds
```

Large Survey Rendering:

```text
< 1 second
```

---

# Future Enhancements

Version 2:

- Offline survey mode
- Progressive Web App
- Real-time collaboration

Version 3:

- Mobile application
- Advanced GIS dashboards
- AI-assisted survey design

---

# Frontend Philosophy

The frontend should empower researchers to:

- Design studies
- Collect data
- Explore geography
- Analyze results
- Generate insights

without requiring programming knowledge.

Complex functionality should feel simple, intuitive, and reliable.