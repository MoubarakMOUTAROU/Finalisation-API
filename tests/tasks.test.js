const request = require('supertest');

const API_URL = 'http://localhost:3000';

describe('Tests Tasks', () => {
  let token = '';
  let taskId = '';

  beforeAll(async () => {
    const user = {
      nom: 'TaskTester',
      email: `task-${Date.now()}@example.com`,
      password: 'test123456',
      age: 25
    };

    const res = await request(API_URL)
      .post('/auth/register')
      .send(user);

    token = res.body.token;
  });

  test('POST /tasks → crée une tâche', async () => {
    const res = await request(API_URL)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titre: 'Tâche de test',
        description: 'Créée par Jest'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('titre', 'Tâche de test');
    expect(res.body).toHaveProperty('statut', 'à faire');

    taskId = res.body._id;
  });

  test('GET /tasks → liste les tâches de l\'utilisateur', async () => {
    const res = await request(API_URL)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('PUT /tasks/:id → modifie le statut', async () => {
    const res = await request(API_URL)
      .put(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ statut: 'terminée' });

    expect(res.statusCode).toBe(200);
    expect(res.body.statut).toBe('terminée');
  });

  test('DELETE /tasks/:id → supprime la tâche', async () => {
    const res = await request(API_URL)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  test('GET /tasks → 401 sans token', async () => {
    const res = await request(API_URL).get('/tasks');
    expect(res.statusCode).toBe(401);
  });
});