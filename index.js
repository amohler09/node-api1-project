

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
    users.push(userInfo);    // push the data onto the users array
    res.status(201).json(userInfo);  // status code to signify creation
});


//  GET request to return an array of users
//      /api/users

//  GET request to get the user by their ID
//      /api/users/:id

//  DELETE request to remove the user by their ID and return the deleted user
//      /api/users/:id

//  PATCH request to update the user with the specified ID and returns modified user
//      /api/users/:id

// Define a server port
const PORT = 5000;
server.listen(PORT, () => 
    console.log(`\n** API running on http://localhost:${PORT} **\n`)
    );