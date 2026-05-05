import { useRef, useState, useEffect } from 'react'
import '../styles/_homepage.scss'
import showreel from '../../images/ShowreelHCN.mp4'

import cheerleaderVid from '../../images/videos/Cheerleader.mp4'
import headVid        from '../../images/videos/Head-Shoulders.mp4'
import oreoVid        from '../../images/videos/OreoLegends.mp4'
import deadShotVid    from '../../images/videos/DeadShot.mp4'
import civilWarVid    from '../../images/videos/CivilWar.mp4'
import ersteVid       from '../../images/videos/Erste.mp4'
import ingVid         from '../../images/videos/ING.mp4'
import smirnoffVid    from '../../images/videos/Smirnoff.mp4'
import payrollVid     from '../../images/videos/Payroll.mp4'
import TimeVid        from '../../images/videos/TimeStalker.mp4'
import zidaneVid      from '../../images/videos/Zidane.mp4'
import visaVid        from '../../images/videos/Visa.mp4'

const galleryItems = [
  { poster: '../../images/CivilWar.png',               title: 'Civil War',             video: civilWarVid },
  { poster: '../../images/Quickbooks Mind.jpg',        title: 'Visa',                  video: visaVid },
  { poster: '../../images/Erste-Group.jpg',            title: 'Erste Group',           video: ersteVid },
  { poster: '../../images/ING Everyday.jpg',           title: 'ING Everyday',          video: ingVid },
  { poster: '../../images/Smirnoff.jpg',               title: 'Smirnoff',              video: smirnoffVid },
  { poster: '../../images/Quickbooks Payroll.jpg',     title: 'Quickbooks Payroll',    video: payrollVid },
  { poster: '../../images/Timestalker first look.jpg', title: 'Timestalker',           video: TimeVid },
  { poster: '../../images/Zidane-ad.jpg',              title: 'Zidane',                video: zidaneVid },
  { poster: '../../images/head-shoulders.png',         title: 'Head & Shoulders',      video: headVid },
  { poster: '../../images/Dead-Shot.jpg',              title: 'Dead Shot',             video: deadShotVid },
  { poster: '../../images/oreo.PNG',                   title: 'Oreo Legends',          video: oreoVid },
  { poster: '../../images/Cheerleder.png',             title: 'Cheerleader',           video: cheerleaderVid },
]

function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )
}

function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

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
    if (!v || !video) return
    v.currentTime = 0
    const p = v.play()
    if (p !== undefined) p.catch(() => {})
  }

  const handleMouseLeave = () => {
    setHovered(false)
    const v = videoRef.current
    if (!v || !video) return
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
      <video
        ref={videoRef}
        src={video ?? undefined}
        muted
        playsInline
        loop
        preload="metadata"
        className="gallery-section__video"
        style={{ display: video ? 'block' : 'none' }}
      />
      <div className="gallery-section__overlay">
        <span className="gallery-section__title">{title}</span>
      </div>
    </div>
  )
}

function GalleryRow({ items, delay }: {
  items: typeof galleryItems
  delay: number
}) {
  const { ref, visible } = useScrollReveal(0.12)

  return (
    <div
      ref={ref}
      className={`gallery-section__row${visible ? ' gallery-section__row--visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {items.map((item, i) => (
        <GalleryItem
          key={i}
          poster={item.poster}
          title={item.title}
          video={item.video}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const rows = chunkArray(galleryItems, 3)

  return (
    <div className="home">
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

      <section className="gallery-section">
        <div className="gallery-section__grid">
          {rows.map((row, i) => (
            <GalleryRow
              key={i}
              items={row}
              delay={i * 60}
            />
          ))}
        </div>
      </section>
    </div>
  )
}