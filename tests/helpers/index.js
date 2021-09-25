const chai = require('chai');
const promised = require('chai-as-promised');
const sinonChai = require('sinon-chai');

chai.use(promised);
chai.use(sinonChai);
chai.should();

module.exports = { expect: chai.expect, assert: chai.assert };
