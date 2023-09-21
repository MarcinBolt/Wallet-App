import { Router } from 'express';

const userRouter = Router();

userRouter.post('/signup' /*to do createUser*/);

userRouter.post('/login' /*to do loginUser*/);

userRouter.get('/logout' /*to do auth, logoutUser*/);

userRouter.get('/current' /*to do auth, getCurrentUser*/);

userRouter.get('/verify/:verificationToken' /*to do getVerificationToken*/);

userRouter.post('/verify' /*to do verifyUser*/);

export default userRouter;
