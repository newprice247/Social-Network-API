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
                .populate('reactions')
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
                .populate('reactions')

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
    },
    async getReactionsByThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .populate('reactions')

            if (thought) {
                res.json(thought.reactions)
            } else {
                return res.json({ message: 'Sorry no thought was found with that ID' })
            }
        } catch (err) {
            res.json(err)
        }
    },
    async postReaction(req, res) {
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            )
                .populate('reactions')

            if (newReaction) {
                res.json(newReaction)
            } else {
                return res.json({ message: 'Sorry no thought was found with that ID' })
            }
        } catch (err) {
            res.json(err)
        }
    },
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )
            .populate('reactions')

            if (reaction) {
                res.json(reaction)
            } else {
                return res.json({ message: 'Sorry no reaction was found with that ID' })
            }
        } catch (err) {
            res.json(err)
        }
    }
}