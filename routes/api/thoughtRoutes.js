const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    postThought,
    updateThought,
    deleteThought,
    getReactionsByThought,
    postReaction,
    deleteReaction
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThoughts).post(postThought);

// router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// router.route('/:thoughtId/reactions').get(getReactionsByThought).post(postReaction);

// router.route('/thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;