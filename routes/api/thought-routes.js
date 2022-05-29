const router = require("express").Router();

const {
    createThought,
    getAllThought,
    getThoughtById,
    createReaction,
    deleteThought,
    updateThought
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/")
.post(createThought)
.get(getAllThought);

router.route("/:id")
.get(getThoughtById)
.delete(deleteThought)
.put(updateThought)

router.route("/:thoughtId/reactions")
.post(createReaction)

module.exports = router;