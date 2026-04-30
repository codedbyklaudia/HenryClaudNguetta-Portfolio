import { useRef, useState } from 'react'
import '../styles/_gallery.scss'

type Category = 'all' | 'commercial' | 'music-videos' | 'movies'
type Size = 'sm' | 'md' | 'lg' | 'xl'

const galleryItems: { poster: string; video: string; category: Category; title: string; size: Size }[] = [
  { poster: '../../images/Cheerleder.png',             video: '', category: 'commercial',   title: 'Cheerleader',         size: 'lg' },
  { poster: '../../images/CivilWar.png',               video: '', category: 'movies',       title: 'Civil War',           size: 'sm' },
  { poster: '../../images/Dead-Shot.jpg',              video: '', category: 'movies',       title: 'Dead Shot',           size: 'md' },
  { poster: '../../images/Erste-Group.jpg',            video: '', category: 'commercial',   title: 'Erste Group',         size: 'xl' },
  { poster: '../../images/ING Everyday.jpg',           video: '', category: 'commercial',   title: 'ING Everyday',        size: 'sm' },
  { poster: '../../images/Smirnoff.jpg',               video: '', category: 'commercial',   title: 'Smirnoff',            size: 'md' },
  { poster: '../../images/Quickbooks Mind.jpg',        video: '', category: 'commercial',   title: 'Quickbooks Mind',     size: 'sm' },
  { poster: '../../images/Quickbooks Payroll.jpg',     video: '', category: 'commercial',   title: 'Quickbooks Payroll',  size: 'lg' },
  { poster: '../../images/Timestalker first look.jpg', video: '', category: 'movies',       title: 'Timestalker',         size: 'md' },
  { poster: '../../images/Zidane-ad.jpg',              video: '', category: 'music-videos', title: 'Zidane',              size: 'xl' },
  { poster: '../../images/Cheerleder.png',             video: '', category: 'music-videos', title: 'Cheerleader II',      size: 'sm' },
  { poster: '../../images/CivilWar.png',               video: '', category: 'commercial',   title: 'Civil War BTS',       size: 'md' },
  { poster: '../../images/Dead-Shot.jpg',              video: '', category: 'movies',       title: 'Dead Shot II',        size: 'lg' },
  { poster: '../../images/Erste-Group.jpg',            video: '', category: 'music-videos', title: 'Erste Group MV',      size: 'sm' },
  { poster: '../../images/ING Everyday.jpg',           video: '', category: 'commercial',   title: 'ING Campaign',        size: 'xl' },
  { poster: '../../images/Smirnoff.jpg',               video: '', category: 'music-videos', title: 'Smirnoff MV',         size: 'md' },
  { poster: '../../images/Quickbooks Mind.jpg',        video: '', category: 'commercial',   title: 'Quickbooks Campaign', size: 'sm' },
  { poster: '../../images/Quickbooks Payroll.jpg',     video: '', category: 'movies',       title: 'Payroll',             size: 'lg' },
  { poster: '../../images/Timestalker first look.jpg', video: '', category: 'movies',       title: 'Timestalker II',      size: 'sm' },
  { poster: '../../images/Zidane-ad.jpg',              video: '', category: 'music-videos', title: 'Zidane Ad',           size: 'md' },
  { poster: '../../images/Cheerleder.png',             video: '', category: 'commercial',   title: 'Cheerleader III',     size: 'xl' },
  { poster: '../../images/CivilWar.png',               video: '', category: 'movies',       title: 'Civil War II',        size: 'sm' },
  { poster: '../../images/side-missionMC.png',             video: '', category: 'commercial',   title: 'McDonald Side Mission',     size: 'lg' },
  { poster: '../../images/CivilWar.png',               video: '', category: 'movies',       title: 'Civil War II',        size: 'sm' },
]

function GalleryItem({
  poster, video, title, category, size
}: {
  poster: string; video: string; title: string; category: string; size: Size
}) {
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
      className={`gallery-page__item gallery-page__item--${size}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={poster} alt={title} className="gallery-page__poster" loading="lazy" />
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          playsInline
          loop
          preload="none"
          className="gallery-page__video"
        />
      )}
      <div className="gallery-page__overlay">
        <p className="gallery-page__title">{title}</p>
        <span className="gallery-page__category">{category.replace('-', ' ')}</span>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [active, setActive] = useState<Category>('all')

  const filtered = galleryItems.filter(
    item => active === 'all' || item.category === active
  )

  const categories: { key: Category; label: string }[] = [
    { key: 'all',          label: 'All'          },
    { key: 'commercial',   label: 'Commercial'   },
    { key: 'music-videos', label: 'Music Videos' },
    { key: 'movies',       label: 'Movies'       },
  ]

  return (
    <div className="gallery-page">
      <div className="gallery-page__filter">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            className={`gallery-page__filter-btn${active === key ? ' gallery-page__filter-btn--active' : ''}`}
            onClick={() => setActive(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="gallery-page__columns">
        {filtered.map((item, i) => (
          <GalleryItem
            key={i}
            poster={item.poster}
            video={item.video}
            title={item.title}
            category={item.category}
            size={item.size}
          />
        ))}
      </div>
    </div>
  )
}