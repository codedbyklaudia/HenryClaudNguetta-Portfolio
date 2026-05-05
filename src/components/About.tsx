import { useState, useEffect } from 'react'
import '../styles/_about.scss'
import { Download,Eye,Phone,Popcorn } from 'lucide-react';
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
        <img src={sunImg} alt="" aria-hidden="true" />
      </div>

      {/* Hero */}
      <section className="about__hero">
        <div className="about__hero-left">
          <div className="about__hero-ghost" aria-hidden="true">HCN</div>
          <h1 className="about__hero-name">
            Henry Claud
            <em>N'Guetta</em>
          </h1>
          <p className="about__hero-role">VFX Artist - London, UK</p>
        </div>

        <div className="about__hero-right">
          <p className="about__hero-quote">
            Henry Claud N'Guetta is an artist who comes from Italy, Florence - the city
            of art. He is very proud of that. He has many hobbies and interests, one of
            them writing bios as if someone else wrote it - hence the current paragraph.
          </p>
          <div className="about__cv-row">
              <a
              href="../../images/HenryClaudNguetta-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="about__cv-btn about__cv-btn--secondary"
              >
              <span>View CV</span>
              <span><Eye size={16}/></span>
            </a>
              <a
              href="../../images/HenryClaudNguetta-CV.pdf"
              download
              className="about__cv-btn about__cv-btn--primary"
              >
              <span>Download CV</span>
              <span><Download size={16}/></span>
            </a>
          </div>
        </div>
      </section>

      {/* Bio */}
<section className="about__bio">

  {/* Left — photo only */}
  <div className="about__bio-image">
    <img src={henryImg} alt="Henry Claud N'Guetta" />
  </div>

  {/* Right */}
  <div className="about__bio-text">
    <p>
      Jokes apart, I do really come from Florence where luckily enough I was
      able to attend one of the oldest art schools in Italy, Liceo Artistico di
      Porta Romana. Here I studied fine arts, history of arts and media that led
      me to Escape Studios where I studied to become a compositor.
    </p>
    <p>I try to dedicate myself to art in all kinds of forms, from painting to sports.</p>
    <p>
      I try to be as balanced as possible - other than appreciating the creative
      bits of my life I deepen also the boring ones (or very fun) which are math
      and coding.
    </p>
    <p>Ah yes, I do reeeeally love snowboarding. It's so fun!</p>

    {/* Role card sits below the text */}
    <div className="about__role-card">
      <span className="about__role-tag">Current Role</span>
      <p className="about__role-text">
        Compositor at Harbor Picture Company, London - creating outstanding
        visual experiences for film, TV and commercials.
      </p>
      <div className="about__role-actions">
        <a href="/showreel" className="about__btn about__btn--gold">
          Showreel <Popcorn size={16}/>
        </a>
        <a href="/contact" className="about__btn about__btn--outline">
          Get in touch <Phone size={16}/>
        </a>
      </div>
    </div>
  </div>

</section>

    </div>
  )
}