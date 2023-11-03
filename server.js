// Imports express and the connection to the database from the config folder
const express = require('express');
const db = require('./config/connection');

// Imports the routes from the routes folder
const routes = require('./routes');

// Sets the port to be used by the server based on the environment variable PORT or 3001
const PORT = process.env.PORT || 3001;

// Creates the Express.js app and sets it up to parse incoming JSON data and string or array data
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up the express app to use the routes imported from the routes folder
app.use(routes);

// Starts the server after the database connection is established
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});