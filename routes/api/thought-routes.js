const router = require("express").Router();

const {
    createThought,
    getAllThought,
    getThoughtById,
    createReaction
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/")
.post(createThought)
.get(getAllThought);

router.route("/:thoughtId")
.get(getThoughtById)

router.route("/:thoughtId/reactions")
.post(createReaction)

module.exports = router;