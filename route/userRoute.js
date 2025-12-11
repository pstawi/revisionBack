import express from "express";
import * as userController from "../controller/userController.js";
import {auth} from "../middleware/checkToken.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

router.post("/register", userController.addUser);
router.get("/users", auth, checkRole, userController.getAllUsers);
router.get("/user/:id", auth, userController.getUserById);
router.put("/user/:id", auth, userController.updateUser);
router.delete("/user/:id", auth, userController.deleteUser);
router.post("/login", userController.login);

export default router;