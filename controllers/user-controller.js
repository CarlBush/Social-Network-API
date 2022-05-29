const { User, Thought } = require("../models");

const userController = {
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: "friends",
            select: "-_v"
        })
        .select("-_v")
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch( err => {
            res.status(400).json(err);
        });
    },
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;