const supertest = require('supertest');

const server = require('../../src/server.js');

describe('src/listing users suite', () => {
  describe('Given express server is up', () => {
    it('when I list all users should return 200', () => supertest(server.app)
      .post('/graphql')
      .send('{"query":"{\n  tickets {\n    id\n  }\n}"}')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, {
        data: {
          tickets: [],
        },
      })
    );
  });
});
