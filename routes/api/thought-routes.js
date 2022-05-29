const router = require("express").Router();

const {
    createThought,
    getAllThought
} = require("../../controllers/thought-controller");

// /api/users
router
.route("/")
.post(createThought)
.get(getAllThought);

module.exports = router;