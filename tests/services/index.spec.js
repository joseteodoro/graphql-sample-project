const services = require('../../src/services');
const { expect } = require('../helpers');

describe('src/services server suite', () => {
  describe('Given services exists', () => {
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
});
