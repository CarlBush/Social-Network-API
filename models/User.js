const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+\@.+\..+/]
        },
        //thoughts
        //friends (self refernce)
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

//add virtuual for friendCount