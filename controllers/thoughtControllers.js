const Thought = require('../models/Thought.js');
const User = require('../models/User.js');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts);
        } catch (err) {
            res.json(err)
        }
    },
    async postThought(req, res) {
        try {
            const newThought = await Thought.create(
                {
                    thoughtText: req.body.thoughtText,
                    username: req.body.username,
                }
            );
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: newThought._id } },
                { runValidators: true, new: true }
            );
            res.json(newThought);
        } catch (err) {
            res.json(err)
        }
    }
}