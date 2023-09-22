import { createTransport } from 'nodemailer';
import 'dotenv/config';

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

const send = async ({ to, firstName, verificationToken }) => {
  let body = `<h2>Welcome ${firstName}!</h2>
      <p>Thank You for registration in our Wallet App.</p>
      <p>Please, click link below to verify Your email.</p>
      <p>${process.env.BACKEND_SERVER_URL}/users/verify/${verificationToken}</p>
      <p><b>Please note that for added security this link becomes invalid after ${process.env.VERIFICATION_TOKEN_EXPIRATION_TIME}.</b></p>
      <p>Best regards,</p>
      <p>Wallet App Team.</p>`;

  const transporter = createTransport(config);
  const emailOptions = {
    from: process.env.NODEMAILER_FROM_MAIL,
    to,
    subject: 'Email verification - Wallet',
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
