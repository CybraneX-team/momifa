import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port : 465,
    secure : false,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: 'trishbatra564@gmail.com', 
      pass: 'iwgbvrdvdsahpztj',    
    },
  });

export const sendMail = async (req,res)=>{
    const { fName, lName, Email, Phone, message } = req.body; 
    if(!fName || !lName || !Email || !message){
      return res.status(400).json({err: "Please provide all credentials"})
    }
  try {
    await transporter.sendMail({
      from: `"${fName} ${lName}" <${Email}>`, 
      to: 'info@momifa.com', 
      subject: 'New Contact Form Submission',
      text: message, 
    });

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({err: error });
  }
}