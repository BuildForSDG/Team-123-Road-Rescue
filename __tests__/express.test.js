const request = require('supertest');
const app = require('../server/index');


// Set NOD_ENV = test
process.env.NODE_ENV = 'test';


describe('Test the root path', () => {
  afterAll((done) => {
    app.close(done);
  });
  it('It should respond with the GET method', async () => {
    const response = await request(app).get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=UTF-8');
    expect(response.statusCode).toBe(200);
  });

  it('It should respond with the GET method', async () => {
    const response = await request(app).get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=UTF-8');
    expect(response.statusCode).toBe(200);
  });

  it('It should respond with the json object', async () => {
    const response = await request(app).get('/api/test')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.status).toBe(200);
  });
});
