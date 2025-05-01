const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address!");
            };
        }
    },
    password: {
        type: String,
        required: true,        
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password");
            };
        },
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid!");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwOVBmhdc2jcsiq5rULhg2UF06-0_2pq3-4g&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL!");
            };
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user!"
    },
    skills: {
        type: [String],
    },
},
{
    timestamps: true,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel