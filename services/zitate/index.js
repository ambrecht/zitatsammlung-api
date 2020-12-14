const zitatSchema = require('./schema')
const dbInteractions = require('./dbInteractions')

module.exports = function (fastify, opts, next) {
    const interaction = dbInteractions(fastify.db)

    fastify.route({
        method: 'POST',
        url: '/zitate',
        schema: {
            tags: ['zitate'],
            description: 'Create a zitat',
            body: {
                type: 'object',
                required: ['body'],
                properties: {
                    body: { type: 'string' },
                },
            },
            response: {
                200: zitatSchema,
            },
        },
        handler: async (request, reply) => {
            reply.sent = true
            reply.res.setHeader('Content-Type', 'application/json')
            const { title, body } = request.body
            const newzitat = await interaction.insertZitat(body, title)
            reply.res.end()
            return newzitat
        },
    })

    next()
}
