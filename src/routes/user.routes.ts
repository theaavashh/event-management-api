import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import { userValidation } from "../service/zod.validation";
import { hashedPassword } from "../service/bcrypt.service";

const userRoutes=Router();

userRoutes.route("/user").post(userValidation,hashedPassword,registerUser);
userRoutes.route("/login").post(loginUser);


export default userRoutes;