module.exports = () => {
    return [
        ...require('./test'),
        ...require('./server')
    ];
};