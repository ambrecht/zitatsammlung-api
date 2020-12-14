const DBinteractions = (db) => {
    const insertZitat = async (title, body) => {
        const { id } = await db
            .tx((t) => {
                // creating a sequence of transaction queries:
                const q1 = t.none('UPDATE zitate SET text = $1', [body])
                const q2 = db.one(
                    'INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING id',
                    [title, body]
                )

                // returning a promise that determines a successful transaction:
                return t.batch([q1, q2]) // all of the queries are to be resolved;
            })
            .then((data) => {
                console.log(data)
                return data
            })
            .catch((error) => {
                return error
            })
    }

    return { insertZitat }
}

module.exports = DBinteractions
