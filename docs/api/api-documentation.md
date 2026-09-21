# MediLink API Specification

## Baseline Envelope

### Success Response
```json
{
  "success": true,
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error details",
  "code": "ERROR_CODE"
}
```

## System Endpoints

### GET /api/health
- **Auth**: Public
- **Description**: Returns API health status, active environment, and server timestamp.
- **Success Response (200 OK)**:
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
