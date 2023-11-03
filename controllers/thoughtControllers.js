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
    },
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            // .populate('reactions')
            if (thought) {
                res.json(thought)
            } else {
                return res.json({ message: 'Sorry no thought found with that ID' })
            }
        } catch (err) {
            res.json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            // .populate('reactions')

            if (thought) {
                res.json(thought)
            } else {
                return res.json(req.params)
            }
        } catch (err) {
            res.json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId })

            if (thought) {
                res.json(thought)
            } else {
                return res.json({ message: 'Sorry no thought was found with that ID' })
            }
        } catch (err) {
            res.json(err)
        }
    }
}