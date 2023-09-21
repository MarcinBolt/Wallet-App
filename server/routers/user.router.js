import { Router } from 'express';
import { authentication, signup } from '../controllers/users.controllers';

const userRouter = Router();

userRouter.post('/signup', signup);

userRouter.post('/login' /*to do loginUser*/);

userRouter.get('/logout', authentication, /* to do logoutUser*/);

userRouter.get('/current', authentication, /* to do getCurrentUser*/);

userRouter.get('/verify/:verificationToken' /*to do getVerificationToken*/);

userRouter.post('/verify' /*to do verifyUser*/);

export default userRouter;
