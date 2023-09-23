import jwt from 'jsonwebtoken';
import 'dotenv/config';

const createToken = (payload, expiresIn) => jwt.sign(payload, process.env.SECRET, { expiresIn });

export default createToken;
