import {google} from "googleapis"
import { redis } from "googleapis/build/src/apis/redis";
import nodemailer from "nodemailer"





export async function sendOTPMail(  email: string, otp: string, options?: any) {
    try {

        let oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'https://developers.google.com/oauthplayground')
        oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
        


        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                service: "Gmail",
                secure: true,
                auth: {
                    user: "mobappsmailer@gmail.com",
                    pass: process.env.MAIL_PASS,
                }
        })

        const mailOptions = {
            from: "mobappsmailer@gmail.com",
            to: email,
            subject: options?.subject || "Verify Your Email",
            html: `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>OTP Email</title>
                    <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        padding: 20px 0;
                        background-color: #FF0000;
                        color: #ffffff;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 20px;
                        text-align: center;
                    }
                    .content p {
                        font-size: 18px;
                        margin: 20px 0;
                    }
                    .otp {
                        font-size: 24px;
                        font-weight: bold;
                        color: #1A2130;
                        margin: 20px 0;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px;
                        background-color: #f4f4f4;
                        color: #888888;
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }
                    .footer p {
                        margin: 0;
                        font-size: 14px;
                    }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                    <div class="header">
                        <h1>Verification Code</h1>
                    </div>
                    <div class="content">
                        <p>Your OTP code is:</p>
                        <p class="otp">${otp}</p>
                        <p>Please enter this code to verify your authentication.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 Sehat Selalu All rights reserved.</p>
                        <p>this code <b> expires in 1 hour</b>.</p>
                    </div>
                    </div>
                </body>
            </html>
            `
        }


       await transport.sendMail(mailOptions);
        
    } catch(error) {
        return error
    }
}
