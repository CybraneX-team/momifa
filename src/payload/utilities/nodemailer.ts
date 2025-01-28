import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import payload from "payload"
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
export const sendVerificationMail = async (req,res)=>{
  const {name, email ,password, passwordConfirm} = req.body 
  if(!name || !email || !password || ! passwordConfirm){
    return res.status(400).send("all fields are required")
  }
  const exist = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
  });
  
  if (exist.docs && exist.docs.length > 0) {
    return res.status(400).json({ message: "User already exists", user: exist.docs[0] })
  }

  if(password !== passwordConfirm){
    return res.status(400).send("Invalid data passed")
  }
  const token = jwt.sign(
    {name,email,password,passwordConfirm}, 
    process.env.PAYLOAD_SECRET,
    { expiresIn: '10m' }
  )
  if(!token){
    return res.status(404).send("no token")
  }
  const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/verificationLogin?token=${token}`
  try {
    await transporter.sendMail({
      from: `"Momifa" <trishbatra564@gmail.com>`,  
      to: `${email}`, 
      subject: 'Verify your email',
      text: `Hey ${name}, verify your email by clicking here: ${url}`,
    });
    
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({err: error });
  }
  return res.status(200).json({ success: true, message: 'Message sent successfully!' })
}

export const decodeDataToLogin = async (req , res)=>{
  const {token} = req.body 
  if(!token){
    return res.status(404).send("no token")
  }
  const decoded = jwt.verify(token, process.env.PAYLOAD_SECRET)
  if(!decoded){
    res.status(500).json({err: "error"});
  }
  console.log("decoded",decoded)
  return res.status(200).send(decoded)

}