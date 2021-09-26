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
    it('when I update a ticket it works properly', async () => {
      const title = 'b1';
      const isCompleted = false;
      return repository.create({ title, isCompleted })
        .then(created => repository.update(created.id, { title: 'b2', parentId: created.id, isCompleted: true }))
        .then(record => {
          expect(record).not.be.undefined;
          expect(record.id).not.be.undefined;
          expect(record.title).be.equal('b2');
          expect(record.isCompleted).to.be.true;
          expect(record.parentId).not.be.undefined;
        });
    });
    it('when I delete a ticket it works properly', async () => {
      const title = 'b1';
      const isCompleted = false;
      return repository.create({ title, isCompleted })
        .then(({ id }) => repository.remove({ id }))
        .then(res => {
          expect(res).to.be.true;
        });
    });
    it('when I delete a non existent ticket does not crash', async () => {
      return repository.remove({ id: 1000000 })
        .then(res => {
          expect(res).to.be.false;
        });
    });
    it('when I update parent it works properly', async () => {
      const isCompleted = false;
      return Promise.all([
        repository.create({ title: 'parent', isCompleted }),
        repository.create({ title: 'ch0', isCompleted }),
        repository.create({ title: 'ch0', isCompleted }),
        repository.create({ title: 'ch0', isCompleted }),
      ])
        .then(records => {
          return repository.updateParent({
            parentId: records[0].id,
            childrenIds: [records[1].id, records[2].id, records[3].id],
          })
            .then(() => {
              return repository.list({ parentId: records[0].id })
                .then(children => {
                  expect(children).not.be.undefined;
                  expect(Array.isArray(children)).to.be.true;
                  expect(children[0].title).to.be.equal('ch0');
                  expect(children[1].title).to.be.equal('ch0');
                  expect(children[2].title).to.be.equal('ch0');
                });
            })
            .then(() => {
              return repository.removeParent({ id: records[1].id })
                .then(found => {
                  expect(found).not.be.undefined;
                });
            })
        });
    });
  });
});
