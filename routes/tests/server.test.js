'use strict';

describe('Hapi server', function () {
    before(async function () {
        this.server = require('../../server');
        await this.server;
    });

    after(async function () {
        delete this.server;
    });

    it('"/" route should redirect to /documentation', async function () {
        const options = {method: 'GET', url: '/'},
            response = await this.server.inject(options);
        response.statusCode.should.equal(302);
        response.headers.location.should.equal('/documentation');
    });
});