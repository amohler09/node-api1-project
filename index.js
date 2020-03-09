

// Import necessary dependencies
const express = require('express');
const shortid = require('shortid');

// Define server
const server = express();

// Define users data array 
let users = [];

// Add express to the server to read data
server.use(express.json());

//  POST request to create a user
server.post('/api/users', (req, res) => {
    const userInfo = req.body;  // define what the data will be called
    userInfo.id = shortid.generate();   // generate a unique id for each new entry
        if (!users) { // check for error? 
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" }) 
        } else if ((req.body.bio === "" || req.body.bio === undefined) ||
        (req.body.name === "" || req.body.name === undefined)) { // check for empty inputs
            res.status(400).json({ errorMessage: "Please provide name and bio for the user" }) 
        } else       
            users.push(userInfo);    // push the data onto the users array
            res.status(201).json(users);  // status code to signify creation
});

//  GET request to return an array of users
server.get('/api/users', (req, res) => {
    if (!users) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    } else res.status(200).json(users);
});

//  GET request to get the user by their ID
server.get('/api/users/:id', (req, res) => {
    const userId = users.filter(user => user.id === req.params.id ? user : res.status(404).json({ message: "The user with the specified ID does not exist" }))

    res.status(200).json(userId);
});

//  DELETE request to remove the user by their ID and return the deleted user
//      /api/users/:id

//  PATCH request to update the user with the specified ID and returns modified user
//      /api/users/:id

// Define a server port
const PORT = 5000;
server.listen(PORT, () => 
    console.log(`\n** API running on http://localhost:${PORT} **\n`)
    );