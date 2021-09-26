const sinon = require('sinon');
const repository = require('../../src/db/repositories/tickets');
const services = require('../../src/services');
const { expect } = require('../helpers');

describe('src/services server suite', () => {
  describe('When filling children', () => {
    it('when I pass empty array, nothing changes', async () => {
      return services.fillChildren([])
        .then(res => {
          expect(res).to.be.deep.equal([]);
        });
    });
    it('when I pass empty object, nothing changes', async () => {
      return services.fillChildren({})
        .then(res => {
          expect(res).to.be.deep.equal({});
        });
    });
    it('when I pass an object with id, fill children', async () => {
      return services.fillChildren({ id: 1 })
        .then(res => {
          expect(res).to.be.deep.equal({ id: 1, children: [] });
        });
    });
    it('when I pass an array with objects with id, fill children', async () => {
      return services.fillChildren([{ id: 1 }, { id: 2 }, { id: 3 }])
        .then(res => {
          expect(res).to.be.deep.equal([
            { id: 1, children: [] },
            { id: 2, children: [] },
            { id: 3, children: [] },
          ]);
        });
    });
  });
  describe('When filling all children', () => {
    let sandbox = sinon.createSandbox();

    beforeEach(async () => {
      sandbox = sinon.createSandbox();
    });

    afterEach(async () => {
      sandbox.restore();
    });

    it('when I pass parents array, populates properly', async () => {
      const children = [
        {
          id: 3,
          parentId: 1,
          title: '1-3',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          parentId: 1,
          title: '1-4',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          parentId: 4,
          title: '1-4-5',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          parentId: 2,
          title: '2-6',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          parentId: 5,
          title: '1-4-5-7',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const parents = [
        {
          id: 100,
          parentId: null,
          title: '100',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1,
          parentId: null,
          title: '1',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          parentId: null,
          title: '2',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const stub = sandbox.stub(repository, 'listAllChildren').resolves(children);
      return services.populateAllChildren(parents)
        .then(populated => {
          expect(stub).to.have.been.calledOnce;
          expect(populated).not.be.undefined;
          expect(Array.isArray(populated)).to.be.true;
          expect(populated.length).to.be.equal(3);
          expect(populated[0].id).to.be.equal(100);
          expect(populated[0].children).to.not.be.undefined;
          expect(populated[0].children.length).to.be.equal(0);
          expect(populated[1].id).to.be.equal(1);
          expect(populated[1].children).to.not.be.undefined;
          expect(populated[1].children.length).to.be.equal(2);
          expect(populated[2].id).to.be.equal(2);
          expect(populated[2].children).to.not.be.undefined;
          expect(populated[2].children.length).to.be.equal(1);
        });
    });
    it('when I pass a parent, populates properly', async () => {
      const children = [
        {
          id: 3,
          parentId: 100,
          title: '100-3',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          parentId: 100,
          title: '100-4',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          parentId: 4,
          title: '100-4-5',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          parentId: 5,
          title: '100-4-5-7',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const parent = {
        id: 100,
        parentId: null,
        title: '100',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const stub = sandbox.stub(repository, 'listAllChildren').resolves(children);
      return services.populateAllChildren(parent)
        .then(populated => {
          expect(stub).to.have.been.calledOnce;
          expect(populated).not.be.undefined;
          expect(Array.isArray(populated)).to.be.false;
          expect(populated.id).to.be.equal(100);
          expect(populated.children).to.not.be.undefined;
          expect(populated.children.length).to.be.equal(2);
        });
    });
  });
});
