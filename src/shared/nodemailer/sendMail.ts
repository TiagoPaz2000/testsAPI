import nodemailer from 'nodemailer';
import MailConfig from '../../config/MailConfigs';

interface IMail {
  email: string;
  subject: string;
  link: string;
}

const config = new MailConfig();
const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: false,
  auth: {
    user: config.user,
    pass: config.password,
  },
  tls: { rejectUnauthorized: false },
});

const SendMail = ({ email, subject, link }: IMail): void => {
  transporter
    .sendMail({
      from: config.user,
      to: email,
      subject,
      text: `Link para realizar a Prova: ${link}`,
    })
    .then(info => console.log(info));
};

export default SendMail;
