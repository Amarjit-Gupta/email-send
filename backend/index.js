// index.js
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import 'dotenv/config';

const port = process.env.PORT || 5000;
const app = express();

console.log("PORT: ", process.env.PORT);
console.log("EMAIL: ", process.env.SMTP_EMAIL);
console.log("PASSWORD: ", process.env.SMTP_PASS);

app.use(express.json());

app.use(cors());

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
    }
});

app.post("/send", async (req, res) => {
    try {
        const { email } = req.body;
        let maioOption = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: `this email send from ${email}`,
            html: "<h3>Hello, Amarjit👋</h3>"
        }
        let data = await transporter.sendMail(maioOption);
        return res.status(200).json({ message: "email send successfully...", data });
    }
    catch (err) {
        console.log("email send error: ",err.message);
        return res.status(500).json({ message: "email not send, try again...",error:err.message });
    }
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
