import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.CLIENT_URL || 'https://henryclaudnguetta.co.uk'
}))
app.use(express.json())

app.post('/api/contact', async (req, res) => {
  const resend = new Resend(process.env.RESEND_API_KEY!)
  const { firstName, lastName, email, message } = req.body as {
    firstName?: string
    lastName?: string
    email?: string
    message?: string
  }

  if (!email || !message) {
    res.status(400).json({ error: 'Email and message are required.' })
    return
  }

  const fullName = `${firstName ?? ''} ${lastName ?? ''}`.trim() || 'Someone'

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <no-reply@henryclaudnguetta.co.uk>',
      to: 'work@henryclaudnguetta.co.uk',
      replyTo: email,
      subject: `New message from ${fullName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1a1a1a; border-radius: 8px; overflow: hidden; border: 1px solid #e0d9d0;">
          <div style="background: #f2ede6; padding: 40px; border-bottom: 1px solid #e0d9d0;">
            <h1 style="margin: 0; font-size: 22px; font-weight: normal; letter-spacing: 0.05em; color: #1a1a1a;">New Contact Message</h1>
            <p style="margin: 8px 0 0; color: #888; font-size: 13px; font-family: sans-serif;">Received via henryclaudnguetta.co.uk</p>
          </div>
          <div style="padding: 40px;">
            <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; color: #888; width: 100px;">From</td>
                <td style="padding: 10px 0; color: #1a1a1a;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #ABA021; text-decoration: none;">${email}</a></td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e0d9d0; margin: 24px 0;" />
            <p style="font-family: sans-serif; font-size: 13px; color: #888; margin: 0 0 12px;">Message</p>
            <p style="font-size: 15px; line-height: 1.7; color: #1a1a1a; margin: 0;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <div style="padding: 24px 40px; background: #f2ede6; border-top: 1px solid #e0d9d0; font-family: sans-serif; font-size: 12px; color: #aaa;">
            Reply directly to this email to respond to ${fullName}.
          </div>
        </div>
      `
    })

    await resend.emails.send({
      from: "Henry Claud N'Guetta <no-reply@henryclaudnguetta.co.uk>",
      to: email,
      subject: "Thanks for reaching out",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1a1a1a; border-radius: 8px; overflow: hidden; border: 1px solid #e0d9d0;">
          <div style="background: #f2ede6; padding: 40px; border-bottom: 1px solid #e0d9d0;">
            <h1 style="margin: 0; font-size: 22px; font-weight: normal; letter-spacing: 0.05em; color: #1a1a1a;">Henry Claud N'Guetta</h1>
            <p style="margin: 8px 0 0; color: #888; font-size: 13px; font-family: sans-serif;">VFX Artist & Filmmaker</p>
          </div>
          <div style="padding: 40px;">
            <p style="font-size: 15px; line-height: 1.7; color: #1a1a1a; margin: 0 0 20px;">Hi ${firstName ?? 'there'},</p>
            <p style="font-size: 15px; line-height: 1.7; color: #1a1a1a; margin: 0 0 20px;">Thank you for getting in touch. I've received your message and will get back to you as soon as possible.</p>
            <p style="font-size: 15px; line-height: 1.7; color: #1a1a1a; margin: 0;">
              In the meantime, feel free to explore my work on
              <a href="https://vimeo.com/henryclaud" style="color: #ABA021; text-decoration: none;">Vimeo</a>
              or connect on
              <a href="https://www.linkedin.com/in/henry-claud-n-guetta-b8a910222/" style="color: #ABA021; text-decoration: none;">LinkedIn</a>.
            </p>
          </div>
          <div style="padding: 24px 40px; background: #f2ede6; border-top: 1px solid #e0d9d0; font-family: sans-serif; font-size: 12px; color: #aaa;">
            © Henry Claud N'Guetta · London, United Kingdom
          </div>
        </div>
      `
    })

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    res.status(500).json({ error: 'Failed to send email.' })
  }
})

app.get('/test', (req, res) => {
  res.json({
    hasResendKey: !!process.env.RESEND_API_KEY,
    clientUrl: process.env.CLIENT_URL,
    nodeEnv: process.env.NODE_ENV
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})