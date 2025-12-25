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
};
