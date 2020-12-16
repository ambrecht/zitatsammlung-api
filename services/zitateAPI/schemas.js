const fastifyPlugin = require('fastify-plugin')
const zitatSchema = {
    $id: 'http://example.com/common.json',
    type: 'object',
    properties: {
        hello: { type: 'string' },
    },
}

function createSchemas(fastify, opts, done) {
    fastify.addSchema(zitatSchema)
    done()
}
module.exports = fastifyPlugin(createSchemas)
