const express = require("express");

const app = express();

app.use("/user", (req, res) => {
    res.send("HAHAHAHAHAHAHAHAHAH!");
});

// This will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({firstname: "Yash", lastname: "Salvi"});
});

app.post("/user", (req, res) => {
    // saving data to DB
    res.send("Data successfully saved to the database!");
});

app.delete("/user", (req, res) => {
    res.send("Deleted successfully!");
});

// This will match all http methods API call to /test
app.use("/test", (req, res) => {
    res.send("Hello from the server !");
});

app.listen(3000, () => {
    console.log("Sever is successfully listening on port 3000...");
})