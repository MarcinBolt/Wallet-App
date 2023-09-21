import passport from 'passport';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { mail as sendgrid } from 'sendgrid';
import { createUser, findUserByEmail } from '../service/user.service';
import { User } from '../service/schema/users.schema';

dotenv.config();

export const authentication = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (
            !user || error || req.headers.authorization.split(" ")[1] !== user.token
        ) {
            res.status(401).json({
                status: 'Error',
                code: 401,
                message: 'Unauthorized',
                data: 'Unauthorized',
            });
        }
        req.user = user;
        next();
    })(req, res, next);
};

export const signup = async (req, res, next) => {
    const { firstName, email, password } = req.body;
    try {
        const user = await findUserByEmail({ email });
        if (user) {
            res.status(409).json({
                status: 'Conflict',
                code: 409,
                message: `Email address ${email} is already in use`,
            });
        } else {
            const verificationToken = uuidv4();
            const newUser = createUser(email, password, firstName, verificationToken);
            const link = `${process.env.BASE_URL}/users/verify/${verificationToken}`;
            const message = {
                to: newUser.email,
                from: process.env.SENDGRID_EMAIL,
                subject: 'Email address verification',
                html: `<p>Click <a href="${link}">here</a> to verificate your email address.</p>`,
            };
            await sendgrid(message);
            res.status(201).json({
                status: 'Created',
                code: 201,
                data: {
                    user: {
                        firstName,
                        email,
                        password,
                    },
                },
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};