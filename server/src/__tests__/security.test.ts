import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('MediLink Backend Security & Guard Tests', () => {
  it('POST /api/auth/register should block ADMIN role creation via public registration', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        role: 'ADMIN',
        fullName: 'Hacker Admin',
        email: 'hacker@test.local',
        password: 'Password123!',
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('code', 'FORBIDDEN');
  });

  it('POST /api/admin/users/:id/suspend should block admin self-suspension', async () => {
    const adminSelfId = '11111111-1111-1111-1111-111111111111';
    const response = await request(app).post(`/api/admin/users/${adminSelfId}/suspend`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body.message).toContain('Administrators cannot suspend their own admin account');
  });
});
