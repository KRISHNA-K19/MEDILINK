# MediLink Deployment Guide

## Overview
MediLink enforces independent deployment of Frontend (SPA) and Backend (REST API):

- **Frontend**: Vercel (`client/`)
- **Backend**: Render / Railway (`server/`)
- **Database & Auth**: Supabase Managed Instance

## Client-Server Linking
Communication is orchestrated strictly via `VITE_API_BASE_URL` on the frontend pointing to the deployed backend domain.
