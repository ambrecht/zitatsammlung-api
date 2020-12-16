const plugin = require('fastify-plugin')
const pgp = require('pg-promise')()
const appConfig = require('../config/appConfig')

const dbPlugin = async (fastify, opts, done) => {
    //const db = pgp(appConfig.postgresUri)
    const db = pgp(appConfig.postgresUri)
    fastify.addHook('onClose', async (instance, done) => await db.$pool.end(done))
    fastify.decorate('db', db)
    done()
}
module.exports = plugin(dbPlugin)
