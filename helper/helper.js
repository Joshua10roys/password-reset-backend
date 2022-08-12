import { users } from '../data/data.js';
import nodemailer from 'nodemailer';


export function findUserByMailId(req_email) {
    let user = users.find(user => user.email == req_email);
    return user;
}


export function addStringToUser(user, string) {
    let index = users.findIndex(obj => obj.email == user.email);
    users[index] = { ...user, string: string }
}


export async function sendMail(emailId, token) {

    const link = `http://localhost:3000/resetPassword/${token}`

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'joshuaashvinth@gmail.com',
            pass: process.env.GMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let mailOption = {
        from: 'Password Reset <joshuaashvinth@gmail.com>',
        cc: 'joshuaashvinth@gmail.com',
        to: emailId,
        subject: "Password Reset Email",
        html: '<p>This is the mail to reset your password</p></b><a href="' + link + '">' + link + '</a>',
    }

    await transporter.sendMail(mailOption)
}


export function findUserByToken(token) {
    let user = users.find(obj => obj.string == token);
    return user;
}


export function addNewPasswordToUser(email, password) {
    let index = users.findIndex(obj => obj.email == email);
    users[index] = { email, password }
}