const { expect } = require('../../helpers');
const repository = require('../../../src/db/repositories/tickets');

describe('src/repository tickets suite', () => {
  describe('Given db is working', () => {
    it('when I create a ticket it works properly', async () => {
      const title = 'banana';
      const isCompleted = false;
      return repository.create({ title, isCompleted })
        .then(record => {
          expect(record.id).not.be.undefined;
          expect(record.title).to.be.equals(title);
          expect(record.isCompleted).to.be.equals(isCompleted);
          expect(record.parentId).to.be.undefined;
        });
    });
    it('when I list all tickets it works properly', async () => {
      const title = 'banana';
      const isCompleted = false;
      return repository.create({ title, isCompleted })
        .then(() => repository.listAll())
        .then(records => {
          expect(records).not.be.undefined;
          expect(Array.isArray(records)).to.be.true;
          expect(records[0].id).not.be.undefined;
          expect(records[0].title).not.be.undefined;
          expect(records[0].isCompleted).not.be.undefined;
        });
    });
    it('when I find a ticket it works properly', async () => {
      const title = 'batata';
      const isCompleted = false;
      return repository.create({ title, isCompleted })
        .then(() => repository.findBy({title: 'batata'}))
        .then(record => {
          expect(record).not.be.undefined;
          expect(record.id).not.be.undefined;
          expect(record.title).not.be.undefined;
          expect(record.isCompleted).not.be.undefined;
        });
    });
    it('when I find a non existent ticket it rejects with not found', async () => {
      const title = 'banana';
      const isCompleted = false;
      return repository.create({ title, isCompleted })
        .then(() => repository.findBy({id: 10000}))
        .catch(error => {
          expect(error).not.be.undefined
          expect(error.message).to.be.equal('not found!');
        });
    });
  });
});
