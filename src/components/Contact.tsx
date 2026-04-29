import { useState } from 'react'
import '../styles/_contact.scss'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!formData.email || !formData.message) return
    setSubmitted(true)
  }

  return (
    <section className="contact">
      <div className="contact__inner">

        <div className="contact__left">
          <h1 className="contact__title">Get In Touch</h1>
          <p className="contact__tagline">I'd love to hear from you!</p>
          <p className="contact__desc">
            If you have any enquiries, or just want to say hi, please use the
            contact form or contact me on:
          </p>
          <ul className="contact__details">
            <li>
              <span className="contact__icon">✉</span>
              <a href="mailto:work@henryclaudnguetta.co.uk">work@henryclaudnguetta.co.uk</a>
            </li>
            <li>
              <span className="contact__icon">✆</span>
              <a href="tel:+447312868327">+44 7312 868 327</a>
            </li>
          </ul>
        </div>

        <div className="contact__right">
          {submitted ? (
            <div className="contact__success">
              <p>Thank you! I'll be in touch soon.</p>
            </div>
          ) : (
            <div className="contact__form">
              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact__field contact__field--full">
                <label htmlFor="email">Email <span>*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__field contact__field--full">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="contact__submit">
                <button onClick={handleSubmit}>Send</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}