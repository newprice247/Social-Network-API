// Imports the User and Thought models
const User = require('../models/User.js');
const Thought = require('../models/Thought.js');

//Exports the following functions to be used in the userRoutes.js file
module.exports = {
    //Gets all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
            .populate('thoughts')
            res.json(users);
        } catch (err) {
            res.json(err)
        }
    },
    //Posts a new user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.json(err)
        }
    },
    //Gets a user by their ID
    async getUserById(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
                .populate('thoughts')

            if (user) {
                res.json(user)
            } else {
                return res.json({ message: 'Sorry no user found with that ID' })
            }
        } catch (err) {
            res.json(err)
        }
    },
    //Updates a user
    async updateUserById(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true}
            )

            if (user) {
                res.json(user)
            } else {
                return res.json(req.params)
            }
        } catch(err) {
            res.json(err)
        }
    },
    //Deletes a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId})

            if (user) {
                // Deletes user's Thoughts from the thoughts table
                await Thought.deleteMany({ username: user.username })
                res.json(user)
            } else {
                return res.json({ message: 'Sorry no user was found with that ID'})
            }
        } catch(err) {
            res.json(err)
        }
    },
    //Assigns a friend to a user
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.params.friendId}},
                {runValidators: true, new: true}
            )
            .populate('friends')

            if (user) {
                res.json(user)
            } else {
                return res.json({ message: "Couldn't add friend, no user was found with that ID"})
            } 
        } catch (err) {
            res.json(err)
        }
    },
    //Deletes a friend from a user's friend list
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: {friends: req.params.friendId} },
                { runValidators: true, new: true }
            )
            .populate('friends')

            if (user) {
                res.json(user)
            } else {
                return res.json({ message: "Couldn't add friend, no user was found with that ID"})
            } 
        } catch (err) {
            res.json(err)
        }
    }
}