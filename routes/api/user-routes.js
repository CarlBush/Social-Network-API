const router = require("express").Router();

const {
    getAllUser,
    createUser
} = require("../../controllers/user-controller");

// /api/users
router
.route("/")
.get(getAllUser)
.post(createUser);

module.exports = router;