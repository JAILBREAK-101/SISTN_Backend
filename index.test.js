const request = require('supertest');
const app = require('./server'); 

describe('Authentication API', () => {
  it('should return 200 on the base auth route', async () => {
    const res = await request(app).get('/api/auth');
    expect(res.statusCode).toBe(200);
  });
});
