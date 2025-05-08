const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async(req, res) => {
    try{
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();
        res.send("User added successfully!")
    }
    catch(err){        
        res.status(400).send("ERROR : " + err.message);
    }
});

app.post("/login", async(req, res) => {
    try{
        const { emailId, password } = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Creditials!");
        };
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJWT(); 
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });
            res.send("Login Successful !!!");
        }
        else{
            throw new Error("Invalid Creditials!");
        };
    }
    catch(err){        
        res.status(400).send("ERROR : " + err.message);
    }
});

app.get("/profile",userAuth ,async(req, res) => {
    try{    
        const user = req.user;
        res.send(user);
    }
    catch(err){        
        res.status(400).send("ERROR : " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, (req,res) => {
    const user = req.user;
    res.send(user.firstName+" send the connection request!");
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