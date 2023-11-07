// Imports the Schema and model configuration objects from Mongoose
const { Schema, model } = require('mongoose');
// Imports the reactionSchema from Reaction.js to be used as a subdocument
const reactionSchema = require('./Reaction');

// Creates a ThoughtSchema using the Schema constructor
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'A valid thought is required',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => new Date(createdAtVal).toLocaleString()
        },
        username: {
            type: String,
            required: [true, 'Username is required']
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)

// Creates a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });


// Creates the Thought model using the thoughtSchema
const Thought = model('thought', thoughtSchema);

// Exports the Thought model
module.exports = Thought;