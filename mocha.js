const chai = require('chai');

chai.use(require('chai-as-promised'));
chai.config.includeStack = true;

global.expect = chai.expect;
global.should = chai.should();
global.assert = chai.assert;