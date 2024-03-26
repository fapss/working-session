/** All our database logics go here */
const db = require('../datasource/db')
const { v4 } = require('uuid')

async function create(name, email, username, password) {
    // return await db.query(`INSERT INTO customer (id, name, email, username, password) VALUES ($1, $2, $3, $4, $5)`, [id, name, email, username, password])
    return await db.query(`INSERT INTO customer (id, name, email, username, password) VALUES ('${v4()}', '${name}', '${email}', '${username}', '${password}')`)
}

async function findAll() {
    return await db.query('SELECT * FROM customer')
}

async function findOne(id) {
    return await db.query(`SELECT * FROM customer WHERE id = '${id}'`)
}

async function update(id, name, email, username, password){
    return await db.query(`UPDATE customer SET name='${name}', email='${email}', username='${username}', password='${password}' WHERE id='${id}'`)
}

async function remove(id){
    return await db.query(`DELETE FROM customer WHERE id='${id}'`)
}


module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove
};