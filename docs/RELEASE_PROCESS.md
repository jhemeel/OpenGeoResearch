# Release Process

## Overview

This document defines how OpenGeoResearch releases are planned, tested, approved, and published.

Goals:

- Predictable releases
- Stable deployments
- Reproducible upgrades
- Transparent change management
- Safe introduction of new features

---

# Release Philosophy

OpenGeoResearch prioritizes:

1. Stability
2. Research integrity
3. Backward compatibility
4. Security
5. Documentation

A release should never compromise the validity of collected research data.

---

# Versioning Strategy

OpenGeoResearch follows:

```text
Semantic Versioning (SemVer)

MAJOR.MINOR.PATCH
```

Example:

```text
1.0.0
1.1.0
1.1.1
2.0.0
```

---

# Version Definitions

## MAJOR

Breaking changes.

Examples:

- API changes
- Database schema redesign
- Survey engine redesign

Example:

```text
1.0.0 → 2.0.0
```

---

## MINOR

Backward-compatible features.

Examples:

- New GIS layers
- New question types
- Additional exports

Example:

```text
1.2.0 → 1.3.0
```

---

## PATCH

Bug fixes.

Examples:

- GIS rendering fixes
- Analytics corrections
- Security patches

Example:

```text
1.3.0 → 1.3.1
```

---

# Release Types

## Development Releases

Internal testing.

Format:

```text
0.x.y
```

Example:

```text
0.5.0
```

---

## Alpha Releases

Early development.

Characteristics:

- Incomplete features
- Breaking changes allowed
- Not production ready

Example:

```text
1.0.0-alpha.1
```

---

## Beta Releases

Feature complete.

Characteristics:

- Wider testing
- Bug fixing focus
- Documentation review

Example:

```text
1.0.0-beta.1
```

---

## Release Candidates

Potential final release.

Characteristics:

- Production-ready testing
- Only critical fixes allowed

Example:

```text
1.0.0-rc.1
```

---

## Stable Releases

Official production release.

Example:

```text
1.0.0
```

---

# Release Branching Strategy

## Main Branch

```text
main
```

Always stable.

---

## Development Branch

```text
develop
```

Active development.

---

## Release Branches

Example:

```text
release/1.0.0
```

Purpose:

- Final testing
- Documentation review
- Bug fixes

---

## Hotfix Branches

Example:

```text
hotfix/1.0.1
```

Purpose:

- Urgent production fixes

---

# Release Workflow

```text
Feature Branch

    ↓

Develop

    ↓

Release Branch

    ↓

Testing

    ↓

Approval

    ↓

Main

    ↓

Tag

    ↓

Release
```

---

# Release Requirements

Before release:

- All tests pass
- Documentation updated
- Security scans pass
- Migration scripts verified
- Changelog updated

---

# Release Checklist

## Code Quality

- Linting passes
- Unit tests pass
- Integration tests pass
- E2E tests pass

---

## Documentation

Verify:

- README updated
- API docs updated
- Migration notes included

---

## GIS Validation

Verify:

- Point layers
- Heatmaps
- Choropleths
- Spatial queries

---

## Analytics Validation

Verify:

- Frequencies
- Crosstabs
- Descriptive statistics

---

## AI Validation

Verify:

- Prompt templates
- Insight generation
- Error handling

---

## Security Validation

Verify:

- Dependency audits
- Permission checks
- Authentication flows

---

# Changelog Management

Every release must include:

```text
CHANGELOG.md
```

Format:

## Added

## Changed

## Fixed

## Deprecated

## Removed

## Security

---

# Example

```markdown
## Added

- Heatmap visualization
- AI insight export

## Fixed

- GPS coordinate validation bug
```

---

# Database Migration Policy

All schema changes require migrations.

Requirements:

- Reversible when possible
- Tested before release
- Documented

---

# Migration Testing

Required:

- Upgrade from previous version
- Data preservation verification
- GIS data validation

---

# Backward Compatibility

Version 1.x policy:

- APIs should remain backward compatible
- Existing survey data should remain usable

Breaking changes require:

- Major version release
- Migration guide

---

# Deprecation Policy

Deprecated features should:

- Remain available for at least one minor release
- Generate warnings
- Be documented

Example:

```text
Deprecated in 1.4

Removed in 2.0
```

---

# Release Approval

A release requires approval from:

- At least 2 maintainers

Recommended:

- 1 GIS reviewer
- 1 Backend reviewer

For major releases:

- Core Team approval

---

# GitHub Release Process

For each release:

1. Create tag
2. Publish release notes
3. Upload assets
4. Update documentation

Example:

```bash
git tag v1.0.0
git push origin v1.0.0
```

---

# Release Assets

Include:

- Source code
- Docker images
- Release notes
- Migration guide

---

# Docker Release Policy

Published images:

```text
latest
1
1.0
1.0.0
```

Example:

```text
opengeoresearch/backend:1.0.0
```

---

# Security Releases

Critical vulnerabilities may require emergency releases.

Example:

```text
1.0.2
```

Timeline:

- Fix developed privately
- Security review
- Coordinated release
- Public disclosure

---

# Long-Term Support (LTS)

Future releases may be designated:

```text
LTS
```

Support Period:

```text
24 Months
```

Example:

```text
2.0 LTS
```

---

# Supported Versions

General Policy:

- Latest major version
- Latest minor release

Example:

```text
2.1.x

2.0.x
```

Unsupported versions receive no guarantees.

---

# Release Documentation

Every release should publish:

- Release notes
- Upgrade guide
- Breaking changes
- Security notes

---

# Community Testing

Beta and RC releases should be tested by:

- Developers
- Researchers
- GIS specialists
- Data analysts

Feedback should be collected through:

- GitHub Issues
- GitHub Discussions

---

# Version 1.0 Release Criteria

The first stable release must include:

- Authentication
- Projects
- Survey Builder
- Skip Logic
- Repeating Groups
- Response Collection
- GPS Capture
- Heatmaps
- Choropleths
- Analytics
- AI Insights
- Exports

---

# Release Philosophy

A release is not complete when code is merged.

A release is complete when users can confidently deploy, upgrade, and use OpenGeoResearch to conduct reliable research without risking data integrity.