// Import express
const express = require("express")
const db = require('./datasource/db')
// const { uuid } = require('uuidv4');
const { v4 } = require('uuid')
const Repository = require('./repository/customer')
// Instantiate the express server
const app = express()

// Set server port
const port = 5000

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// db connection
db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
   });



// create record
app.post('/create', async function (req, res){

    const { name, email, username, password } = req.body
    const response = await Repository.create(name, email, username, password)
    // return res.send(response)
    return res.status(201).send(response)
})

// retreive all records
app.get('/fetch', async function(req, res){
    const response = await Repository.findAll()
    return res.send(response)
})

// retrieve single record
app.get('/fetch/:id', async function(req, res){
    const { id }= req.params
    const response = await Repository.findOne(id)
    return res.send(response)
})

// update single record
app.patch('/update/:id', async function(req, res){
    const { name, email, username, password } = req.body
    const {id} = req.params
    const response = await Repository.update(id, name, email, username, password)
    return res.send(response)
})

// delete single record
app.delete('/delete/:id', async function(req, res){
    const { id } = req.params
    const response = await Repository.remove(id)
    return res.send(response)
    
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