import nodemailer from 'nodemailer';
import { envs } from './envs';

interface attachments {
  filename: string,
  path: string
}

interface MailOptions {
  to: string,
  subject: string,
  text: string,
  html?: string,
  attachments?: attachments[]
};

interface SuccesEmail {
  email: string
};


export class EmailAdapter {


  // private transporter =  nodemailer.createTransport({
  //   host: envs.SMTP_SERVER,
  //   port: envs.OUTGOING_PORT,
  //   secure: false,
  //   auth: {
  //     user: envs.OUTGOING_EMAIL,
  //     pass: envs.EMAIL_PASSWORD
  //   }
  // });

  private transporter =  nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  });


  async sendEmail(options: MailOptions): Promise<SuccesEmail> {

    const {
      to,
      subject,
      text,
      html,
      attachments
    } = options;

    const mailOptions: nodemailer.SendMailOptions=  {
      from: envs.OUTGOING_EMAIL,
      to: to,
      subject: subject,
      text: text
    }

    if (attachments) {
      mailOptions.attachments = attachments;
    }

    if (html) {
      mailOptions.html = html;
    }

    try {
     await this.transporter.sendMail(mailOptions);
      return {
        email: to
      }

    } catch(error) {
      console.error(`Error sending email to ${to}`, error);
      throw error;
    }



  }


  
}