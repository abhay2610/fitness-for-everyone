# PostgreSQL Setup Guide

## Option 1: Neon (Recommended - Easiest)

1. Go to https://neon.tech
2. Sign up with GitHub (free)
3. Create a new project: "fitness-for-everyone"
4. Copy the connection string from the dashboard
5. Update `application.properties` with the connection details

**Free Tier:**
- 512 MB storage
- 1 database
- Always available

## Option 2: Supabase

1. Go to https://supabase.com
2. Sign up with GitHub (free)
3. Create a new project: "fitness-for-everyone"
4. Go to Settings → Database → Connection String
5. Copy the connection pooling string (use "Transaction" mode)
6. Update `application.properties` with the connection details

**Free Tier:**
- 500 MB storage
- 2 databases
- Always available

## Option 3: Railway

1. Go to https://railway.app
2. Sign up with GitHub (free)
3. New Project → Add PostgreSQL
4. Copy connection details from Variables tab
5. Update `application.properties` with the connection details

**Free Tier:**
- $5 credit/month (enough for small projects)
- Auto-sleep after inactivity

## After Getting Connection Details

Update `/backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://[HOST]:[PORT]/[DATABASE]?sslmode=require
spring.datasource.username=[USERNAME]
spring.datasource.password=[PASSWORD]
```

## Viewing Your Data

### Option 1: Provider Dashboard
- Neon: Built-in SQL editor in dashboard
- Supabase: Table Editor + SQL Editor in dashboard
- Railway: Query tab in database service

### Option 2: pgAdmin (Desktop App)
1. Download from https://www.pgadmin.org/download/
2. Add new server with your connection details
3. Browse tables, run queries, view data

### Option 3: DBeaver (Desktop App)
1. Download from https://dbeaver.io/download/
2. Create new PostgreSQL connection
3. Full database management features
