import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findUserByEmail, updateUsersDataById } from "../service/user.service";
import validatePassword from "../utils/password.validator";

dotenv.config();

const secret = process.env.SECRET;

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail({ email });
        if (!user || !validatePassword(password, user.password)) {
            res.status(401).json({
                status: 'Unauthorized',
                code: 401,
                message: 'Incorrect login or password',
            });
        }
        if (!user.isVerified) {
            res.status(401).json({
                status: 'Unauthorized',
                code: 401,
                message: 'The emaill address is not verified',
            });
        }
        const payload = {
            id: user.id,
        };
        const token = jsonwebtoken.sign(payload, secret, { expiresIn: '1h' });
        await updateUsersDataById(user._id, { token });
        res.status(200).json({
            status: 'Success',
            code: 200,
            data: {
                token,
                user: {
                    email: user.email,
                    password: user.password,
                },
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    };
}