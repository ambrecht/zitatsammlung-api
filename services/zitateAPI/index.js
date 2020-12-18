'use strict'

const { zitat: zitatSchema } = require('./schemas')
const Interaction = require('./dbinteractions')

module.exports = async function (server, opts, next) {
    const interaction = Interaction(server.db)

    // Routes
    server.post('/test', test)
    server.post('/insert', jsonb)

    //Route Methodes
    async function test(request, reply) {
        const { title, body } = request.body
        const test = await interaction.testdb(body, title)
        return test
    }

    async function jsonb(request, reply) {
        const insertJSON = await interaction.insertJSONB(request.body)
        return insertJSON
    }
}
