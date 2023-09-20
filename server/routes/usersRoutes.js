import express from 'express';
import { authentication } from '../controllers/usersControllers.js';

const usersRouter = express.Router();

usersRouter.get('/user', authentication);

export default usersRouter;
