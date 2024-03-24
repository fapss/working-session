// Import express
const express = require("express")
const db = require('./db')
// const { uuid } = require('uuidv4');
const { v4 } = require('uuid')
// Instantiate the express server
const app = express()

// Set server port
const port = 5000

// db connection
db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
   });



// create record
app.post('/create', function (req, res){
    db.query(`INSERT INTO customer (id, name, email, username, password) VALUES ('${v4()}', 'segun', 'segun@gmail.com', 'altruist', 'altruist@1')`, function(err, data){
        if(err){
            console.log(err)
        } else {
            console.log(data)
        }
    })
})

// retreive all records
app.get('/fetch', function(req, res){

    db.query('SELECT * FROM customer', function(err, data){
        if(err){
            console.log(err)
        } else {
            return res.send(data.rows);
        }
    })
})

// retrieve single record
app.get('/single/:id', function(req, res){
    const id = req.params.id
    db.query(`SELECT * FROM customer WHERE id = '${id}'`, function(err, data){
        if(err){
            console.log(err)
        } else {
            return res.send(data.rows[0])
        }
    })
})

// update single record
app.patch('/update/:id', function(req, res){
    const id = req.params.id
    db.query(`UPDATE customer SET email = 'altruist@gmail.com' WHERE id = '${id}'`, function(err, data){
        if(err){
            console.log(err)
        } else {
            return res.send(data)
        }
    })
})

// delete single record
app.delete('/delete/:id', function(req, res){
    const id = req.params.id
    db.query(`DELETE FROM customer WHERE id = '${id}'`, function(err, data){
        if(err){
            console.log(err)
        } else {
            return res.send(data)
        }
    })
})



// Send a response to request
app.get("/", function(req, res){
    console.log("It is working!!!")
    res.send("It is working")
})


/// Server listens to event
app.listen(port, function(){
    console.log(`Server running on port: ${port}`)
})