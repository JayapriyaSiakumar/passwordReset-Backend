// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.PASS_MAIL,
//     pass: process.env.PASS_KEY,
//   },
// });

// const sendMail = async (to, subject, text) => {
//   const mailOptions = {
//     from: process.env.PASS_MAIL,
//     to,
//     subject,
//     text,
//   };
//   return transporter.sendMail(mailOptions);
// };

// export default sendMail;

// export const sendMail = async (to, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     tls: {
//       rejectUnauthorized: false,
//     },
//     port: 465,
//     secure: false,
//     auth: {
//       user: process.env.PASS_MAIL,
//       pass: process.env.PASS_KEY,
//     },
//   });

//   const mailData = {
//     from: process.env.PASS_MAIL,
//     to,
//     subject,
//     text,
//   };
//   await new Promise((resolve, reject) => {
//     transporter.sendMail(mailData, (err, info) => {
//       if (err) {
//         reject(err);
//       } else {
//         console.log("Mail Send Successfully");
//         resolve(info);
//       }
//     });
//   });
// };
/* 
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async (to, subject, text, html) => {
  const msg = {
    to: to,
    from: {
      name: "Password Reset Flow",
      email: process.env.PASS_MAIL,
    }, // Use the email address or domain you verified above
    subject: subject,
    text: text,
    html: html,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
}; */
//sib-api-v3-sdk

//import sendEmail from "../Utils/mailer.js";

import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

// Configure Brevo client
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * sendEmail(to, subject, text)
 * same format as your old Gmail mailer
 */
const sendEmail = async (to, subject, text, html) => {
  try {
    const emailData = {
      sender: {
        name: "Jayapriya",
        email: process.env.PASS_MAIL,
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      textContent: text,
      htmlContent: html,
    };

    await tranEmailApi.sendTransacEmail(emailData);
    console.log("Email sent successfully via Brevo");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
