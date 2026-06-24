# OpenGeoResearch Installation Guide

## Overview

This guide explains how to set up OpenGeoResearch for local development.

The platform consists of:

- Django Backend
- React Frontend
- PostgreSQL Database
- PostGIS Extension
- Redis (future)
- Docker (recommended)

---

# System Requirements

## Minimum Requirements

- 8 GB RAM
- 20 GB Free Disk Space
- 4 CPU Cores

## Recommended

- 16 GB RAM
- SSD Storage
- Docker Desktop

---

# Required Software

## Git

Install:

https://git-scm.com/

Verify:

```bash
git --version
```

---

## Docker

Install:

https://www.docker.com/

Verify:

```bash
docker --version
docker compose version
```

---

## Node.js

Version:

```text
22+
```

Verify:

```bash
node --version
npm --version
```

---

## Python

Version:

```text
3.12+
```

Verify:

```bash
python --version
```

---

# Clone Repository

```bash
git clone https://github.com/opengeoresearch/OpenGeoResearch.git

cd OpenGeoResearch
```

---

# Project Structure

```text
OpenGeoResearch/

├── backend/
├── frontend/
├── docs/
├── docker/
├── .github/
├── README.md
├── docker-compose.yml
└── .env.example
```

---

# Environment Configuration

Create:

```bash
cp .env.example .env
```

Example:

```env
DEBUG=True

SECRET_KEY=replace_me

DATABASE_NAME=opengeoresearch

DATABASE_USER=postgres

DATABASE_PASSWORD=postgres

DATABASE_HOST=db

DATABASE_PORT=5432

ALLOWED_HOSTS=localhost,127.0.0.1

OPENAI_API_KEY=
```

---

# Docker Installation (Recommended)

## Build Containers

```bash
docker compose build
```

---

## Start Services

```bash
docker compose up -d
```

---

## Verify Containers

```bash
docker ps
```

Expected:

```text
opengeoresearch_backend
opengeoresearch_frontend
opengeoresearch_db
```

---

# Database Setup

## Enter Backend Container

```bash
docker compose exec backend bash
```

---

## Run Migrations

```bash
python manage.py migrate
```

---

## Create Superuser

```bash
python manage.py createsuperuser
```

---

## Load Initial Data

```bash
python manage.py seed_data
```

Optional.

---

# Backend Setup Without Docker

## Create Virtual Environment

```bash
python -m venv venv
```

Activate:

Linux/macOS:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Database

Install:

- PostgreSQL
- PostGIS

Create database:

```sql
CREATE DATABASE opengeoresearch;
```

Enable PostGIS:

```sql
CREATE EXTENSION postgis;
```

---

## Run Migrations

```bash
python manage.py migrate
```

---

## Start Backend

```bash
python manage.py runserver
```

Backend URL:

```text
http://localhost:8000
```

---

# Frontend Setup Without Docker

Navigate:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# Verify Installation

Open:

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:8000
```

Admin:

```text
http://localhost:8000/admin
```

API Docs:

```text
http://localhost:8000/api/docs
```

---

# Database Extensions

Verify:

```sql
SELECT PostGIS_Version();
```

Required Extensions:

```sql
CREATE EXTENSION postgis;
CREATE EXTENSION pgcrypto;
CREATE EXTENSION "uuid-ossp";
```

---

# GIS Setup Verification

Open Django shell:

```bash
python manage.py shell
```

Test:

```python
from django.contrib.gis.geos import Point

p = Point(3.9470, 7.3775)

print(p)
```

Expected:

```text
POINT (3.9470 7.3775)
```

---

# Running Tests

Backend:

```bash
pytest
```

Coverage:

```bash
pytest --cov
```

---

Frontend:

```bash
npm run test
```

---

# Linting

Backend:

```bash
ruff check .
```

---

Frontend:

```bash
npm run lint
```

---

# Formatting

Backend:

```bash
black .
```

---

Frontend:

```bash
npm run format
```

---

# Common Issues

## PostGIS Missing

Error:

```text
type "geometry" does not exist
```

Fix:

```sql
CREATE EXTENSION postgis;
```

---

## Migration Errors

Try:

```bash
python manage.py migrate --fake-initial
```

---

## Frontend Cannot Reach API

Check:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## Docker Build Failure

Rebuild:

```bash
docker compose down

docker compose build --no-cache
```

---

# Development Workflow

Start services:

```bash
docker compose up -d
```

Run migrations:

```bash
docker compose exec backend python manage.py migrate
```

Create feature branch:

```bash
git checkout -b feature/my-feature
```

Commit:

```bash
git commit -m "feat: add choropleth map support"
```

Push:

```bash
git push origin feature/my-feature
```

---

# Next Steps

After installation:

1. Read ARCHITECTURE.md
2. Read DATABASE_SCHEMA.md
3. Read API_SPEC.md
4. Review ROADMAP.md
5. Select an issue
6. Start contributing

---

# Need Help?

Future support channels:

- GitHub Discussions
- Documentation Portal
- Community Discord
- Project Wiki

---

Welcome to OpenGeoResearch.

Collect. Analyze. Map. Understand.