const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello from the server !");
});

app.use("/hello", (req, res) => {
    res.send("Hello Hello Hello !");
});

app.use("/", (req, res) => {
    res.send("Namaste dashboard !");
});
app.listen(3000, () => {
    console.log("Sever is successfully listening on port 3000...");
})