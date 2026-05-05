import { useState, useEffect } from 'react'
import '../styles/_contact.scss'
import sunImg from '../images/sun.png'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!formData.email || !formData.message) return
    setSubmitting(true)
    setError(false)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact">
      <div className="contact__sun-wrap" aria-hidden="true">
        <img src={sunImg} alt="" />
      </div>
      <div className="contact__glow" aria-hidden="true" />


      {/* Header */}
      <div className="contact__header">
        <div className="contact__header-left">
          <p className="contact__header-eyebrow">Let's work together</p>
          <h1 className="contact__header-title">
            Get In <em>Touch</em>
          </h1>
          <p className="contact__header-tagline">
            Have a project in mind or just want to say hello?
            Reach out using the form or directly below.
          </p>
        </div>

        {/* Socials — right of header */}
        <div className="contact__header-right">
          <div className="contact__header-socials">
              <a
              href="https://www.linkedin.com/in/henry-claud-n-guetta-b8a910222/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__header-social"
            >
              <span className="contact__header-social-line" />
              LinkedIn
            </a>
              <a
              href="https://vimeo.com/henryclaud"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__header-social"
            >
              <span className="contact__header-social-line" />
              Vimeo
            </a>
            <a
              href="https://www.imdb.com/name/henryclaud"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__header-social"
            >
              <span className="contact__header-social-line" />
              IMDB
            </a>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="contact__body">

        {/* Left — contact details */}
        <div className="contact__left">
          <div className="contact__details">
            <div className="contact__detail-item">
              <span className="contact__detail-icon">
                <Mail size={20} strokeWidth={1.5} />
              </span>
              <div className="contact__detail-body">
                <span className="contact__detail-label">Email</span>
                <a href="mailto:work@henryclaudnguetta.co.uk">work@henryclaudnguetta.co.uk</a>
              </div>
            </div>
            <div className="contact__detail-item">
              <span className="contact__detail-icon">
                <Phone size={20} strokeWidth={1.5} />
              </span>
              <div className="contact__detail-body">
                <span className="contact__detail-label">Phone</span>
                <a href="tel:+447312868327">+44 7312 868 327</a>
              </div>
            </div>
            <div className="contact__detail-item">
              <span className="contact__detail-icon">
                <MapPin size={20} strokeWidth={1.5} />
              </span>
              <div className="contact__detail-body">
                <span className="contact__detail-label">Based in</span>
                <span className="contact__detail-value">London, United Kingdom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="contact__right">
          {submitted ? (
            <div className="contact__success">
              <span className="contact__success-icon">✓</span>
              <p>Message received.<br />I'll be in touch soon.</p>
              <small>Thank you for reaching out</small>
            </div>
          ) : (
            <>
              <div className="contact__form">
                <div className="contact__row">
                  <div className="contact__field">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName" name="firstName" type="text"
                      placeholder="John"
                      value={formData.firstName} onChange={handleChange}
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName" name="lastName" type="text"
                      placeholder="Doe"
                      value={formData.lastName} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact__field contact__field--full">
                  <label htmlFor="email">Email <span>*</span></label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="hello@example.com"
                    value={formData.email} onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact__field contact__field--full">
                  <label htmlFor="message">Message <span>*</span></label>
                  <textarea
                    id="message" name="message" rows={6}
                    placeholder="Tell me about your project..."
                    value={formData.message} onChange={handleChange}
                  />
                </div>

                {error && (
                  <p className="contact__error">
                    Something went wrong — please email directly at work@henryclaudnguetta.co.uk
                  </p>
                )}

                <div className="contact__submit">
                  <button
                    className="contact__submit-btn"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    <span>{submitting ? 'Sending…' : 'Send Message'}</span>
                    <span className="contact__submit-arrow">↗</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>

    </section>
  )
}