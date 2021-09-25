const { expect } = require('../helpers');
const { apollo } = require('../../src/graphql/apollo');

describe('src/mutation tickets suite', () => {
  describe('Given graphql is working', () => {
    it('when I try to create a ticket it works properly', async () => {
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
    });
    it('when I try to update a ticket it works properly', async () => {
      await apollo.executeOperation({
        query: `mutation {
          createTicket (title: "nanana", isCompleted: true) {
            title,
            isCompleted
          }
        }`,
      });
      await apollo.executeOperation({
        query: `mutation {
          createTicket (title: "nanana", isCompleted: true) {
            title,
            isCompleted
          }
        }`,
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
          id: '2',
          title: 'Fz',
          isCompleted: false,
        },
      });
    });
    it('when I try to delete a ticket it works properly', async () => {
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
      const result01 = await apollo.executeOperation({
        query: `mutation {
          removeTicket (id: 5)
        }`,
      });
      expect(result01.errors).to.be.undefined;
      expect(result01.data).to.not.be.undefined;
      expect(result01.data.removeTicket).to.not.be.undefined;
      expect(result01.data).to.be.deep.equal({
        removeTicket: false,
      });
    });
    it('when I try to toggle a ticket it works properly', async () => {
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
      const result01 = await apollo.executeOperation({
        query: `mutation {
          toggleTicket (id: 1, isCompleted: false) {
            id,
            title,
            isCompleted
          }
        }`,
      });
      expect(result01.errors).to.be.undefined;
      expect(result01.data).to.not.be.undefined;
      expect(result01.data.toggleTicket).to.not.be.undefined;
      expect(result01.data).to.be.deep.equal({
        toggleTicket: {
          id: '1',
          title: 'Foo',
          isCompleted: false,
        },
      });
    });
  });
});
