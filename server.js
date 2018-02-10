let config = require('./config'),
    Hapi  = require('hapi'),
    db = require('./db'),
    Routes = require('./routes/index')(),
    server = new Hapi.Server(config.get('server'));

(async function () {
    await server.register([
        require('inert'),
        require('vision'),
        {plugin: require('hapi-swagger'), options: config.get('hapiSwagger').options}
    ]);
    server.route(Routes);

    try {
        if (!module.parent) {
            await server.start();
        } else {
            await server.initialize();
        }
        if (config.get('ENVIRONMENT') !== 'test') {
            db();
        }
        console.log(`Server running at + ${config.get('server').host} : ${config.get('server').port} / in a ${config.get('ENVIRONMENT')} environment`);

    } catch (err) {
        throw err;
    }
})();

module.exports = server;