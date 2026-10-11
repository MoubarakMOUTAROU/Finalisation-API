const request = require('supertest');

const API_URL = 'http://localhost:3000';

describe('Tests Auth', () => {
  const testUser = {
    nom: 'TestUser',
    email: `test-${Date.now()}@example.com`,
    password: 'test123456',
    age: 30
  };

  let token = '';

  test('POST /auth/register → crée un utilisateur', async () => {
    const res = await request(API_URL)
      .post('/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', testUser.email);

    token = res.body.token;
  });

  test('POST /auth/register → refuse un email déjà utilisé', async () => {
    const res = await request(API_URL)
      .post('/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/déjà utilisé/);
  });

  test('POST /auth/login → connexion réussie', async () => {
    const res = await request(API_URL)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /auth/login → refus si mauvais mot de passe', async () => {
    const res = await request(API_URL)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: 'mauvais'
      });

    expect(res.statusCode).toBe(401);
  });

  test('GET /auth/me → renvoie le profil avec token', async () => {
    const res = await request(API_URL)
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', testUser.email);
  });

  test('GET /auth/me → 401 sans token', async () => {
    const res = await request(API_URL).get('/auth/me');
    expect(res.statusCode).toBe(401);
  });
});