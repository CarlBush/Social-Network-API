const { User, Thought } = require("../models");

const userController = {

    getAllUser(req, res) {
        User.find({})
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch( err => {
            res.status(400).json(err);
        });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({ path: "friends", select: "-__v"})
        .populate({ path: "thoughts", select: "-__v"})
        .select("-__v")
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user with that ID found."});
                return;
            }
            res.json(dbUserData);
        })
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