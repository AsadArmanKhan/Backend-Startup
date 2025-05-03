const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const server = express();


server.use(express.json())
server.use(cors({ origin: "http://localhost:5173" }))


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
        default: null,
    },
    status: {
        type: Boolean,
        default: true,
    },


});
const UserModel = mongoose.model("User", userSchema);


server.post("/user/create", (req, res) => {

    try {
        console.log(req.body);
        if (!req.body.name || !req.body.email) {
            return res.send({
                msg: "Fill all the options",
                flag: 0
            })
        }

        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.connect,
        })

        user.save().then(() => {
            res.status(201).json({
                msg: "user created succesfully",
                flag: 1
            });
        }).catch((error) => {
            res.status(400).send({
                msg: "user not created",
                flag: 0
            })
            // console.log(error);


        })
    } catch (error) {
        res.status(500).json({
            msg: "internal server error",
            flag: 0,
        })
        console.log(error);
    }
    // console.log(user);
    // res.send("output coming perfectly");



});
server.get("/user/get-data", async (req, res) => {
    try {
        const user = await UserModel.find()

        res.send({
            msg: "User data fetched Successfully",
            flag: 1,
            users: user,
            total: user.length
        })
    } catch (error) {
        res.send({
            msg: "Internal server error",
            flag: 0,

        })

    }
});
server.delete("/user/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        if (user) {
            UserModel.deleteOne({
                _id: id
            }).then(
                () => {
                    res.send({
                        msg: "User deleted successfully",
                        flag: 1
                    })
                }).catch(
                    () => {
                        res.send({
                            msg: "User not deleted",
                            flag: 0
                        })
                        // console.log(error);

                    })
        } else {
            res.send({
                msg: "Unable to find user",
                flag: 0,
            })
        }

        // console.log(req.params.id);
        // const use = new UserModel()


    } catch (error) {
        res.send({
            msg: "Internal server error",
            flag: 0,

        })

    }
});
server.patch("/user/status/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        if (user) {
            await UserModel.updateOne(
                {
                    _id: id
                },
                {
                    $set: {
                        status: !user.status
                    }
                }
            ).then(
                () => {
                    res.send({
                        msg: "User status updated",
                        flag: 1
                    })

                }).catch(
                    () => {
                        res.send({
                            msg: "unable to update user status",
                            flag: 0
                        })
                    })
        } else {
            res.send({
                msg: "User not found",
                flag: 0
            })
        }
        // res.end("HELLO");
    } catch (error) {

        console.log(error)
        res.send({
            msg: "internal  server error",
            flag: 0
        })
    }
})


mongoose.connect("mongodb://localhost:27017/", { dbName: 'Day-03' }).then(
    () => {
        server.listen(5000, () => {
            console.log("Server is running on port no.5000");

        })
        console.log("Connected to MongoDB");

    }
).catch(() => {
    console.log("Error connecting to Mongodb", error);
})
