import { Router } from "express";
import { validateUser } from "../../controllers/user/main.js";

const userRouter = Router();

userRouter.get('/validate/:uid', validateUser);
// userRouter.get('/token', showAUserByToken);
// userRouter.get('/:uid', showAUser);
// userRouter.get('/', showAllUsers);
// userRouter.patch('/:uid', updateAUser);
// userRouter.delete('/:uid', deleteAUser);

export default userRouter; 