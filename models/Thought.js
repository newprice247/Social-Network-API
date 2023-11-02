const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'A valid thought is required',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
)

function dateFormat(createdAtVal) {
    let newDate = new Date(createdAtVal).toLocaleString();
    return newDate;
}

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;