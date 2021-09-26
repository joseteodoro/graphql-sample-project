const sinon = require('sinon');
const { apollo } = require('../../src/graphql/apollo');
const { expect } = require('../helpers');
const repository = require('../../src/db/repositories/tickets');

describe('src/mutation tickets suite', () => {
  let sandbox = sinon.createSandbox();

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach(async () => {
    sandbox.restore();
  });

  describe('Given graphql is working', () => {
    it('when I try to create a ticket it works properly', async () => {
      const stub = sandbox.stub(repository, 'create').resolves({
        id: 1,
        parentId: null,
        title: 'banana',
        isCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const result = await apollo.executeOperation({
        query: `mutation {
          createTicket (title: "banana", isCompleted: true) {
            title,
            isCompleted
          }
        }`,
      });
      expect(result.errors).to.be.undefined;
      expect(result.data).to.not.be.undefined;
      expect(result.data.createTicket).to.not.be.undefined;
      expect(result.data).to.be.deep.equal({
        createTicket: {
          title: 'banana',
          isCompleted: true,
        },
      });
      expect(stub).to.been.calledOnceWith({ title: 'banana', isCompleted: true });
    });
    it('when I try to update a ticket it works properly', async () => {
      const stub = sandbox.stub(repository, 'update').resolves({
        id: 4,
        parentId: null,
        title: 'Fz',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const result = await apollo.executeOperation({
        query: `mutation {
          updateTicket (id: 4, title: "Fz") {
            id,
            title,
            isCompleted
          }
        }`,
      });
      expect(result.errors).to.be.undefined;
      expect(result.data).to.not.be.undefined;
      expect(result.data.updateTicket).to.not.be.undefined;
      expect(result.data).to.be.deep.equal({
        updateTicket: {
          id: '4',
          title: 'Fz',
          isCompleted: false,
        },
      });
      expect(stub).to.been.calledOnceWith('4', { title: 'Fz' });
    });
    it('when I try to delete a ticket it works properly', async () => {
      const stub = sandbox.stub(repository, 'remove').resolves(true);
      const result = await apollo.executeOperation({
        query: `mutation {
          removeTicket (id: 4)
        }`,
      });
      expect(result.errors).to.be.undefined;
      expect(result.data).to.not.be.undefined;
      expect(result.data.removeTicket).to.not.be.undefined;
      expect(result.data).to.be.deep.equal({
        removeTicket: true,
      });
      expect(stub).to.been.calledOnceWith({ id: '4' });
    });
    it('when I try to delete a ticket and got not found, returns false', async () => {
      const stub = sandbox.stub(repository, 'remove').resolves(false);
      const result = await apollo.executeOperation({
        query: `mutation {
          removeTicket (id: 1)
        }`,
      });
      expect(result.errors).to.be.undefined;
      expect(result.data).to.not.be.undefined;
      expect(result.data.removeTicket).to.not.be.undefined;
      expect(result.data).to.be.deep.equal({
        removeTicket: false,
      });
      expect(stub).to.been.calledOnceWith({ id: '1' });
    });
    it('when I try to toggle a ticket it works properly', async () => {
      const stub = sandbox.stub(repository, 'update').resolves({
        id: 1,
        parentId: null,
        title: 'Foo',
        isCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const result = await apollo.executeOperation({
        query: `mutation {
          toggleTicket (id: 1, isCompleted: true) {
            id,
            title,
            isCompleted
          }
        }`,
      });
      expect(result.errors).to.be.undefined;
      expect(result.data).to.not.be.undefined;
      expect(result.data.toggleTicket).to.not.be.undefined;
      expect(result.data).to.be.deep.equal({
        toggleTicket: {
          id: '1',
          title: 'Foo',
          isCompleted: true,
        },
      });
      expect(stub).to.been.calledOnceWith('1');
    });
    it('when I try to set parent for a ticket it works properly', async () => {
      const stub = sandbox.stub(repository, 'update').resolves({
        id: 2,
        parentId: null,
        title: 'Fz',
        isCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const result = await apollo.executeOperation({
        query: `mutation {
          setParentOfTicket (parentId: 1, childId: 2) {
            id
          }
        }`,
      });
      expect(result.errors).to.be.undefined;
      expect(result.data).to.not.be.undefined;
      expect(result.data.setParentOfTicket).to.not.be.undefined;
      expect(result.data).to.be.deep.equal({
        setParentOfTicket: {
          id: '2',
        },
      });
      expect(stub).to.been.calledOnceWith('2', { parentId: '1' });
    });
    it('when I try to remove a parent for a ticket it works properly', async () => {
      const stub = sandbox.stub(repository, 'update').resolves({
        id: 2,
        parentId: null,
        title: 'Fz',
        isCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const result = await apollo.executeOperation({
        query: `mutation {
          removeParentFromTicket (id: 1) {
            id
          }
        }`,
      });
      expect(result.errors).to.be.undefined;
      expect(result.data).to.not.be.undefined;
      expect(result.data.removeParentFromTicket).to.not.be.undefined;
      expect(result.data).to.be.deep.equal({
        removeParentFromTicket: {
          id: '1',
        },
      });
      expect(stub).to.been.calledOnceWith('1');
    });
  });
});
