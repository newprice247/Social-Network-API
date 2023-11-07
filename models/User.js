// Imports the Schema and model configuration objects from Mongoose
const { Schema, model } = require('mongoose');
const Thought = require('./Thought.js');

// Creates a UserSchema using the Schema constructor
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Username is required'],
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            match: [/^.+@.+\..+$/, 'Please enter a valid e-mail address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Creates a virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });


// Creates the User model using the userSchema
const User = model('user', userSchema)

// Exports the User model
module.exports = User