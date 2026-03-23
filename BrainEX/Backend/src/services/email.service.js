import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service:"email",
    auth:{
        type:'OAuth2',
        user:process.env.GOOGLE_USER,
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN,
    }
})

transporter.verify().then(()=>{
    console.log("Transporter ready to send emails")
})
.catch((err)=>{
    console.log("Error occured :"+err)
})


const mailOptions = transporter.sendMail()