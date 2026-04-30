import { useState, useEffect } from 'react'
import '../styles/_about.scss'
import henryImg from '../../images/henryclaudnguetta.jpeg'
import sunImg from '../images/sun.png'

export default function About() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="about">

      <div className={`about__side-sun${scrolled ? ' about__side-sun--hidden' : ''}`}>
        <img src={sunImg} alt="" />
      </div>

      <section className="about__intro">
        <p>
          Henry Claud N'Guetta is an artist who comes from Italy, Florence - the city
          of art. He is very proud of that. He has many hobbies and interests, one of
          them writing bios as if someone else wrote it - hence the current paragraph.
        </p>
        <hr className="about__divider" />
      </section>

      <section className="about__bio">
        <div className="about__bio-image">
          <img src={henryImg} alt="Henry Claud N'Guetta" />
        </div>
        <div className="about__bio-text">
          <p>
            Jokes apart, I do really come from Florence where luckily enough I was
            able to attend one of the oldest art schools in Italy, Liceo Artistico di
            Porta Romana. Here I studied fine arts, history of arts and media that led
            me to Escape Studios where I studied to become a compositor.
          </p>
          <p>I try to dedicate myself to art in all kinds of forms, from painting to sports.</p>
          <p>
            I try to be as balanced as possible — other than appreciating the creative
            bits of my life I deepen also the boring ones (or very fun) which are math
            and coding.
          </p>
          <p>Ah yes, I do reeeeally love snowboarding. It's so fun!</p>
        </div>
      </section>

      <section className="about__details">
        <div className="about__details-grid">
          <div className="about__details-item">
            <span className="about__details-label">Location</span>
            <span className="about__details-value">London, United Kingdom</span>
          </div>
          <div className="about__details-item">
            <span className="about__details-label">Phone</span>
            <a href="tel:+447312868327" className="about__details-value about__details-value--link">
              +447312868327
            </a>
          </div>
          <div className="about__details-item">
            <span className="about__details-label">Email</span>
            <a href="mailto:work@henryclaudnguetta.co.uk" className="about__details-value about__details-value--link">
              work@henryclaudnguetta.co.uk
            </a>
          </div>
          <div className="about__details-item">
            <span className="about__details-label">Follow</span>
            <div className="about__details-social">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://imdb.com"     target="_blank" rel="noopener noreferrer">IMDB</a>
              <a href="https://vimeo.com"    target="_blank" rel="noopener noreferrer">Vimeo</a>
            </div>
          </div>
        </div>
      </section>

      <section className="about__career">
        <div className="about__career-header">
          <h2 className="about__career-title">My Career</h2>
          <hr className="about__divider about__divider--short" />
        </div>
        <div className="about__career-grid">
          <div className="about__career-card">
            <span className="about__career-card-tag">Current Role</span>
            <p>
              As a Compositor at Harbor Picture Company, London, I specialise in
              creating outstanding visual experiences.
            </p>
          </div>
          <div className="about__career-card about__career-card--accent">
            <span className="about__career-card-tag">Want more?</span>
            <p>
              Click below to reveal my full story, or dive straight into the showreel.
            </p>
            <div className="about__cta-buttons">
              <a href="/images/cv.pdf" download className="about__btn about__btn--outline">
                Download CV ↗
              </a>
              <a href="/showreel" className="about__btn about__btn--gold">
                See my showreel ↗
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}