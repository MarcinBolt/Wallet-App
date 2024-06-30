import { createTransport } from 'nodemailer';
import 'dotenv/config';

const config = {
  pool: true,
  host: process.env.NODEMAILER_SQUADKA_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_SQUADKA_AUTH_USER,
    pass: process.env.NODEMAILER_SQUADKA_AUTH_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
  },
};

const sendSquadka = async ({ name, email, message }) => {
  let body = `<div style="background-color: #F5F5F5; font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 16px; line-height: 1.5; color: #333333; margin: 0; padding: 50px;">
    <div style="text-align: center;">
        <a href="${
          process.env.SQUADKA_FRONTEND_FINAL_DEPLOY_URL
        }" style="display: inline-block; font-size: 1.5em; font-weight: bold; color: #007BFF; text-decoration: none;">Aplikacja Squadka</a>
    </div>
    <h2 style="font-size: 1.2em; margin-top: 0; margin-bottom: 0.5em;">Nowa wiadomość od: ${
      name ?? 'Client'
    }</h2>
    <h3 style="font-size: 1.2em; margin-top: 0; margin-bottom: 0.5em;">Email kontaktowy: 
        <a href="mailto:${email}" style="color: #007BFF;">${email}</a>
    </h3>
    <p style="margin-block: 0; font-size: 1.2em; color: #000;">Wiadomość:</p>   
    <p style="margin-top: 0; font-size: 1.2em; color: #000;">${message}</p>   
    <hr style="margin-top: 2em; border: 1px solid #D3D3D3;" />
    <p style="font-size: 1em; margin-top: 0;">Wiadomość wygenerowana w Aplikacji 
        <a href="${
          process.env.SQUADKA_FRONTEND_FINAL_DEPLOY_URL
        }" style="color: #007BFF; text-decoration: none;">Squadka</a>
    </p>
</div>`;

  const transporter = createTransport(config);

  const emailOptions = {
    from: {
      address: process.env.NODEMAILER_SQUADKA_FROM_MAIL,
      name: process.env.NODEMAILER_SQUADKA_FROM_NAME,
    },
    to: process.env.SQUADKA_PAGE_OWNER_EMAIL,
    subject: `Nowa wiadomość od ${name}`,
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

export default sendSquadka;
