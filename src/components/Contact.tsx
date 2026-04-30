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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

      <div className={`contact__side-sun${scrolled ? ' contact__side-sun--hidden' : ''}`}>
        <img src={sunImg} alt="" />
      </div>

      <div className="contact__inner">

        <div className="contact__left">
          <p className="contact__eyebrow">Let's work together</p>
          <h1 className="contact__title">Get In<br />Touch</h1>
          <p className="contact__desc">
            Have a project in mind or just want to say hi?
            Reach out using the form or directly below.
          </p>
          <div className="contact__details">
            <div className="contact__detail-item">
              <span className="contact__detail-label">
                <Mail size={13} strokeWidth={1.5} />
                Email
              </span>
              <a href="mailto:work@henryclaudnguetta.co.uk">work@henryclaudnguetta.co.uk</a>
            </div>
            <div className="contact__detail-item">
              <span className="contact__detail-label">
                <Phone size={13} strokeWidth={1.5} />
                Phone
              </span>
              <a href="tel:+447312868327">+44 7312 868 327</a>
            </div>
            <div className="contact__detail-item">
              <span className="contact__detail-label">
                <MapPin size={13} strokeWidth={1.5} />
                Based in
              </span>
              <span className="contact__detail-value">London, United Kingdom</span>
            </div>
          </div>
        </div>

        <div className="contact__right">
          {submitted ? (
            <div className="contact__success">
              <span className="contact__success-icon">✓</span>
              <p>Thank you!<br />I'll be in touch soon.</p>
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
                    placeholder="John"
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
                    placeholder="Doe"
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
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact__field contact__field--full">
                <label htmlFor="message">Message <span>*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              {error && (
                <p className="contact__error">
                  Something went wrong. Please email directly at work@henryclaudnguetta.co.uk
                </p>
              )}
              <div className="contact__submit">
                <button onClick={handleSubmit} disabled={submitting}>
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                  <span className="contact__submit-arrow">↗</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}