const { User, Thought } =require("../models");

const thoughtController = {
    
    addThought({ params, body}, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then(dbThoughData => {
            if (!dbThoughData) {
                res.status(404).json ({ Message: "No ID found" });
                return;
            }
            res.json(dbThoughData);
        })
        .catch(err => res.json(err));
    },
};

module.exports = thoughtController;