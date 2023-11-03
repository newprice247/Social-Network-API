// Imports the router package from Express.js
const router = require('express').Router();

// Imports the following functions from thoughtControllers.js for use in the routes below:
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

// Sets up route to GET all thoughts and POST new thoughts at /api/thoughts
router.route('/').get(getThoughts).post(postThought);

// Sets up route to GET a single thought, PUT to update a thought by its _id and DELETE a thought by its _id at /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// Sets up route to GET all reactions and POST a new reaction at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').get(getReactionsByThought).post(postReaction);

// Sets up route to DELETE a reaction by its _id at /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Exports the router
module.exports = router;