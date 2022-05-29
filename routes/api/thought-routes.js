const router = require("express").Router();

const {
    createThought,
    getAllThought,
    getThoughtById,
    createReaction,
    deleteThought,
    updateThought,
    deleteReaction
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/")
.post(createThought)
.get(getAllThought);

//api/thoughts/thoughtId
router.route("/:id")
.get(getThoughtById)
.delete(deleteThought)
.put(updateThought)

//api/thoughts/thoughtId/reactions
router.route("/:thoughtId/reactions")
.post(createReaction)

//api/thoughts/thoughtId/reactions/reactionId
router.route("/:thoughtId/reactions/:reactionId")
.delete(deleteReaction);

module.exports = router;