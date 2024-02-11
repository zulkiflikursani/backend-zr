import express from "express";
import { Login, Logout, getUsers, register } from "../controller/users.js";
import { verifyToken } from "../midleware/verufyToken.js";
const router = express.Router();

router.get("/", verifyToken, getUsers);
router.post("/", register);
router.post("/login", Login);
router.delete("/logout", Logout);

export default router;
