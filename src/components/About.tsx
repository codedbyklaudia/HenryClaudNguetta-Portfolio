import '../styles/_about.scss'

export default function About() {
  return (
    <div className="about">

      {/* Intro paragraph */}
      <section className="about__intro">
        <p>
          Henry Claud N'Guetta is an artist who comes from Italy, Florence - the city
          of art. He is very proud of that. He has many hobbies and interests, one of
          them writing bios as if someone else have - hence the current paragraph.
        </p>
        <hr className="about__divider" />
      </section>

      {/* Bio section */}
      <section className="about__bio">
        <div className="about__bio-image">
          <img src="../../images/henryclaudnguetta.jpeg" alt="Henry Claud N'Guetta" />
        </div>
        <div className="about__bio-text">
          <p>
            Jokes apart, I do really come from Florence where luckily enough I was
            able to attend one of the oldest art school in Italy, Liceo Artistico di
            Porta Romana. Here I studied fine arts, history of arts and media that led
            me to Escape Studios where I studied to become a compositor.
          </p>
          <p>I try to dedicate myself to art in all kind of forms, from painting to sports.</p>
          <p>
            I try to be as balanced as possible, other than appreciating the creative
            bits of my life I deepen also the boring one (or very fun) which are math
            and coding.
          </p>
          <p>Ah yes, I do reeeeally love snowboarding. It's so fun!</p>
        </div>
      </section>

      {/* Details section */}
      <section className="about__details">
        <div className="about__details-info">
          <p><span>Location:</span> London, United Kingdom</p>
          <p><span>Phone:</span> +447312868327</p>
          <p><span>Email:</span> work@henryclaudnguetta.co.uk</p>
          <div className="about__links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Linkedin</a>
            <a href="https://imdb.com" target="_blank" rel="noopener noreferrer">IMDB</a>
            <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">Vimeo</a>
          </div>
        </div>
      </section>

      {/* Career section */}
      <section className="about__career">
        <h2 className="about__career-title">My Career</h2>
        <hr className="about__divider about__divider--short" />
        <div className="about__career-grid">
          <div className="about__career-left">
            <p>
              As a Compositor at Harbor Picture Company, London, I specialize in
              creating outstanding visual experiences.
            </p>
            <a href="/images/henry-cv.pdf" download className="about__btn about__btn--outline">
              Download CV ↗
            </a>
          </div>
          <div className="about__career-right">
            <p>
              Want to uncover more? Click below to reveal my full story, or watch the showreel.
            </p>
            <a href="/showreel" className="about__btn about__btn--gold">
              See my showreel ↗
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}