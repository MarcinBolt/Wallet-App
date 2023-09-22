import { Router } from 'express';
import { login, logout } from '../controllers/users.controllers';

const userRouter = Router();

userRouter.post('/signup' /*to do createUser*/);

userRouter.post('/login', login);

userRouter.get('/logout' /*to do auth*/, logout );

userRouter.get('/current' /*to do auth, getCurrentUser*/);

userRouter.get('/verify/:verificationToken' /*to do getVerificationToken*/);

userRouter.post('/verify' /*to do verifyUser*/);

export default userRouter;
