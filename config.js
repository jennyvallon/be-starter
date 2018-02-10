const nconf = require('nconf'),
    requiredEnvVars = ['MONGOPASS', 'MONGOUSER', 'MONGOPORT', 'MONGODB', 'MONGOHOST',
        'ENVIRONMENT', 'PORT', 'HOST'],
    optionalEnvVars = [],
    envVars = [...requiredEnvVars, ...optionalEnvVars];

nconf.env(envVars);

let config = {
    default: {
        db: {
            uri: `mongodb://${nconf.get('MONGOHOST')}:${nconf.get('MONGOPORT')}/${nconf.get('MONGODB')}`,
            options: {
                useMongoClient: true,
                autoReconnect: true,
                reconnectTries: 10,
                reconnectInterval: 1000,
                keepAlive: 120,
                auth: {
                    user: `${nconf.get('MONGOUSER')}`,
                    password: `${nconf.get('MONGOPASS')}`
                }
            }
        },
        hapiSwagger: {
            options: {
                info: {
                    title: 'Test API Documentation',
                    version: require('./package').version
                }
            }
        },
        server: {
            host: `${nconf.get('HOST')}`,
            port: `${nconf.get('PORT')}`
        }
    },
    prod: {},
    local: {},
    ref: {},
    test: {}
};

nconf.overrides(envVars);

nconf.defaults(config.default);

if (nconf.get('ENVIRONMENT') !== 'test') {
    nconf.required(envVars);
}

// load the correct config based on environment
switch (nconf.get('ENVIRONMENT').toLowerCase()) {
    case 'prod':
        nconf.overrides(config.prod);
        break;
    case 'local':
        nconf.overrides(config.local);
        break;
    case 'ref':
        nconf.overrides(config.ref);
        break;
    case 'test':
        nconf.overrides(config.test);
        break;
    default:
        console.error('Invalid ENVIRONMENT variable.Shutting down');
        console.error(`ENVIRONMENT: ${nconf.get('ENVIRONMENT')}`);
        process.exit(1);
}

module.exports = nconf;