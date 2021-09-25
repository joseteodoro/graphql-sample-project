const supertest = require('supertest');
const server = require('../../src/server.js');

describe('src/index express server suite', () => {
  describe('Given express server is up', () => {
    it('when I call /health should return 200', () => supertest(server.app)
      .get('/health')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, { status: 'up' })
    );
    it('when I call and non existent endpoint should return 404', () => supertest(server.app)
      .get('/banana')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404)
    );
    it('when I call and graphql endpoint should return 405, but not 404', () => supertest(server.app)
      .head('/graphql')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(405)
    );
  });
});
