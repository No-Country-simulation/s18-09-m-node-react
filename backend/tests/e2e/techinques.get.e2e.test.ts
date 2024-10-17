import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
import { getServerUrl } from './setup';


describe('TECHNIQUES - E2E - Get', () => {
  it('should not get all techniques without authentication', async () => {
    const response = await request(getServerUrl())
      .get(`/${process.env.API_VERSION}/techniques`)

    expect(response.status).toBe(401);
  })

  // -- LOGIN -- //
  let token: string;
  it('should login a user with valid credentials', async () => {
    const response = await request(getServerUrl())
      .post(`/${process.env.API_VERSION}/auth/login`)
      .send({ email: 'admin@admin.com', password: 'admin1234' });
    token = response.body.token
  });

  it('should get all techniques', async () => {
    const response = await request(getServerUrl())
      .get(`/${process.env.API_VERSION}/techniques`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
  });
})