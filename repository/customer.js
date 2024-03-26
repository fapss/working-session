/** All our database logics go here */
const db = require('../datasource/db')

async function create(id, name, email, username, password) {
    return await db.query(`INSERT INTO customer (id, name, email, username, password) VALUES ($1, $2, $3, $4, $5)`, [id, name, email, username, password])
}


module.exports = create;