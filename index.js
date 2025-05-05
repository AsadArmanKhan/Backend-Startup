const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRouter = require("./router/userRouter");

const server = express();

// ✅ Apply global middlewares BEFORE routes
server.use(cors());
server.use(express.json());  // Moved above

// ✅ Routes after middleware
server.use("/user", UserRouter);

mongoose.connect("mongodb://localhost:27017/", { dbName: 'Day-03' }).then(() => {
    server.listen(5000, () => {
        console.log("Server is running on port no.5000");
    });
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to Mongodb", error);
});
