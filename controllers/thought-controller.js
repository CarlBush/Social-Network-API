const { User, Thought } = require("../models");

const thoughtController = {

    getAllThought(req, res) {
        Thought.find({})
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.status(400).json(err);
            });
    },

    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ Message: "No ID found" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No Thought with that ID found." });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id : params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true })
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: "No Thought with that ID found."});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
};

module.exports = thoughtController;