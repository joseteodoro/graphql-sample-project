const { expect } = require('../helpers');
const { apollo } = require('../../src/graphql/apollo');

describe('src/query tickets suite', () => {
  describe('Given graphql is working', () => {
    it('when I list all tickets it works properly', async () => {
      const result = await apollo.executeOperation({
        query: `query {
          tickets {
            id,
            title
          }
        }`,
      });
      expect(result.errors).to.be.undefined;
      expect(result.data).to.not.be.undefined;
      expect(result.data.tickets).to.not.be.undefined;
      expect(Array.isArray(result.data.tickets)).to.be.true;
      expect(result.data.tickets.slice(0, 3)).to.be.deep.equal([
        {
          id: '1',
          title: 'Foo',
        },
        {
          id: '2',
          title: 'Bar',
        },
        {
          id: '3',
          title: 'Baz',
        },
      ]);
    });
    it('when I try to find a tickets by id it works properly', async () => {
      const result = await apollo.executeOperation({
        query: `query {
          ticket (id: 1) {
            id,
            title,
            isCompleted
          }
        }`,
      });
      console.log(result.errors)
      expect(result.errors).to.be.undefined;
      expect(result.data).to.not.be.undefined;
      expect(result.data.ticket).to.not.be.undefined;
      expect(result.data).to.be.deep.equal({
        ticket: {
          id: '1',
          title: 'Foo',
          isCompleted: false,
        },
      });
    });
  });
});
