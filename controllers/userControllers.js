const User = require('../models/User.js');


module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.json(err)
        }
    },
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.json(err)
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})

            if (user) {
                res.json(user)
            } else {
                return res.json({ message: 'Sorry no user found with that ID' })
            }
        } catch (err) {
            res.json(err)
        }
    },
    async updateUserById(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true}
            );

            if (user) {
                res.json(user)
            } else {
                return res.json(req.params)
            }
        } catch(err) {
            res.json(err)
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete({_id: req.params.userId})

            if (user) {
                res.json(user)
            } else {
                return res.json({ message: 'Sorry no user was found with that ID'})
            }
        } catch(err) {
            res.json(err)
        }
    }
}