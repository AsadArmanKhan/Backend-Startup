const UserModel=require("../model/userModel");

const userController = {

    create(req, res) {
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
                contact: req.body.contact,
            })
            console.log(user)
            
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
    },
    async getdata(req, res) {
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
    },
    async delete(req, res) {
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
    },
    async status(req, res) {
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
     },
    async update(req, res) { 
        try {
            const id = req.params.id;
            UserModel.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    name: req.body.name,
                    email: req.body.email,
                    contact: req.body.contact,
    
                }
            ).then(
                (response) => {
                    res.send(
                        {
                            msg: "User status updated",
                            flag: 1
                        }
                    )
                }
            ).catch(
                (error) => {
                    res.send(
                        {
                            msg: "User not updated",
                            flag: 0
                        }
                    )
                    console.log(error);
    
    
                }
            )
        } catch (error) {
            res.send({
                msg: "internal  server error",
                flag: 0
            })
    
        }
    }
}

module.exports=userController;  