# MediLink: Smart Medicine Discovery & Reservation Platform

> **"Find. Reserve. Collect."**

MediLink is a production-grade healthcare technology web application designed to connect patients with verified local pharmacies for medicine discovery, qualitative stock availability tracking, secure prescription reservation, and pharmacy operations.

---

## Technical Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod, Recharts, Lucide Icons.
- **Backend**: Node.js, Express, TypeScript, Zod, Helmet, CORS, Morgan, REST API architecture.
- **Database & Services**: Supabase PostgreSQL, Supabase Auth, Supabase Private Storage.
- **Testing**: Vitest, Supertest, Playwright.

---

## Monorepo Architecture

```
MediLink/
├── client/          # React + Vite + TypeScript Frontend Application
├── server/          # Express + TypeScript REST API Server
├── supabase/        # Database migrations, seed data, and storage config
├── tests/           # Integration, E2E (Playwright) test suites
├── docs/            # Master architecture, API, DB, and deployment docs
├── .env.example     # Environment template
└── package.json     # Workspace root script orchestration
```

---

## Getting Started

### 1. Prerequisites
- Node.js (v18.x or v20.x recommended)
- npm (v9+ recommended)

### 2. Installation
```bash
# Install dependencies across all workspaces
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `client/.env` and `server/.env` with your Supabase credentials:

```bash
# Client configuration (client/.env)
VITE_API_BASE_URL=http://localhost:5000
VITE_SUPABASE_URL=https://<your-supabase-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>

# Server configuration (server/.env)
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
SUPABASE_URL=https://<your-supabase-id>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

### 4. Development Servers
```bash
# Run client and server concurrently
npm run dev

# Run server only
npm run dev:server

# Run client only
npm run dev:client
```

### 5. Verification & Testing
```bash
# Verify health API & execute unit/integration tests
npm test

# Run TypeScript type checking
npm run typecheck

# Production build test
npm run build
```

---

## Health Check Endpoint
- **URL**: `GET /api/health`
- **Response**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "service": "medilink-api",
    "environment": "development",
    "timestamp": "2026-09-21T19:06:14Z"
  }
}
```

---

## Documentation Roadmap
- [Master Project Plan](file:///docs/architecture/project-plan.md)
- Architecture Specs: `docs/architecture/`
- API Reference: `docs/api/`
- Database Design: `docs/database/`
- Deployment Guide: `docs/deployment/`
