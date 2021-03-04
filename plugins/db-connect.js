const plugin = require('fastify-plugin');
const pgp = require('pg-promise')();

const dbPlugin = async (fastify, opts, done) => {
  const envVar = process.env['POSTGRES_URI'];
  const db = pgp(envVar);
  fastify.addHook(
    'onClose',
    async (instance, done) => await db.$pool.end(done),
  );
  fastify.decorate('db', db);
  done();
};
module.exports = plugin(dbPlugin);
