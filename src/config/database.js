const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://yashsalvi1209:W6w649e7q7Bwwq2S@test.f9a7qo9.mongodb.net/devTinder"
    );
};

module.exports = connectDB;
