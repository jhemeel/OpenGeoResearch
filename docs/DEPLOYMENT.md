# OpenGeoResearch Deployment Guide

## Overview

This guide describes how to deploy OpenGeoResearch in production.

Supported deployment methods:

- Docker Compose (Recommended)
- Ubuntu Server
- Cloud VPS
- Self-hosted Infrastructure

Future support:

- Kubernetes
- AWS ECS
- Azure Container Apps
- Google Cloud Run

---

# Production Architecture

```text
                    Internet
                        │
                        ▼
                 ┌───────────┐
                 │   Nginx   │
                 └─────┬─────┘
                       │
         ┌─────────────┼─────────────┐
         ▼                           ▼

 React Frontend              Django Backend
 Static Files                    REST API

         │                           │
         └─────────────┬─────────────┘
                       ▼

              PostgreSQL + PostGIS

                       │
                       ▼

                   Backups
```

---

# Recommended Server Requirements

## Small Deployment

Suitable for:

- Pilot studies
- Small NGOs
- University projects

Resources:

```text
2 CPU
4 GB RAM
50 GB SSD
```

---

## Medium Deployment

Suitable for:

- Multiple projects
- Research institutions

Resources:

```text
4 CPU
8 GB RAM
100 GB SSD
```

---

## Large Deployment

Suitable for:

- National surveys
- Government deployments

Resources:

```text
8+ CPU
16+ GB RAM
250+ GB SSD
```

---

# Required Software

## Ubuntu

Recommended:

```text
Ubuntu 24.04 LTS
```

Update:

```bash
sudo apt update
sudo apt upgrade -y
```

---

## Docker

Install:

```bash
curl -fsSL https://get.docker.com | sh
```

Verify:

```bash
docker --version
```

---

## Docker Compose

Verify:

```bash
docker compose version
```

---

# Clone Repository

```bash
git clone https://github.com/opengeoresearch/OpenGeoResearch.git

cd OpenGeoResearch
```

---

# Production Environment Variables

Create:

```bash
cp .env.example .env.production
```

Example:

```env
DEBUG=False

SECRET_KEY=replace_with_secure_key

ALLOWED_HOSTS=example.com,www.example.com

DATABASE_NAME=opengeoresearch

DATABASE_USER=postgres

DATABASE_PASSWORD=strong_password

DATABASE_HOST=db

DATABASE_PORT=5432

OPENAI_API_KEY=

SECURE_SSL_REDIRECT=True
```

---

# Docker Compose Deployment

## Build Images

```bash
docker compose -f docker-compose.prod.yml build
```

---

## Start Services

```bash
docker compose -f docker-compose.prod.yml up -d
```

---

## Verify Containers

```bash
docker ps
```

Expected:

```text
frontend
backend
postgres
nginx
```

---

# Database Setup

Run migrations:

```bash
docker compose exec backend python manage.py migrate
```

Create administrator:

```bash
docker compose exec backend python manage.py createsuperuser
```

Collect static files:

```bash
docker compose exec backend python manage.py collectstatic --noinput
```

---

# Nginx Configuration

Example:

```nginx
server {
    listen 80;

    server_name example.com;

    location / {
        root /usr/share/nginx/html;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://backend:8000;
    }

    location /admin/ {
        proxy_pass http://backend:8000;
    }
}
```

---

# HTTPS Configuration

Install Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
```

Generate certificate:

```bash
sudo certbot --nginx
```

Verify:

```bash
https://example.com
```

---

# PostgreSQL Production Setup

Connect:

```bash
docker compose exec db psql -U postgres
```

Create extensions:

```sql
CREATE EXTENSION postgis;
CREATE EXTENSION pgcrypto;
CREATE EXTENSION "uuid-ossp";
```

Verify:

```sql
SELECT PostGIS_Version();
```

---

# File Storage

## Version 1

Local storage supported.

Example:

```text
/media
/uploads
```

---

## Recommended Production Storage

Use object storage:

- Amazon S3
- Cloudflare R2
- MinIO

Benefits:

- Scalability
- Reliability
- Backup support

---

# Backup Strategy

## Database Backup

Daily backup:

```bash
pg_dump opengeoresearch > backup.sql
```

---

## Automated Backup

Example cron:

```bash
0 2 * * * /opt/scripts/backup.sh
```

---

## Retention

Recommended:

```text
Daily backups: 30 days

Weekly backups: 12 weeks

Monthly backups: 12 months
```

---

# Monitoring

Recommended Tools:

## Application Monitoring

```text
Sentry
```

Purpose:

- Error tracking
- Performance monitoring

---

## Infrastructure Monitoring

```text
Prometheus
Grafana
```

Purpose:

- CPU usage
- Memory usage
- Database performance

---

# Security Hardening

## Firewall

Enable:

```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

---

## SSH Security

Disable password login:

```text
PasswordAuthentication no
```

Use SSH keys only.

---

## Secrets

Never commit:

```text
.env
```

Use:

```text
Environment Variables
Secret Managers
```

---

# Scaling Strategy

## Version 1

Single-server deployment.

Architecture:

```text
Frontend
Backend
Database
```

---

## Version 2

Add:

```text
Redis
Celery
```

For:

- AI processing
- Exports
- Background jobs

---

## Version 3

Horizontal scaling:

```text
Load Balancer
Multiple Backend Instances
Managed Database
```

---

# GitHub Actions CI/CD

Example Workflow:

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Deploy
        run: |
          echo "Deploy script"
```

Future improvements:

- Automated testing
- Security scanning
- Container builds
- Production deployment

---

# Health Checks

Application:

```text
/api/v1/health/
```

Expected:

```json
{
  "status": "healthy"
}
```

---

# Upgrade Procedure

Pull latest changes:

```bash
git pull origin main
```

Build:

```bash
docker compose build
```

Migrate:

```bash
docker compose exec backend python manage.py migrate
```

Restart:

```bash
docker compose restart
```

---

# Disaster Recovery

Recommended:

1. Daily database backups
2. Offsite backup storage
3. Versioned media storage
4. Infrastructure documentation

Recovery target:

```text
RPO: 24 hours

RTO: 4 hours
```

---

# Future Deployment Options

Version 2:

- Kubernetes
- Helm Charts
- AWS ECS

Version 3:

- Multi-region deployments
- High availability clusters
- Enterprise hosting

---

# Deployment Checklist

Before Production:

- HTTPS enabled
- Backups configured
- Monitoring configured
- Secrets secured
- PostGIS installed
- Admin account created
- Health checks passing

---

# Production Philosophy

OpenGeoResearch should be:

- Secure
- Reliable
- Scalable
- Easy to self-host

Organizations should be able to deploy and operate the platform without vendor lock-in.