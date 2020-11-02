const nodemailer = require('nodemailer')
const {HOSTURL, USERMAIL, USERPASS} = require('./env')

const sendMail = (email) => {
    const output = `<!DOCTYPE html>
    <html>
    
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    </head>
    
    <body>
    
    <div class="container-fluid">
      <div class="row">
        <a href="${HOSTURL}"
        class="btn btn-primary btn-lg active" 
        role="button" 
        aria-pressed="true">
          Primary link
        </a>
      </div>
    </div>
    </body>
    
    </html>
                `
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: USERMAIL,
            pass: USERPASS
        }
    });

    let Mail = {
        from: `"Foodcourt-Team" <${USERMAIL}>`,
        to: email,
        subject: "Verification Email",
        text: "Plaintext version of the message",
        html: output
    };
    transporter.sendMail(Mail)
}

module.exports = sendMail