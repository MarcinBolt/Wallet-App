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
  let body = `<div style="background-color: #F5F5F5; font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 16px; line-height: 1.5; color: #333333; margin: 0; padding: 50px;">
      <div style="text-align: center;"><a href="${process.env.FRONTEND_DEPLOY_URL}" style="display: inline-block; font-size: 3em; font-weight: bold; color: #007BFF; text-decoration: none;">Wallet App</a></div>
      <h2 style="font-size: 1.5em; margin-top: 0; margin-bottom: 0.5em;">Dear ${capitalizedFirstName ?? 'User'},</h2>
      <p style="margin-top: 0;">Thank you for registering in our <a href="${process.env.FRONTEND_DEPLOY_URL}" style="color: #007BFF; text-decoration: none;">Wallet App</a>.</p>
      <div style="text-align: center; margin-top: 2em;"><a href="${baseUrl}${verificationToken}" style="display: inline-block; padding: 1em 2em; font-size: 1em; font-weight: bold; color: #FFFFFF; text-decoration: none; background-color: #007BFF; border: none; border-radius: 0.5em; cursor: pointer;">Confirm your e-mail</a></div>
      <p style="margin-top: 1em;">Please note that the link will only be active for ${process.env.VERIFICATION_TOKEN_EXPIRATION_TIME}.</p>
      <p style="margin-top: 1em;">If you did not register on our website, please ignore this message.</p> 
      <p style="margin-top: 1em;">If you have any questions or need assistance, please write us an email to <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #007BFF; text-decoration: none;">${process.env.SUPPORT_EMAIL}</a>.</p>
      <hr style="margin-top: 2em; border: 1px solid #D3D3D3;" />
      <p style="font-size: 0.8em; margin-top: 0;">Best regards,</p>
      <p style="font-size: 0.8em; margin-top: 0;">The Customer Support Team</p>
    </div>`;

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
