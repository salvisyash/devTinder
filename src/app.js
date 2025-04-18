const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth")

app.use("/admin", adminAuth);

app.get("/user/login", (req,res) => {
    res.send("User logged in successfully!");
});

app.get("/user", userAuth, (req,res) => {
    res.send("User data sent");
});

app.get("/admin/getAllData", (req,res) => {
    res.send("All data sent");
});

app.get("/admin/deleteUser", (req,res) => {
    res.send("Deleted user");
});

app.listen(3000, () => {
    console.log("Sever is successfully listening on port 3000...");
})