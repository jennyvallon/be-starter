module.exports = [
    {
        method: 'GET',
        path: '/todo',
        config: {
            handler: function (request, reply) {
                return reply.response('poop');
            },
            description: 'Get popo',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api', 'poop']
        }
    }
];