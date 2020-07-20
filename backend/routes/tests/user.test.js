const app = require('../../server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

// Test user endpoint to get all current users
it('Returns all current users', async () => {
  const response = await request.get('/api/users');

  expect(response.status).toBe(200);
});
