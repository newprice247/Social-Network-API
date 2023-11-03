const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

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

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

thoughtSchema
    .pre('delete', async function (next) {
        await this.model('reactions').deleteMany({ _id: { $in: this.reactions } });
        next();
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;