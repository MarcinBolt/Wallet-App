import express from 'express';
import { authentication } from '../controllers/users.js';

const usersRouter = express.Router();

usersRouter.get('/user', authentication);

export default usersRouter;
