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

const PageOwner = "Bohater Construction";

const sendBohaterCopyToClient = async ({ name, email, message }) => {

  let clientCopyBody = `<div style="background-color: #F5F5F5; font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 16px; line-height: 1.5; color: #333333; margin: 0; padding: 50px;">
    <div style="text-align: center;">
        <a href="${process.env.BOHATER_FRONTEND_FINAL_DEPLOY_URL}" style="display: inline-block; font-size: 1.5em; font-weight: bold; color: #007BFF; text-decoration: none;">${PageOwner}</a>
    </div>
    <h2 style="font-size: 1.2em; margin-top: 0; margin-bottom: 0.5em; color: #000;">Your Message:</h2>
    <p style="margin-top: 0; font-size: 1.2em; color: #000;">${message}</p>   
    <hr style="margin-top: 2em; border: 1px solid #D3D3D3;" />
    <p style="font-size: 1em; margin-top: 0;">Email generated from site 
        <a href="${process.env.BOHATER_FRONTEND_FINAL_DEPLOY_URL}" style="color: #007BFF; text-decoration: none;">${PageOwner}</a>
    </p>
    <p style="font-size: 1em; margin-top: 0;">Do you have any questions? Send me an email at: 
    <a href="mailto:${process.env.BOHATER_PAGE_OWNER_EMAIL}" style="color: #007BFF;">${process.env.BOHATER_PAGE_OWNER_EMAIL}</a>
        </p>
</div>`;

  const transporter = createTransport(config);

  const copyToClientEmailOptions = {
    from: process.env.NODEMAILER_FROM_MAIL,
    to: email,
    subject: `Copy of message sended from ${PageOwner}`,
    html: clientCopyBody,
  };

  return await transporter
    .sendMail(copyToClientEmailOptions)
    .then(info => {
      console.log(info);
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};

export default sendBohaterCopyToClient;
