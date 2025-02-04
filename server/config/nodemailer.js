import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
   host: "smtp-relay.brevo.com",
   port: 587,
   auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
   },
   tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
   },
});

transporter.verify((error, success) => {
   if (error) {
      console.log(error);
   } else {
      console.log("Server is ready to take messages");
   }
});

export default transporter;
