import { useRef } from 'react'
import '../styles/_homepage.scss'
import showreel from '../../images/ShowreelHCN.mp4'
import { Link } from 'react-router-dom';

const galleryItems = [
  { poster: '../../images/Cheerleder.png',                video: '' },
  { poster: '../../images/CivilWar.png',                  video: '' },
  { poster: '../../images/Dead-Shot.jpg',                  video: '' },
  { poster: '../../images/Erste-Group.jpg',                video: '' },
  { poster: '../../images/ING Everyday.jpg',               video: '' },
  { poster: '../../images/Smirnoff.jpg',                   video: '' },
  { poster: '../../images/Quickbooks Mind.jpg',            video: '' },
  { poster: '../../images/Quickbooks Payroll.jpg',         video: '' },
  { poster: '../../images/Timestalker first look.jpg',     video: '' },
  { poster: '../../images/Zidane-ad.jpg',                   video: '' },
  { poster: '../../images/Quickbooks Payroll.jpg',         video: '' },
  { poster: '../../images/Timestalker first look.jpg',     video: '' },
]

function GalleryItem({ poster, video }: { poster: string; video: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    if (videoRef.current && video) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current && video) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className="gallery-section__item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={poster} alt="" className="gallery-section__poster" />
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          playsInline
          loop
          preload="none"
          className="gallery-section__video"
        />
      )}
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
           
            <Link to="/about" className="cta__about">
                About Me
            </Link>
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
            <GalleryItem key={i} poster={item.poster} video={item.video} />
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