const { zitatSchema } = require('./schemas');
const ZitateDAL = require('./zitateDAL');

module.exports = function (fastify, opts, next) {
  const zitateDAL = ZitateDAL(fastify.db);


  fastify.route({
    method: 'GET',
    url: '/zitate',
    schema: {
      tags: ['zitate'],
      description: 'Get all zitate',
      querystring: {
        type: 'object',
        properties: {
          'filter[body]': { type: 'string', description: 'Vector match against the body field' }
        }
      },
      response: {
        200: {
          type: 'array',
          items: zitatSchema
        }
      }
    },
    handler: async (request, reply) => {
      const vectorSearch = request.query['filter[body]'];

      return zitateDAL.getzitate(vectorSearch);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/zitate',
    schema: {
      tags: ['zitate'],
      description: 'Create a zitat',
      body: {
        type: 'object',
        required: ['title', 'body'],
        properties: {
          title: { type: 'string' },
          body: { type: 'string' },
        }
      },
      response: {
        200: zitatSchema
      }
    },
    handler: async (request, reply) => {
      const { title, body } = request.body;

      const newzitat = await zitateDAL.createzitat(title, body);

      return newzitat;
    }
  });

  fastify.route({
    method: 'PUT',
    url: '/zitate/:id',
    schema: {
      tags: ['zitate'],
      description: 'Update a zitat',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' }
        }
      },
      body: {
        type: 'object',
        required: ['title', 'body'],
        properties: {
          title: { type: 'string' },
          body: { type: 'string' },
        }
      },
      response: {
        200: zitatSchema
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const { title, body } = request.body;

      const updatedzitat = await zitateDAL.updatezitat(id, title, body);

      return updatedzitat;
    }
  });

  fastify.route({
    method: 'DELETE',
    url: '/zitate/:id',
    schema: {
      tags: ['zitate'],
      description: 'Delete a zitat - WARNING - PERMANENT',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' }
        }
      },
      response: {
        204: { type: 'string', default: 'No Content' }
      }
    },
    handler: async (request, reply) => {
      await zitateDAL.deletezitat(request.params.id);

      reply.status(204);
    }
  });

  next();
};
