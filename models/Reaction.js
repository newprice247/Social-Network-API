const { Schema, Types } = require('mongoose');

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

module.exports = reactionSchema;