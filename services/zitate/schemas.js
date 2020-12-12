const zitatSchema = {
    type: 'object',
    required: ['id', 'body'],
    properties: {
        id: {
            type: 'number',
            description: 'Unique identifier for a specific zitat',
        },
        body: { type: 'string', description: 'Main content of the zitat' },
        created,
    },
}

module.exports = {
    zitatSchema,
}
