import nodemailer from 'nodemailer';


export function sendEmailToJoshua(request, response) {

    try {

        const { name, email, info, message } = request.body;

        const dateObj = new Date(info);
        const date = dateObj.getDate() + '/' + dateObj.getMonth() + '/' + dateObj.getFullYear() + ' '
            + dateObj.getHours() + ':' + dateObj.getMinutes();


        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { user: 'joshuaashvinth@gmail.com', pass: process.env.GMAIL_PASS },
            tls: { rejectUnauthorized: false },
        });

        let mailOption = {
            from: 'Portfolio Message <joshuaashvinth@gmail.com>',
            to: 'joshuaashvinth@gmail.com',
            subject: `${name} Messaged Through Portfolio`,
            html: `
            <p><strong>Message :</strong>${message}</p>
            <p><strong>Email Address :</strong>${email}</p>
            <p><strong>Date&Time :</strong>${date}</p>
            `
        }

        transporter.sendMail(mailOption);
        response.status(200).send({ status: 200, msg: 'Your Message Sent' })

    } catch (error) {
        console.log(error);
        response.status(500).send({ status: 200, msg: 'Something went wrong' });
    }
}