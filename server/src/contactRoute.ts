import { Router, type Request, type Response } from 'express'
import { Resend } from 'resend'

const router = Router()
const resend = new Resend(process.env.RESEND_API_KEY)

router.post('/', async (req: Request, res: Response) => {
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

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'work@henryclaudnguetta.co.uk',
      replyTo: email,
      subject: `New message from ${firstName ?? ''} ${lastName ?? ''}`.trim() || 'New contact form message',
      html: `
        <p><strong>From:</strong> ${firstName ?? ''} ${lastName ?? ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `
    })

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    res.status(500).json({ error: 'Failed to send email.' })
  }
})

export default router