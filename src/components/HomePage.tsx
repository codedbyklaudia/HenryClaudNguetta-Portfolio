import { useRef, useState } from 'react'
import '../styles/_homepage.scss'
import showreel from '../../images/ShowreelHCN.mp4'
import { Link } from 'react-router-dom'

// Import your video clips
import cheerleaderVid  from '../../images/videos/cheerleader.mp4'
// import civilWarVid     from '../../images/videos/civilwar.mp4'
// import deadShotVid     from '../../images/videos/deadshot.mp4'
// import ersteVid        from '../../images/videos/erste.mp4'
// import ingVid          from '../../images/videos/ing.mp4'
// import smirnoffVid     from '../../images/videos/smirnoff.mp4'
// import qbMindVid       from '../../images/videos/qbmind.mp4'
// import qbPayrollVid    from '../../images/videos/qbpayroll.mp4'
// import timestalkerVid  from '../../images/videos/timestalker.mp4'
// import zidaneVid       from '../../images/videos/zidane.mp4'

const galleryItems = [
  { poster: '../../images/Cheerleder.png',             title: 'Cheerleader',           video: cheerleaderVid },
  { poster: '../../images/CivilWar.png',               title: 'Civil War',             video: null },
  { poster: '../../images/Dead-Shot.jpg',              title: 'Dead Shot',             video: null },
  { poster: '../../images/Erste-Group.jpg',            title: 'Erste Group',           video: null },
  { poster: '../../images/ING Everyday.jpg',           title: 'ING Everyday',          video: null },
  { poster: '../../images/Smirnoff.jpg',               title: 'Smirnoff',              video: null },
  { poster: '../../images/Quickbooks Mind.jpg',        title: 'Quickbooks Mind',       video: null },
  { poster: '../../images/Quickbooks Payroll.jpg',     title: 'Quickbooks Payroll',    video: null },
  { poster: '../../images/Timestalker first look.jpg', title: 'Timestalker',           video: null },
  { poster: '../../images/Zidane-ad.jpg',              title: 'Zidane',                video: null },
  { poster: '../../images/Quickbooks Payroll.jpg',     title: 'Quickbooks Payroll II', video: null },
  { poster: '../../images/Timestalker first look.jpg', title: 'Timestalker II',        video: null },
]

function GalleryItem({ poster, title, video }: {
  poster: string
  title: string
  video: string | null
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    const p = v.play()
    if (p !== undefined) p.catch(() => {})
  }

  const handleMouseLeave = () => {
    setHovered(false)
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }

  return (
    <div
      className={`gallery-section__item${hovered ? ' is-hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={poster} alt={title} className="gallery-section__poster" />

      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          playsInline
          loop
          preload="metadata"
          className="gallery-section__video"
        />
      )}

      <div className="gallery-section__overlay">
        <span className="gallery-section__title">{title}</span>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__video-wrap">
          <video
            className="hero__video"
            src={showreel}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="hero__overlay" />
          <div className="hero__center">
            <h1 className="hero__name">Henry Claud N'Guetta</h1>
            <p className="hero__subtitle">VFX Artist</p>
            <div className="hero__cta">
              <Link to="/about" className="cta__about">About Me</Link>
            </div>
          </div>
        </div>

        <div className="hero__scroll">
          <div className="hero__mouse">
            <div className="hero__mouse-wheel" />
          </div>
          <span>Scroll</span>
          <div className="hero__chevrons">
            <span className="hero__chevron" />
            <span className="hero__chevron" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section">
        <div className="gallery-section__grid">
          {galleryItems.map((item, i) => (
            <GalleryItem
              key={i}
              poster={item.poster}
              title={item.title}
              video={item.video}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <a href="/gallery" className="cta__more">Show more work</a>
      </section>
    </div>
  )
}