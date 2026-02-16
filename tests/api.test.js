// tests/api.test.js
const request = require('supertest');
const app = require('../server');

describe('Books API', () => {

  it('GET /api/books should return all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/books/:id should return a book', async () => {
    const res = await request(app).get('/api/books/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('POST /api/books should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ title: "New Book", author: "Author X" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('title', 'New Book');
  });

  it('PUT /api/books/:id should update a book', async () => {
    const res = await request(app)
      .put('/api/books/1')
      .send({ title: "Updated Book" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'Updated Book');
  });

  it('DELETE /api/books/:id should delete a book', async () => {
    const res = await request(app).delete('/api/books/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('GET /api/books/999 should return 404', async () => {
    const res = await request(app).get('/api/books/999');
    expect(res.status).toBe(404);
  });

});
