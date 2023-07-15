const nodemailer = require('nodemailer');
import { NextResponse } from 'next/server';
const connectDB = require('../../../utils/dbConnect')
connectDB()
const userModel = require('../../../models/userModel')


export async function POST(req) {
    try {

        const body = await req.json()
        const { email, validationCode } = body

        const user = await userModel.findOne({ email })
        if (user) {
            return NextResponse.json({ "success": false, "message": "User already exist!" })
        }
        else {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'ayushtherock2001@gmail.com',
                    pass: process.env.MAIL_SECRET
                }
            })

            let info = await transporter.sendMail({
                from: "ayushtherock2001@gmail.com>",
                to: email,
                subject: "Account Validation Code",
                html: `<div style="text-align: center;"><p>Dear User,</p><p>Thank you for choosing our social media application. To complete your account registration, please use the validation code below:</p><div style="background-color: #f5f5f5; padding: 10px; display: inline-block; font-size: 18px; margin-top: 20px;"><strong>${validationCode}</strong></div><p>This validation code is essential to verify your email address and ensure the security of your account. Please enter this code in the designated field within the application to complete the validation process.</p><p>If you did not request this code, please ignore this email and contact our support team immediately.</p><p>Thank you again for joining our social media application. We look forward to having you as part of our community!</p><p>Best regards,<br>Your Social Media Application Team</p></div>`
            })

            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


            return NextResponse.json({ "success": true })
        }

    } catch (error) {
        console.log(error)
        return new Response("Internal server error!", {
            status: 500
        })
    }
}


