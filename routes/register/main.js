import { Router } from "express";
import registerUser from "../../controllers/register/main.js";

const registerRouter = Router();

registerRouter.post('/', registerUser);

export default registerRouter;