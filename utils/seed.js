const connection = require('../config/connection');
const Thought = require('../models/Thought.js');
const User = require('../models/User.js');

// User data to be used to populate the users collection
const users = [
    {
        "username": "sutton123",
        "email": "sutton123@email.com",
    },
    {
        "username": "sarah123",
        "email": "sarah123@email.com"
    },
    {
        "username": "fred456",
        "email": "fred456@email.com"
    },
    {
        "username": "nancy222",
        "email": "nancy222@email.com"
    },
    {
        "username": "nathan789",
        "email": "nathan789@email.com"
    }
]

// Thought data to be used to populate the thoughts collection
const thoughts = [
    {
        "thoughtText": "I love my bird",
        "username": "fred456"
    },
    {
        "thoughtText": "I love my dog",
        "username": "sutton123"
    },
    {
        "thoughtText": "I love my fish",
        "username": "nancy222"
    },
    {
        "thoughtText": "I love my rabbit",
        "username": "nathan789"
    },
    {
        "thoughtText": "I love my cat",
        "username": "sarah123"
    }
]

// Connects to the database, deletes the users and thoughts collections if they exist already, creates the users and thoughts collections, and loops through each thought and pushes the thought's _id to the appropriate user's thoughts array field
connection.once('open', async () => {
    console.log('connected');

    // Deletes the users and thoughts collections if they exist already
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    // Creates the users and thoughts collections
    await Thought.collection.insertMany(thoughts);
    await User.collection.insertMany(users);

    // Loops through each thought and pushes the thought's _id to the appropriate user's thoughts array field
    let currentThoughts = await Thought.find({}).lean();
    for (let i = 0; i < currentThoughts.length; i++) {
        await User.findOneAndUpdate( { username: currentThoughts[i].username}, { $push: { thoughts: currentThoughts[i]._id } }, { runValidators: true, new: true });
    }

    // Displays the final table for the user collection
    let finalUsers = await User.find({}).lean();
    console.table(finalUsers);
    
    // Exits the process
    process.exit(0);
});
