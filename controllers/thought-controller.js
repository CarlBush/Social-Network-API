const { User, Thought } = require("../models");

const thoughtController = {
    //GET (all Thoughts) | api/thoughts
    getAllThought(req, res) {
        Thought.find({})
            .populate({ path: "reactions", select: "-__v" })
            .select("-__v")
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.status(400).json(err);
            });
    },
    //GET (individual Thought by ID) | api/thoughts/:thoughtId
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
    // POST (create a Thought) | api/thoughts
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
                    res.status(404).json({ Message: "No Thought with that ID found" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // PUT (update a Thought) | api/thoughts/:thoughtId
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, body,
            { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No Thought with that ID found" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // DELETE (delete a Thought) | api/thoughts/:thoughtId
    deleteThought({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No Thought with that ID found." });
                    return;
                }
                res.json({ message: "Thought has been deleted." });
            })
            .catch(err => res.status(400).json(err));
    },
    // POST (create a Reaction) | api/thoughts/:thoughtId/reactions/
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true })
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
    // DELETE (delete a Reaction) | api/thoughts/:thoughtId/reactions/:reactionId
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No reaction ID found" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err)
            });
    }
};

module.exports = thoughtController;