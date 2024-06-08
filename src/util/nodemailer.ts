import {google} from "googleapis"
import { redis } from "googleapis/build/src/apis/redis";
import nodemailer from "nodemailer"


const CLIENT_ID = '439701496071-lqlv4hv4utm66augh9qeolkqkcibni2k.apps.googleusercontent.com ';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04qw1WukFoVhMCgYIARAAGAQSNwF-L9IrDEO7hD_oIZvkfSJZoyleAaYgIQl0_3hBhR8n7p2SWp9eaH2CN_1FTfghQsL-mAbGIP4';


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLEINT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})



async function sendOTPMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                service: "Gmail",
                secure: true,
                auth: {
                    user: "mobappsmailer@gmail.com",
                    pass: ""
                    // type: 'Oauth2',
                    // user: 'mobappsmailer@gmail.com',
                    // clientId: CLIENT_ID,
                    // clientSecret: CLEINT_SECRET,
                    // refreshToken: REFRESH_TOKEN,
                    // accessToken: accessToken,
                }
       
        })

    } catch(error) {
        return error
    }
}
