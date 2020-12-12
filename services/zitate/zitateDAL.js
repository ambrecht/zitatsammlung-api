const ZitateDAL = (db) => {
    const createZitat = async (title, body) => {
        const {
            id,
        } = await db.one(
            'INSERT INTO zitate (title, body) VALUES ($1, $2) RETURNING id',
            [title, body]
        )

        return { id, title, body }
    }

    const getZitate = (vectorSearch) => {
        const queryArgs = []
        let query = 'SELECT id, title, body FROM zitate'

        if (vectorSearch) {
            queryArgs.push(`${vectorSearch}:*`)
            query += ' WHERE body_vector @@ to_tsquery($1) LIMIT 10'
        }

        return db.manyOrNone(query, queryArgs)
    }

    const updateZitat = async (id, title, body) => {
        await db.one(
            'UPDATE zitate SET title = $1, body = $2 WHERE id = $3 RETURNING id',
            [title, body, id]
        )

        return { id, title, body }
    }

    const deleteZitat = (id) => {
        return db.query('DELETE FROM zitate WHERE id = $1', [id])
    }

    return { createZitat, getZitate, updateZitat, deleteZitat }
}

module.exports = ZitateDAL
