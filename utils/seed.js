const connection = require('../config/connection');
const Thought = require('../models/Thought.js');
const User = require('../models/User.js');


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

connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        console.table(userCheck.length);
        await connection.dropCollection('users');

    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    await Thought.collection.insertMany(thoughts);
    await User.collection.insertMany(users);
    let currentThoughts = await Thought.find({}).lean();
    let currentUsers = await User.find({}).lean();

    // The following code will loop through the thoughts array and add the thought id to the user's thoughts array field
    for (let i = 0; i < currentThoughts.length; i++) {
        await User.findOneAndUpdate( { username: currentThoughts[i].username}, { $push: { thoughts: currentThoughts[i]._id } }, { runValidators: true, new: true });
    }

    let finalUsers = await User.find({}).lean();

    console.table(finalUsers);
    process.exit(0);
});
