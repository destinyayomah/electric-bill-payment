import { Router } from 'express';
import login from '../../controllers/login/main.js';

const loginRouter = Router();

loginRouter.post('/', login);

export default loginRouter;