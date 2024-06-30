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

const sendBohater = async ({ name, email, message }) => {

  let body = 
`<div style="background-color: #F5F5F5; font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 16px; line-height: 1.5; color: #333333; margin: 0; padding: 50px;">
    <div style="text-align: center;">
        <a href="${process.env.BOHATER_FRONTEND_FINAL_DEPLOY_URL}" style="display: inline-block; font-size: 1.5em; font-weight: bold; color: #007BFF; text-decoration: none;">Bohater Construction</a>
    </div>
    <h2 style="font-size: 1.2em; margin-top: 0; margin-bottom: 0.5em;">A new message from: ${name ?? 'Client'}</h2>
    <h3 style="font-size: 1.2em; margin-top: 0; margin-bottom: 0.5em;">Contact email address: 
        <a href="mailto:${email}" style="color: #007BFF;">${email}</a>
    </h3>
    <p style="margin-block: 0; font-size: 1.2em; color: #000;">Message:</p>   
    <p style="margin-top: 0; font-size: 1.2em; color: #000;">${message}</p>   
    <hr style="margin-top: 2em; border: 1px solid #D3D3D3;" />
    <p style="font-size: 1em; margin-top: 0;">Email generated from site 
        <a href="${process.env.BOHATER_FRONTEND_FINAL_DEPLOY_URL}" style="color: #007BFF; text-decoration: none;">Bohater Construction</a>
    </p>
</div>`;

  const transporter = createTransport(config);

  const emailOptions = {
    from: process.env.NODEMAILER_FROM_MAIL,
    to: process.env.BOHATER_PAGE_OWNER_EMAIL,
    subject: `New message from ${name}`,
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

export default sendBohater;
