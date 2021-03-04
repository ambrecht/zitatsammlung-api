module.exports = function (fastify, options, next) {
    fastify.get('/select', async function (request, reply) {
        const select = await this.db.any('SELECT * FROM zitate')
        console.log(select)
    })
    next()
}
