const sinon = require('sinon');
const { apollo } = require('../../src/graphql/apollo');
const { expect } = require('../helpers');
const repository = require('../../src/db/repositories/tickets');

describe('src/query tickets suite', () => {
  let sandbox = sinon.createSandbox();

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach(async () => {
    sandbox.restore();
  });

  describe('Given graphql is working', () => {
    it('when I list all tickets it works properly', async () => {
      const stub = sandbox.stub(repository, 'listAll').resolves([
        {
          id: 1,
          parentId: null,
          title: 'Foo',
          isCompleted: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          parentId: null,
          title: 'Bar',
          isCompleted: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          parentId: null,
          title: 'Baz',
          isCompleted: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
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
      expect(stub).to.been.calledOnce;
    });
    it('when I try to find a tickets by id it works properly', async () => {
      const stub = sandbox.stub(repository, 'findBy').resolves({
        id: 1,
        parentId: null,
        title: 'Foo',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const result = await apollo.executeOperation({
        query: `query {
          ticket (id: 1) {
            id,
            title,
            isCompleted
          }
        }`,
      });
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
      expect(stub).to.been.calledOnceWith({ id: '1' });
    });
  });
});
