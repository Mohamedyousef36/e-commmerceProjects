import nodemailer from 'nodemailer'

const sendEmail = async (options) => {

    // create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    }
      
    )

    //email options
    const mailOption = {
        from:'shopping app <ahlawy55555@gmail.com>',
        to: options.email,
        subject: options.subject,
        text : options.message
    } 

    //send email

    await transporter.sendMail(mailOption);
    
}

export default sendEmail;