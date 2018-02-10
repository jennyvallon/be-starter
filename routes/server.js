module.exports = [
    {
        method: 'GET',
        path: '/',
        config: {
            handler: function (request, reply) {
                return reply.redirect('/documentation');
            },
            tags: ['redirect']
        }
    }
];