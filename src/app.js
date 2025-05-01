const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json())

app.post("/signup", async(req, res) => {
    const user = new User(req.body)

    try{
        await user.save();
        res.send("User added successfully!")
    }
    catch(err){        
        res.status(400).send("Error while saving User : " + err.message);
    }
});

app.get("/user", async(req, res) => {
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId: userEmail});
        if (users.length === 0){
            res.status(404).send("User not found");            
        } else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong!");
    }
});

app.get("/feed", async(req, res) => {
    try{
        const users = await User.find({});
        if (users.length === 0){
            res.status(404).send("Users not found");            
        } else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong!");
    }
});

app.delete("/user", async(req, res) => {
    const userId = req.body.userId;
    try{
        // const user = await User.findByIdAndDelete({ _id: userId});
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully!");    
    }
    catch(err){
        res.status(400).send("Something went wrong!");
    }
});

app.patch("/user", async(req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try{
        
        const ALLOWED_UPDATE = ["userId", "photoUrl", "about", "gender", "age" ,"skills"];

        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATE.includes(k)
        );

        if(data?.skills.length > 10){
            throw new Error("Skills cannot be more than 10");
        };

        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        };

        const user = await User.findByIdAndUpdate({ _id: userId}, data, {
            returnDocument: "after",
            runValidators: true,
        });
        // console.log(user);
        res.send("User updated successfully!");    
    }
    catch(err){
        res.status(400).send("Update failed : " + err.message);
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