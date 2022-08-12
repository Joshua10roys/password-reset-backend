import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { register, login, forgotPassword, resetPass } from './controller/controller.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json())

// user registration
app.post('/register', register)

// user login
app.post('/login', login)

// forgotPassword
app.post('/forgotPassword', forgotPassword)

// reset Password
app.post('/resetPassword', resetPass)

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))