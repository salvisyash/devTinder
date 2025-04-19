const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async(req, res) => {
    const user = new User({
        firstName: "Viha",
        lastName: "Padad",
        emailId: "viha.padad1122@gmail.com",
        password: "viha@123"
    })

    try{
        await user.save();
        res.send("User added successfully!")
    }
    catch(err){        
        res.status(400).send("Error while saving User : " + err.message);
    }
});

connectDB()
    .then(() => {
        console.log("Database connection establised....");
        app.listen(3000, () => {
            console.log("Sever is successfully listening on port 3000...");
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected!!");
    })