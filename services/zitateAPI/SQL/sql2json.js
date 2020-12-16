const fs = require('fs')

const sql = fs.readFileSync('mysql.sql').toString()
const { Parser } = require('sql-ddl-to-json-schema')

const parser = new Parser('mysql')

const options = { useRef: true }

parser.feed(sql)

const jsonSchemaDocuments = parser.feed(sql).toJsonSchemaArray(options)

console.log(typeof jsonSchemaDocuments)

const data = JSON.stringify(jsonSchemaDocuments)

fs.writeFile('schema.json', data, (err) => {
    if (err) {
        throw err
    }
    console.log('JSON data is saved.')
})
