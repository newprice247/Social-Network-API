// Imports the router package from Express.js
const router = require('express').Router();

// Imports the following functions from userControllers.js for use in the routes below:
const {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userControllers');

// Sets up route to GET all users and POST new users at /api/users
router.route('/').get(getUsers).post(createUser);

// Sets up route to GET a single user, PUT to update a user by its _id and DELETE a user by its _id at /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUser);

// Sets up route to POST a new friend to a user's friend list and DELETE a friend from a user's friend list at /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

// Exports the router
module.exports = router;