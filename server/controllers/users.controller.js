import 'dotenv/config';
import {
  createUser,
  findUserById,
  findUserByEmail,
  findUserByToken,
  updateUserDataById,
  deleteUserById,
  findUserByVerificationToken,
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

const createNewUser = async (req, res, _) => {
  try {
    const { value, error } = userRegisterReqBodySchema.validate(req.body);
    const { email, password, firstName } = value;

    if (error) {
      return res.status(400).json({ status: 'error', code: 400, message: error.message });
    }

    const normalizedFirstName = capitalizeEachWord(firstName.toLowerCase());
    const normalizedEmail = email.toLowerCase();
    const user = await findUserByEmail(normalizedEmail);

    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
        data: 'Conflict',
      });
    }

    const hashedPassword = await hashPassword(password);
    const payload = { normalizedEmail };
    const verificationToken = createToken(payload, process.env.VERIFICATION_TOKEN_EXPIRATION_TIME);

    // let verificationToken = await createEmailVerificationToken();

    const isEmailSend = await send({
      to: normalizedEmail,
      firstName: normalizedFirstName,
      verificationToken,
    });

    if (!isEmailSend) {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Server error',
      });
    }
    await createUser(normalizedEmail, hashedPassword, firstName, verificationToken);

    return res.status(201).json({
      status: 'created',
      code: 201,
      data: {
        user: {
          email: normalizedEmail,
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
    const userFromDB = await findUserByEmail(normalizedEmail);
    const isUserIdValid = userIdFromReqAuthorizedToken === userFromDB.id;
    const isPasswordValid = await validatePassword(password, userFromDB.password);

    if (!isPasswordValid || !isUserIdValid) {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Wrong email or password',
        data: 'Unauthorized',
      });
    }

    await deleteUserById(userIdFromReqAuthorizedToken);

    res.status(200).json({
      status: 'deleted',
      code: 200,
      data: {
        deletedUser: {
          email: normalizedEmail,
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

const loginUser = async (req, res, _) => {
  try {
    const { value, error } = userLoginReqBodySchema.validate(req.body);
    const { email, password } = value;

    if (error) {
      return res.status(400).json({ status: 'error', code: 400, message: error.message });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Email or password is wrong',
        data: 'Unauthorized',
      });
    }

    const isPasswordValid = await validatePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Email or password is wrong',
        data: 'Unauthorized',
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Please, verify Your email',
      });
    }

    const id = user.id;
    const payload = { id };
    const token = createToken(payload, process.env.TOKEN_EXPIRATION_TIME);
    await updateUserDataById(id, { token });

    return res.json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
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

    if (!token) {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Not authorized',
      });
    }

    const user = await findUserByToken(token);
    const id = user.id;
    token = null;

    await updateUsersDataById(id, { token });

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
    const token = req.user.token;

    if (!token) {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Not authorized',
      });
    }
    const user = await findUserByToken(token);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        currentUser: {
          email: user.email,
          subscription: user.subscription,
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

const updateUserData = async (req, res, next) => {
  try {
    const { value, error } = userRegisterReqBodySchema.validate(req.body);
    const { email, password, firstName } = value;

    if (error) {
      return res.status(400).json({ status: 'error', code: 400, message: error.message });
    }

    const id = req.user.id;

    await updateUserDataById(id, { email, password, firstName });
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

    if (!verificationToken) {
      return res.status(401).json({
        status: 'unauthorized',
        code: 401,
        message: 'Not authorized',
      });
    }

    const user = await findUserByVerificationToken(verificationToken);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `User not found.`,
      });
    }

    const id = user.id;
    verificationToken = null;

    await updateUserDataById(id, { verificationToken, isVerified: true });

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
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `User not found.`,
      });
    }

    const { verify, verificationToken, firstName } = user;

    if (verify === true) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: `Verification has already been passed.`,
      });
    }

    const isEmailSend = await send({ to: normalizedEmail, firstName, verificationToken });

    if (!isEmailSend) {
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
