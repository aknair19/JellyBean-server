import express from "express";
import { createUser, getAllUsers, loginUser } from "../controller/user.controller.js";

const router = express.Router();

//getAll users
router.get('/all-user',getAllUsers)

//create user
router.post('/register',createUser)


//login user

router.post('/login',loginUser)


export default router;
