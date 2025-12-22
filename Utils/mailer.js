import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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

export const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    tls: {
      rejectUnauthorized: false,
    },
    port: 587,
    secure: true,
    auth: {
      user: process.env.PASS_MAIL,
      pass: process.env.PASS_KEY,
    },
  });

  const mailData = {
    from: process.env.PASS_MAIL,
    to,
    subject,
    text,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        reject(err);
      } else {
        console.log("Mail Send Successfully");
        resolve(info);
      }
    });
  });
};
