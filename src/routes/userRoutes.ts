import { Router } from "express";
import {getUsers, register, login} from "../controllers/userController"

const userRouter = Router();

userRouter.get("/",getUsers);
userRouter.post("/register",register);
userRouter.post("/login",login);

export default userRouter
