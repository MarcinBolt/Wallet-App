import jwt from 'jsonwebtoken';
import 'dotenv/config';

const createToken = (payload, expiresIn = '1h') => jwt.sign(payload, process.env.SECRET, { expiresIn });

export default createToken;
