import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/signup' /*to do createUser*/);

usersRouter.post('/login' /*to do loginUser*/);

usersRouter.get('/logout' /*to do auth, logoutUser*/);

usersRouter.get('/current' /*to do auth, getCurrentUser*/);

usersRouter.get('/verify/:verificationToken' /*to do getVerificationToken*/);

usersRouter.post('/verify' /*to do verifyUser*/);

export default usersRouter;
