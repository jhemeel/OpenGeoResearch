# Contributing to OpenGeoResearch

Thank you for your interest in contributing to OpenGeoResearch.

We welcome contributions from:

- Software Developers
- GIS Specialists
- Data Scientists
- Public Health Researchers
- Epidemiologists
- UX/UI Designers
- Technical Writers
- Open Source Enthusiasts

Our goal is to build a world-class open-source research and geospatial analytics platform.

---

# Code of Conduct

By participating in this project, you agree to follow our Code of Conduct.

Please read:

CODE_OF_CONDUCT.md

before contributing.

---

# Ways to Contribute

You can contribute in many ways.

## Development

Examples:

- Backend development
- Frontend development
- GIS functionality
- AI features
- API improvements

---

## Documentation

Examples:

- Improve README
- Write tutorials
- Improve API documentation
- Fix typos

---

## Testing

Examples:

- Bug reporting
- Manual testing
- Automated testing

---

## Research Contributions

Examples:

- Survey methodology advice
- GIS recommendations
- Public health workflows
- Data quality improvements

---

# Development Workflow

## Step 1

Fork the repository.

```bash
git clone https://github.com/YOUR_USERNAME/OpenGeoResearch.git
```

---

## Step 2

Create a feature branch.

```bash
git checkout -b feature/my-feature
```

Examples:

```bash
feature/survey-builder
feature/heatmap-module
feature/ai-insights
```

---

## Step 3

Make changes.

Ensure:

- Code is documented
- Tests are added
- Existing tests pass

---

## Step 4

Commit changes.

Use descriptive commit messages.

Examples:

```bash
feat: add choropleth layer support

fix: resolve survey validation bug

docs: update installation guide
```

---

## Step 5

Push changes.

```bash
git push origin feature/my-feature
```

---

## Step 6

Open a Pull Request.

Include:

- Summary of changes
- Screenshots (if applicable)
- Related issue number

---

# Branch Strategy

## Main Branch

```text
main
```

Production-ready code.

---

## Development Branch

```text
develop
```

Integration branch.

---

## Feature Branches

```text
feature/*
```

Examples:

```text
feature/auth-module
feature/gis-engine
feature/ai-assistant
```

---

## Bug Fix Branches

```text
bugfix/*
```

Examples:

```text
bugfix/login-error
bugfix/heatmap-rendering
```

---

# Commit Message Convention

We follow Conventional Commits.

## Feature

```text
feat: add skip logic support
```

---

## Fix

```text
fix: resolve GPS capture issue
```

---

## Documentation

```text
docs: update API specification
```

---

## Refactor

```text
refactor: improve survey serializer
```

---

## Test

```text
test: add response API tests
```

---

# Coding Standards

## Python

Requirements:

- Follow PEP 8
- Use type hints
- Write docstrings
- Keep functions focused

Example:

```python
def calculate_completion_rate(
    completed: int,
    total: int
) -> float:
    """
    Calculate survey completion rate.
    """
    return completed / total
```

---

## Django

Guidelines:

- Use class-based views where appropriate
- Use serializers for validation
- Keep business logic out of views
- Prefer service layers for complex operations

---

## React

Guidelines:

- Use TypeScript
- Functional components only
- Use React Query for API calls
- Keep components reusable

Example:

```tsx
export function ProjectCard() {
  return <div>Project</div>;
}
```

---

# Testing Requirements

All new features should include tests.

## Backend

Framework:

```text
Pytest
```

Target:

```text
80%+ coverage
```

---

## Frontend

Framework:

```text
Vitest
```

Target:

```text
80%+ coverage
```

---

# Pull Request Requirements

Before submitting a PR:

- Code compiles
- Tests pass
- Documentation updated
- No linting errors
- No failing CI checks

---

# Issue Reporting

When reporting issues include:

## Bug Reports

- Expected behavior
- Actual behavior
- Steps to reproduce
- Screenshots if applicable

---

## Feature Requests

Include:

- Problem statement
- Proposed solution
- Use case

---

# GIS Contributions

GIS functionality is a core part of OpenGeoResearch.

Examples of contributions:

- Spatial analytics
- PostGIS improvements
- Boundary management
- Heat maps
- Choropleth maps

---

# AI Contributions

Examples:

- Insight generation
- Natural language querying
- Data quality analysis
- Explainable AI features

Requirements:

- Reproducible outputs
- Transparent methodology
- Research integrity

---

# Documentation Standards

Documentation should be:

- Clear
- Concise
- Beginner friendly
- Research focused

All major features should include:

- Description
- Screenshots
- Examples
- API references

---

# Recognition

All contributors are valued.

Contributors may be recognized through:

- Contributors page
- Release notes
- GitHub acknowledgements

---

# Questions

If you need help:

- Open a GitHub Discussion
- Open an Issue
- Join community channels (future)

---

# Thank You

OpenGeoResearch exists because of its community.

Every contribution—whether code, documentation, testing, design, GIS expertise, or research knowledge—helps make research tools more accessible worldwide.