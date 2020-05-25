const request = require('supertest');
const app = require('../server/index');

let accessToken;
// eslint-disable-next-line camelcase
let message_id;
// Set NOD_ENV = test
process.env.NODE_ENV = 'test';


describe('User Controller Tests', () => {
  const r = Math.random()
    .toString(36)
    .substring(7);

  afterAll((done) => {
    app.close(done);
  });


  test('It creates a user', async () => {
    const response = await request(app)
      .post('/users')
      .query({
        name: r,
        email: `${r}@${r}.com`,
        password: 'beautiful',
        state: 'Lagos',
        mob_phone: '08135539123',
        address: '10 Marina Street, Lagos'

      });


    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('accessToken');
    expect(response.statusCode).toBe(200);
  });


  test('Logs in a customer with email/password', async () => {
    const response = await request(app)
      .post('/users/login')
      .query({
        email: `${r}@${r}.com`,
        password: 'beautiful'
      });


    // eslint-disable-next-line prefer-destructuring
    accessToken = response.body.accessToken.split(' ')[1];


    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('accessToken');
    expect(response.statusCode).toBe(200);
  });

  test('Send crash report as a logged in user', async () => {
    const response = await request(app)
      .post('/users/crashreport')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        name: 'hay wire',
        number_victims: 1,
        location: 'abula ado junction',
        image: 'accident.jng',
        video: 'video.mp4',
        message: 'there was a small accident'
      });

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('accessToken');
    expect(response.statusCode).toBe(200);
  });

  test('Failed crash report as a logged in user', async () => {
    const response = await request(app)
      .post('/users/crashreport')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        name: 'hay wire',
        number_victims: 1,
        image: 'accident.jng',
        video: 'video.mp4',
        message: 'there was a small accident'
      });

    expect(response.statusCode).toBe(422);
  });

  test('Send crash report as a anon user', async () => {
    const response = await request(app)
      .post('/users/crashreportanon')
      .query({
        name: 'hay wire',
        number_victims: 1,
        password: 'beautiful',
        location: 'abula ado junction',
        image: 'accident.jng',
        video: 'video.mp4',
        message: 'there was a small accident'
      });


    expect(response.body).toHaveProperty('crashReport');

    expect(response.statusCode).toBe(200);
  });

  test('Failed crash report as a anon user', async () => {
    const response = await request(app)
      .post('/users/crashreportanon')
      .query({
        name: 'hay wire',
        number_victims: 1,
        password: 'beautiful',
        video: 'video.mp4',
        message: 'there was a small accident'
      });

    expect(response.statusCode).toBe(422);
  });

  test('Contact us with a message', async () => {
    const response = await request(app)
      .post('/users/contactus')
      .query({
        name: 'hay wire',
        email: 'frankgod02@ymail.com',
        message: 'what is this app for'
      });

    expect(response.body).toHaveProperty('contactUs');

    expect(response.statusCode).toBe(200);
  });

  it('should fail to contact us with a message', async () => {
    const response = await request(app)
      .post('/users/contactus')
      .query({
        name: 'hay wire',
        message: 'what is this app for'
      });

    expect(response.statusCode).toBe(422);
  });

  test('Send message as a logged in user', async () => {
    const response = await request(app)
      .post('/users/postMessage')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        message: 'whats up with this app yo yo'
      });

    // eslint-disable-next-line camelcase
    message_id = response.body.messages.message_id;

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('messages');
    expect(response.statusCode).toBe(200);
  });

  test('Update message as a logged in user', async () => {
    const response = await request(app)
      .put('/users/postMessage')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        message: 'whats up with this app we changing this message',
        message_id
      });


    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('messages');
    expect(response.statusCode).toBe(200);
  });

  it('should retrive all user message as a logged in user', async () => {
    const response = await request(app)
      .get('/user/message')
      .set('Authorization', `Bearer ${accessToken}`);


    expect(response.body).toHaveProperty('messages');
    expect(response.statusCode).toBe(200);
  });

  it('should get logged in user with accesstoken', async () => {
    const response = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.body).toHaveProperty('user');
    expect(response.statusCode).toBe(200);
  });

  test('It update a user', async () => {
    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        name: r,
        email: `${r}@${r}.com`,
        password: 'fine',
        state: 'London',
        mob_phone: '08135539123',
        address: '10 Marina Street, Lagos'

      });

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('accessToken');
    expect(response.statusCode).toBe(200);
  });
});
