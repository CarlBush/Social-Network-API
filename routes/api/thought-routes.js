const router = require("express").Router();

const {
    addThought
} = require("../../controllers/thought-controller");

// /api/users
router
.route("/")
.post(addThought);

module.exports = router;