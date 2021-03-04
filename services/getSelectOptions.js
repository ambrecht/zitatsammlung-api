'use strict';

module.exports = async function (fastify, opts, next) {
  fastify.get('/select', getSelectOptions);

  const db = fastify.db;

  async function getSelectOptions() {
    let query = 'SELECT vorname, nachname, geburt, tod FROM autoren';

    return await db.manyOrNone(query);
  }
};
