let Mongoose = require('mongoose'),
    config = require('./config');

module.exports = () => {

    Mongoose.connect(config.get('db').uri, config.get('db').options, function (err) {
        if (err) {
            console.log('mongoose error', err);
        }
    });

    Mongoose.connection.on('connected', function () {
        console.log(`Mongoose default connection open to ${config.get('db').uri}`);
    });

    Mongoose.connection.on('error', function (err) {
        console.log(`Mongoose default connection error: ${err}`);
    });

    Mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    Mongoose.connection.on('reconnectFailed', function () {
        console.log('Mongoose reconnect on default connection failed');
        process.exit(1);
    });

    Mongoose.connection.on('reconnect', function () {
        console.log('Mongoose reconnected');
        process.exit(1);
    });

    process.on('SIGINT', function () {
        Mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};