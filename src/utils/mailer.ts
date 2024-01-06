import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";
import log from "./logger";

async function sendEmail(payload: SendMailOptions): Promise<boolean> {
  try {
    const senderEmail = config.get("senderEmail");
    const senderEmailPassword = config.get("senderEmailPassword");
    console.log("sendEmail start");
    console.log("senderEmail===========", senderEmail);
    console.log("senderEmailPassword===========", senderEmailPassword);

    // const transporter = nodemailer.createTransport(
    //   `smtp://${senderEmail}:${senderEmailPassword}@smtp-mail.outlook.com`
    // );

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      auth: {
        user: senderEmail,
        pass: senderEmailPassword,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    await transporter.sendMail(payload);
    log.info("Email sent successfully");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default sendEmail;
