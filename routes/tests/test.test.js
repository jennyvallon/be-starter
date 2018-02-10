'use strict';

describe('Test routes', function () {
    before(async function () {
        this.server = require('../../server');
        await this.server;
    });

    after(async function () {
        delete this.server;
    });

    it('"/todo" should return poop', async function () {
        const options = {method: 'GET', url: '/todo'},
            response = await this.server.inject(options);
        response.statusCode.should.equal(200);
        response.payload.should.equal('poop');
    });
});