import 'dotenv/config';
import passport from 'passport';
import {
  createUserInDB,
  findUserByIdInDB,
  findUserByEmailInDB,
  findUserByTokenInDB,
  updateUserDataByIdInDB,
  deleteUserByIdInDB,
  findUserByVerificationTokenInDB,
} from '../service/users.service.js';
import createToken from '../utils/token.creator.js';
import send from '../config/nodemailer.config.js';
import hashPassword from '../utils/password.hasher.js';
import validatePassword from '../utils/password.validator.js';
import {
  userRegisterReqBodySchema,
  userLoginReqBodySchema,
  userEmailReqBodySchema,
} from '../utils/joi.schemas..js';
import capitalizeEachWord from '../utils/capitalizer.js';
import { capitalize } from '@mui/material';

const createNewUser = async (req, res, _) => {
  try {
    const { value, error } = userRegisterReqBodySchema.validate(req.body);
    const { email, password, firstName } = value;

    if (error) {
      return res.status(400).json({ status: 'error', code: 400, message: error.message });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await findUserByEmailInDB(normalizedEmail);

    if (user) {
      return res.status(409).json({
        status: 'conflict',
        code: 409,
        message: 'Email in use',
      });
    }

    const capitalizedFirstName = capitalizeEachWord(firstName);
    const hashedPassword = await hashPassword(password);
    const payload = { normalizedEmail };
    const verificationToken = createToken(payload, process.env.VERIFICATION_TOKEN_EXPIRATION_TIME);

    const isEmailSend = await send({
      to: normalizedEmail,
      firstName: capitalizedFirstName,
      verificationToken,
    });

    if (!isEmailSend) {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Server error',
      });
    }
    await createUserInDB(normalizedEmail, hashedPassword, capitalizedFirstName, verificationToken);

    return res.status(201).json({
      status: 'created',
      code: 201,
      message: 'User created.',
      data: {
        user: {
          email: normalizedEmail,
          firstName: capitalizedFirstName,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const deleteUser = async (req, res, _) => {
  try {
    const { value, error } = userLoginReqBodySchema.validate(req.body);
    const { email, password } = value;
    const userIdFromReqAuthorizedToken = req.user.id;

    if (error) {
      return res.status(400).json({ status: 'error', code: 400, message: error.message });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await findUserByEmailInDB(normalizedEmail);
    const isPasswordValid = await validatePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Email is wrong',
      });
    }

    await deleteUserByIdInDB(userIdFromReqAuthorizedToken);

    res.status(200).json({
      status: 'deleted',
      code: 200,
      data: {
        email: normalizedEmail,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const loginUser = async (req, res, _) => {
  try {
    const { value, error } = userLoginReqBodySchema.validate(req.body);
    const { email, password } = value;

    if (error) {
      return res.status(400).json({ status: 'error', code: 400, message: error.message });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await findUserByEmailInDB(normalizedEmail);

    if (!user) {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Email or password is wrong',
      });
    }

    const isPasswordValid = await validatePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Email or password is wrong',
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Please, verify Your email',
      });
    }

    const { id, firstName } = user;
    const capitalizedFirstName = capitalizeEachWord(firstName);
    const payload = { id };
    const token = createToken(payload, process.env.TOKEN_EXPIRATION_TIME);
    await updateUserDataByIdInDB(id, { token });

    return res.json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          firstName: capitalizedFirstName,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const logoutUser = async (req, res, _) => {
  try {
    let token = req.user.token;

    const user = await findUserByTokenInDB(token);
    const id = user.id;
    token = null;

    await updateUserDataByIdInDB(id, { token });

    return res.json({
      status: 'success',
      code: 200,
      message: 'User successfully logged out',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const getCurrentUserDataFromToken = async (req, res, _) => {
  try {
    const { email, firstName } = req.user;

    const capitalizedFirstName = capitalize(firstName);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        currentUser: {
          email,
          firstName: capitalizedFirstName,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const updateUserData = async (req, res, _) => {
  try {
    const { value, error } = userRegisterReqBodySchema.validate(req.body);
    const { email, password, firstName } = value;

    if (error) {
      return res.status(400).json({ status: 'error', code: 400, message: error.message });
    }

    const id = req.user.id;
    const capitalizedFirstName = capitalizeEachWord(firstName);
    await updateUserDataByIdInDB(id, { email, password, firstName: capitalizedFirstName });
    return res.json({
      status: 'success',
      code: 200,
      message: `User's data successfully updated.`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const verifyUserByVerificationToken = async (req, res, _) => {
  try {
    let verificationToken = req.params.verificationToken;

    const user = await findUserByVerificationTokenInDB(verificationToken);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `Invalid verification token.`,
      });
    }

    const id = user.id;
    verificationToken = null;
    
    await updateUserDataByIdInDB(id, { verificationToken, isVerified: true });

    return res.json({
      status: 'success',
      code: 200,
      message: 'Verification successful',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

const resendEmailWithVerificationToken = async (req, res, _) => {
  try {
    const { value, error } = userEmailReqBodySchema.validate(req.body);
    const { email } = value;

    if (error) {
      return res
        .status(400)
        .json({ status: 'error', code: 400, message: 'missing required field email' });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await findUserByEmailInDB(normalizedEmail);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `User not found.`,
      });
    }

    const { isVerified, verificationToken, firstName } = user;

    if (isVerified === true) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: `Verification has already been passed.`,
      });
    }

    const isEmailSent = await send({ to: normalizedEmail, firstName, verificationToken });

    if (!isEmailSent) {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Server error',
      });
    }

    res.status(200).json({
      status: 'Ok',
      code: 200,
      message: 'Verification email sent.',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
};

export {
  createNewUser,
  deleteUser,
  loginUser,
  logoutUser,
  getCurrentUserDataFromToken,
  updateUserData,
  verifyUserByVerificationToken,
  resendEmailWithVerificationToken,
};
