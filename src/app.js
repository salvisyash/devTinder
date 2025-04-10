const express = require("express");

const app = express();

app.use("/user", (req, res) => {
    console.log(req.query)
    res.send({firstname: "Yash", lastname: "Salvi"});
});

app.listen(3000, () => {
    console.log("Sever is successfully listening on port 3000...");
})