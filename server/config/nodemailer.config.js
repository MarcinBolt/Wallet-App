import { createTransport } from 'nodemailer';
import 'dotenv/config';
import capitalizeEachWord from '../utils/capitalizer.js';

const config = {
  pool: true,
  host: process.env.NODEMAILER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
  },
};

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:5173/#/users/verify/`
    : `${process.env.FRONTEND_DEPLOY_URL}/#/users/verify/`;

const send = async ({ to, firstName, verificationToken }) => {
  const capitalizedFirstName = capitalizeEachWord(firstName);
  let body = `<h2>Dear ${capitalizedFirstName},</h2>
      <p>Thank You for registration in our Wallet App.</p>
      <p>To confirm your email address, please click on the link below:</p>
      <h3><a href="${baseUrl}${verificationToken}" target="_blank" rel="noopener noreferrer nofollow"><strong>Link to confirm e-mail address</strong></a></h3>
      <p>Please note that the link will only be active for ${process.env.VERIFICATION_TOKEN_EXPIRATION_TIME}.</p>
      <p>If you did not register on our website, please ignore this message.</p>
      <p></p>
      <p>Best regards,</p>
      <p>Customer Support Team - Wallet App - Hi5.</p>`;

  const transporter = createTransport(config);
  const emailOptions = {
    from: process.env.NODEMAILER_FROM_MAIL,
    to,
    subject: 'E-mail verification - Wallet',
    html: body,
  };
  return await transporter
    .sendMail(emailOptions)
    .then(info => {
      console.log(info);
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};

export default send;
