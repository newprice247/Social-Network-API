// Imports the Schema and Types configuration objects from Mongoose
const { Schema, Types } = require('mongoose');
// Creates a ReactionSchema using the Schema constructor
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: [true, 'Reaction is required`'],
            maxLength: 280
        },
        username: {
            type: String,
            required: [true, 'Username is required']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => new Date(createdAtVal).toLocaleString()
        }
    }
);
// Exports the ReactionSchema
module.exports = reactionSchema;