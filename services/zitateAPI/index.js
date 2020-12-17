'use strict'

const { zitat: zitatSchema } = require('./schemas')
const dbInteractions = require('./service')

module.exports = function (fastify, opts, next) {
    const interaction = dbInteractions(fastify.db)

    fastify.route({
        method: 'POST',
        url: '/zitate',
        schema: {
            schema: {
                body: { $ref: 'zitat' },
            },
        },
        handler: async (request, reply) => {
            const { title, body } = request.body
            const newzitat = await interaction.insertZitat(body, title)
            return newzitat
        },
    })

    next()
}
