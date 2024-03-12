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



// Send a response to request
app.get("/", function(req, res){
    console.log("It is working!!!")
    res.send("It is working")
})



/// Server listens to event
app.listen(port, function(){
    console.log(`Server running on port: ${port}`)
})