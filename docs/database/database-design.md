# MediLink Database Design & Schema Specification

## Database Engine
- PostgreSQL via Supabase

## Row Level Security (RLS) Principles
- All tables must enable RLS.
- Patients can read & write own profile, reservations, and notifications.
- Pharmacies can read & update assigned inventory and reservations.
- Administrators can read platform metadata, audit logs, and update verification/user statuses.
