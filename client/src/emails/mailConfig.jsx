import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "pfhenry8@gmail.com",
    pass: "ecdg fail ybav lhkd",
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});
