const DBinteractions = (db) => {
    const insertZitat = async (body) => {
        const {
            id,
        } = await db.one('INSERT INTO zitate (text) VALUES ($1) RETURNING id', [
            body,
        ])

        return { id, body }
    }

    return { insertZitat }
}

module.exports = DBinteractions
