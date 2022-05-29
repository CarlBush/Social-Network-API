const router = require("express").Router();

const {
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    createFriend,
    removeFriend
} = require("../../controllers/user-controller");

// /api/users
router.route("/")
.get(getAllUser)
.post(createUser);

router.route("/:id")
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router.route("/:userId/friends/:friendId")
.post(createFriend)
.delete(removeFriend);

module.exports = router;