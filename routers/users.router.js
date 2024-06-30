import { Router } from 'express';
import {
  sendEmailForSquadka,
  sendEmailForBohater,
  createNewUser,
  deleteUser,
  loginUser,
  logoutUser,
  getCurrentUserDataFromToken,
  updateUserData,
  verifyUserByVerificationToken,
  resendEmailWithVerificationToken,
} from '../controllers/users.controller.js';
import auth from '../utils/user.auth.js';

const usersRouter = Router();

usersRouter.post('/squadka-send-email', sendEmailForSquadka);

usersRouter.post('/bohater-send-email', sendEmailForBohater);

usersRouter.post('/signup', createNewUser);

usersRouter.post('/login', loginUser);

usersRouter.get('/logout', auth, logoutUser);

usersRouter.get('/current', auth, getCurrentUserDataFromToken);

usersRouter.get('/verify/:verificationToken', verifyUserByVerificationToken);

usersRouter.post('/verify', resendEmailWithVerificationToken);

usersRouter.delete('/delete', auth, deleteUser);

usersRouter.put('/', auth, updateUserData);

export default usersRouter;
