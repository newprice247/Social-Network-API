const router = require('express').Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userControllers');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;