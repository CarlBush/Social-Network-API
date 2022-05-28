const mongoose = require("mongoose");
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(require('./routes'));

mongoose.connect("mongodb://localhost:27017/pizza-hunt", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));