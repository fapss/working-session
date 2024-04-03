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
app.post('/user', async function (req, res){
    const { name, email, username, password } = req.body
    try {
        const response = await Repository.create(v4(), name, email, username, password)
        if(response?.rowCount > 0){
            return res.send({ name, email, username, password })
        }
        return res.send({ message: 'Unable to create user' });
    } catch (error) {
        console.error(error.message)
        return res.send(error.message)
    }
    // return res.send(response)
})

// retreive all records
app.get('/users', async function(req, res){
    const user = await Repository.findAll()
    return res.status(200).json({  data: user.rows })
})

// retrieve single record
app.get('/user/:id', async function(req, res){
    const { id } = req.params
    const user = await Repository.findOne(id)
    return res.status(200).json(user.rows[0])
})

// update single record
app.patch('/user/:id', async function(req, res){
    const { id } = req.params
    const { name, email, username, password } = req.body;
    try {
        const user = await Repository.findOne(id)
        if(!user.rows.length) {
            return res.send({ message: "User cannot be found"})
        }
    
        const payload = {
            name: name || user.rows[0].name,
            email: email || user.rows[0].email,
            username: username || user.rows[0].username,
            password: password || user.rows[0].password,
        }
    
        const updatedUser = await Repository.update(id, payload.name, payload.email, payload.username, payload.password)
        return res.send(updatedUser) 
    } catch (error) {
        console.log(error.message)
        return res.send('Server Error: something went wrong')
    }
})

// delete single record
app.delete('/delete/:id', function(req, res){
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