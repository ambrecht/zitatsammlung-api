const plugin = require('fastify-plugin')

const DBinteractions = (db) => {
    const insertZitat = async () => {
        const id = await db
            .tx((t) => {
                const queries = [
                    t.none('DROP TABLE notes;'),
                    t.none('CREATE TABLE notes(id SERIAL NOT NULL, name TEXT NOT NULL)'),
                ]
                for (let i = 1; i <= 100; i++) {
                    queries.push(t.none('INSERT INTO notes(name) VALUES($1)', 'name-' + i))
                }
                queries.push(
                    t.tx((t1) => {
                        return t1.tx((t2) => {
                            return t2.one('SELECT COUNT(*) FROM notes')
                        })
                    })
                )
                return t.batch(queries)
            })
            .then((data) => {
                console.log({ ...data })
            })
            .catch((error) => {
                console.log(error)
            })
        return { id }
    }
    return { insertZitat }
}

module.exports = plugin(DBinteractions)
