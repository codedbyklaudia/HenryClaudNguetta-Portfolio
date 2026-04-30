import { Router } from 'express'
import { Resend } from 'resend'

const router = Router()
const resend = new Resend(process.env.RESEND_API_KEY)

router.post('/contact', async (req, res) => {
  const { firstName, lastName, email, message } = req.body

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' })
  }

  try {
    // Notify Henry
    await resend.emails.send({
      from: 'Website <noreply@henryclaudnguetta.co.uk>',
      to: 'work@henryclaudnguetta.co.uk',
      subject: `New message from ${firstName || ''} ${lastName || ''}`.trim(),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2>New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#666;width:120px;">Name</td>
              <td>${firstName || ''} ${lastName || ''}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#666;">Email</td>
              <td><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#666;vertical-align:top;">Message</td>
              <td style="white-space:pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
      `
    })

    // Confirmation to sender
    await resend.emails.send({
      from: "Henry Claud N'Guetta <noreply@henryclaudnguetta.co.uk>",
      to: email,
      subject: 'Thanks for getting in touch',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
          <h2>Thank you, ${firstName || 'there'}.</h2>
          <p style="line-height:1.7;color:#444;">
            I've received your message and will get back to you as soon as possible.
          </p>
          <p style="line-height:1.7;color:#444;">
            In the meantime, feel free to explore my work at
            <a href="https://henryclaudnguetta.co.uk" style="color:#c9a84c;">
              henryclaudnguetta.co.uk
            </a>.
          </p>
          <hr style="border:none;border-top:1px solid #eee;margin:32px 0;" />
          <p style="font-size:0.85rem;color:#999;">
            Henry Claud N'Guetta — VFX Compositor, London
          </p>
        </div>
      `
    })

    res.status(200).json({ success: true })

  } catch (err) {
    console.error('Resend error:', err)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

export default router