import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
import { getServerUrl } from './setup';

describe('AUTH - E2E - Login', () => {

  it('should login a user with valid credentials', async () => {
    const response = await request(getServerUrl())
      .post(`/${process.env.API_VERSION}/auth/login`)
      .send({ email: 'admin@admin.com', password: 'admin1234' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User logged in.');
    expect(response.body.token).toBeDefined();
  });


  it('should not login a user with invalid credentials', async () => {
    const response = await request(getServerUrl())
      .post(`/${process.env.API_VERSION}/auth/login`)
      .send({ email: 'admin@admin.com', password: 'admin12345' });

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Invalid credentials.');
  });


  it('should block login a user with invalid credentials after 3 attempts', async () => {
    await request(getServerUrl())
      .post(`/${process.env.API_VERSION}/auth/login`)
      .send({ email: 'admin@admin.com', password: 'admin12345' });
    await request(getServerUrl())
      .post(`/${process.env.API_VERSION}/auth/login`)
      .send({ email: 'admin@admin.com', password: 'admin12345' });
    const response = await request(getServerUrl())
      .post(`/${process.env.API_VERSION}/auth/login`)
      .send({ email: 'admin@admin.com', password: 'admin12345' });

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Too many login attempts.');
  });


});
