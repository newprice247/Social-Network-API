const { Schema, model } = require('mongoose');

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
        },
        id: false
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

userSchema
    .pre('delete', async function (next) {
        await this.model('thought').deleteMany({ _id: { $in: this.thoughts } });
        next();
    })

const User = model('user', userSchema)

module.exports = User