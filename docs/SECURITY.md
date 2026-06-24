# Security Policy

## Overview

OpenGeoResearch takes security seriously.

This project may be used to collect, manage, analyze, and visualize research data, including geospatial information and potentially sensitive survey responses.

We appreciate the efforts of security researchers and contributors who help identify and responsibly disclose vulnerabilities.

---

# Supported Versions

The following versions currently receive security updates.

| Version | Supported |
|----------|----------|
| 1.x | ✅ |
| 0.x | ❌ |

Only the latest stable release is guaranteed to receive security patches.

---

# Reporting a Vulnerability

## Please Do Not Create Public Issues

If you discover a security vulnerability, do not report it through a public GitHub issue.

Public disclosure before remediation may put users at risk.

---

## Responsible Disclosure

Please report vulnerabilities privately.

Contact:

security@opengeoresearch.org

(Replace with the official project security contact.)

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested remediation (if available)

---

# What to Expect

After submitting a report:

### Within 72 Hours

We will acknowledge receipt of the report.

### Investigation

The maintainers will:

- Validate the issue
- Assess severity
- Develop a remediation plan

### Resolution

Once fixed:

- A security advisory may be published
- Release notes will document the fix
- Credit may be given to the reporter (if desired)

---

# Security Priorities

OpenGeoResearch prioritizes protection of:

1. User accounts
2. Research data
3. Geospatial data
4. Uploaded files
5. API endpoints
6. Administrative functions

---

# Authentication Security

Requirements:

- JWT authentication
- Short-lived access tokens
- Refresh token rotation
- Password hashing using modern algorithms

Recommended:

```text
Argon2
```

Fallback:

```text
PBKDF2
```

---

# Authorization

Role-Based Access Control (RBAC) is mandatory.

Examples:

### Principal Investigator

Can:

- Manage projects
- Create surveys
- View project data

### Research Assistant

Can:

- Submit responses
- View assigned projects

### Data Analyst

Can:

- Access analytics
- Generate reports

### Administrator

Can:

- Manage platform settings
- Manage users

---

# Data Protection

## Encryption in Transit

All production deployments should enforce:

```text
HTTPS
TLS 1.2+
```

---

## Encryption at Rest

Recommended:

- Encrypted database volumes
- Encrypted backups
- Encrypted object storage

---

# GPS Data Protection

Geospatial data may expose sensitive locations.

Recommendations:

### Restrict Access

Only authorized users should view raw coordinates.

### Export Controls

Provide options to:

- Remove coordinates
- Aggregate coordinates
- Anonymize locations

### Future Enhancements

Support:

- Coordinate masking
- Geomasking
- Location obfuscation

---

# File Upload Security

Allowed uploads:

- Images
- Survey attachments

Requirements:

- File type validation
- MIME validation
- File size limits
- Malware scanning (recommended)

Never trust client-side validation.

---

# API Security

Requirements:

- JWT authentication
- Input validation
- Rate limiting
- Permission checks
- Secure serialization

Recommendations:

```text
django-ratelimit
```

---

# Database Security

Requirements:

- Principle of least privilege
- Separate application user
- No superuser connections
- Regular backups

Recommended PostgreSQL extensions:

```sql
CREATE EXTENSION postgis;
CREATE EXTENSION pgcrypto;
```

---

# Audit Logging

The following actions should be logged:

- Login events
- Permission changes
- Survey modifications
- Response edits
- Data exports
- Administrative actions

Logs should be immutable where possible.

---

# Dependency Management

All dependencies should be regularly updated.

Recommended tools:

Backend:

```text
pip-audit
safety
```

Frontend:

```text
npm audit
```

GitHub:

```text
Dependabot
```

---

# Secrets Management

Never commit:

- API keys
- Database passwords
- JWT secrets
- Cloud credentials

Use:

```text
Environment Variables
```

Examples:

```env
SECRET_KEY=
DATABASE_URL=
OPENAI_API_KEY=
```

---

# AI Security

AI-generated outputs should never:

- Modify data automatically
- Delete records
- Bypass permissions

AI should operate as an advisory layer only.

Human review is required for all critical actions.

---

# Research Ethics Considerations

OpenGeoResearch may be used in:

- Public health studies
- Social science research
- Epidemiological investigations

Users are responsible for complying with:

- Local regulations
- Ethical approvals
- Institutional Review Board (IRB) requirements
- Data protection laws

Examples:

- GDPR
- NDPR
- HIPAA (where applicable)

---

# Security Best Practices for Self-Hosted Deployments

Recommended:

- Reverse proxy (Nginx)
- TLS certificates
- Firewall configuration
- Regular backups
- Automatic security updates

---

# Future Security Enhancements

Version 2:

- Multi-factor authentication (MFA)
- Single Sign-On (SSO)
- Security dashboard

Version 3:

- Field-level encryption
- Advanced audit analytics
- Compliance reporting

---

# Security Philosophy

OpenGeoResearch follows a defense-in-depth strategy:

1. Secure by default
2. Least privilege
3. Transparency
4. Responsible disclosure
5. Continuous improvement

Protecting research data is essential to maintaining trust, scientific integrity, and responsible use of the platform.