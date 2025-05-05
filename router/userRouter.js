const express = require("express");
const UserRouter = express.Router();
const userController = require("../controller/userController")

UserRouter.post("/create", userController.create);
UserRouter.get("/get-data", userController.getdata);
UserRouter.delete("/delete/:id", userController.delete);
UserRouter.patch("/status/:id", userController.status);
UserRouter.put("/update/:id", userController.update);

module.exports = UserRouter;