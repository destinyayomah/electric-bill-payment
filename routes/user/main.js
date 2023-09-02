import { Router } from "express";
import { showAUser } from "../../controllers/user/main.js";

const userRouter = Router();

userRouter.get('/:uid', showAUser);

export default userRouter; 