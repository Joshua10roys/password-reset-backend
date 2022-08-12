import { users } from '../data/data.js';
import { findUserByMailId, addStringToUser, findUserByToken, addNewPasswordToUser, sendMail } from '../helper/helper.js';
import randomString from 'random-string';
import jwt from 'jsonwebtoken';

// user registration
const register = async (req, res) => {

    let user = await findUserByMailId(req.body.email);
    if (user) {
        res.status(409).send({ msg: "Sorry, email Id already exist", status: 409 });
    } else {
        await users.push(req.body);
        res.status(201).send({ msg: "User registred successful", status: 201 });
    }
}

// user login
const login = async (req, res) => {

    let user = await findUserByMailId(req.body.email);
    if (user) {
        if (req.body.password === user.password) {
            res.status(200).send({ msg: "Login Successful", status: 200 });
        } else {
            res.status(409).send({ msg: "password doesn't match", status: 409 });
        }
    } else {
        res.status(404).send({ msg: "User's email Id not found", status: 404 });
    }
}

// forgotPassword
const forgotPassword = async (req, res) => {

    let user = await findUserByMailId(req.body.email);

    if (user) {

        let string = await randomString({ length: 20 });
        let token = await jwt.sign({ string }, "pass_reset", { expiresIn: "1h" });

        addStringToUser(user, string);
        sendMail(req.body.email, token);

        res.status(200).send({ msg: "Password reset link sent to mail", status: 200 })
    } else {
        res.status(404).send({ msg: "User's email Id not found", status: 404 })
    }
}

// reset Password
const resetPass = async (req, res) => {

    await jwt.verify(req.body.token, 'pass_reset', (error, info) => {

        if (error) {

            if (error.message == 'jwt expired') {
                res.status(410).send({ msg: 'Sorry, Password reset link expired', status: 410 });
            } else {
                res.status(400).send({ msg: 'Sorry, Something went wrong', status: 400 });
            }
        } else if (info) {
            addNewPassword(info.string);
        } else {
            res.status(400).send({ msg: 'Sorry, Something went wrong' });
        }
    });

    async function addNewPassword(string) {
        let user = await findUserByToken(string);

        if (user) {
            await addNewPasswordToUser(user.email, req.body.password);
            res.status(200).send({ msg: 'New password updated successfully', status: 200 });
        } else {
            res.status(400).send({ msg: 'Sorry, Something went wrong', status: 400 });
        }
    }
}

export { register, login, forgotPassword, resetPass }; 