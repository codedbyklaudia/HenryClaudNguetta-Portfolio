import { useRef, useState } from 'react'
import '../styles/_gallery.scss'

type Category = 'all' | 'commercial' | 'music-videos' | 'movies'
type Size = 'sm' | 'md' | 'lg' | 'xl'

const SIZE_HEIGHT: Record<Size, number> = {
  sm: 420,
  md: 550,
  lg: 680,
  xl: 820,
}

const galleryItems: {
  poster: string
  video: string
  category: Category
  title: string
  size: Size
  ytUrl: string
}[] = [
  { poster: '../../images/Timestalker first look.jpg', video: '../../images/videos/TimeStalker.mp4',     category: 'movies',       title: 'Timestalker 2024',                  size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=lyhbDjc4yCM' },
  { poster: '../../images/Dead-Shot.jpg',              video: '../../images/videos/DeadShot.mp4',        category: 'movies',       title: 'Dead Shot 2023',                    size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=WcQT8lBxkuw' },
  { poster: '../../images/Erste-Group.jpg',            video: '../../images/videos/Erste.mp4',           category: 'commercial',   title: 'Erste - Believe in yourself',       size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=3KbZsSO-AZU' },
  { poster: '../../images/Cruel-Love.png',             video: '../../images/videos/CruelLove.mp4',       category: 'music-videos', title: 'Cruel Love',                        size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=uVzq9g26RiI' },
  { poster: '../../images/Smirnoff.jpg',               video: '../../images/videos/Smirnoff.mp4',        category: 'commercial',   title: 'Smirnoff - We do atomic',           size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=b9tifyaO-vw' },
  { poster: '../../images/visa.png',                   video: '../../images/videos/Visa.mp4',            category: 'commercial',   title: 'Visa - Hercules',                   size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=gEzSFCpNmUk' },
  { poster: '../../images/Quickbooks Payroll.jpg',     video: '../../images/videos/Payroll.mp4',         category: 'commercial',   title: 'Quickbooks - Payroll',              size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=hQ2_29cMMSM' },
  { poster: '../../images/CivilWar.png',               video: '../../images/videos/CivilWar.mp4',        category: 'movies',       title: 'Civil War 2023',                    size: 'md', ytUrl: 'https://www.youtube.com/watch?v=c2G18nIVpNE' },
  { poster: '../../images/Butlins.png',                video: '../../images/videos/Butlins.mp4',         category: 'commercial',   title: 'Butlins',                           size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=v0sG9N4CuqQ&t=5s' },
  { poster: '../../images/Zidane-ad.jpg',              video: '../../images/videos/Zidane.mp4',          category: 'commercial',   title: 'EA SPORTS FC 25',                   size: 'md', ytUrl: 'https://www.youtube.com/watch?v=RefXbk1_taI' },
  { poster: '../../images/side-missionMC.PNG',         video: '../../images/videos/SideMission.mp4',    category: 'commercial',   title: "McDonald's Side Mission",           size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=BgbpiupbEMc' },
  { poster: '../../images/oreo.PNG',                   video: '../../images/videos/OreoLegends.mp4',    category: 'commercial',   title: 'OREO Legends',                      size: 'md', ytUrl: 'https://www.youtube.com/watch?v=w900RSqVjLk' },
  { poster: '../../images/allica-bank.png',            video: '../../images/videos/AllicaBank.mp4',     category: 'commercial',   title: 'Allica Bank - Carpet',              size: 'lg', ytUrl: 'https://lbbonline.com/work/165766' },
  { poster: '../../images/head-shoulders.png',         video: '../../images/videos/Head-Shoulders.mp4', category: 'commercial',   title: 'Head and Shoulders',                size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=xERGFpIUuzA' },
  { poster: '../../images/ING Everyday.jpg',           video: '../../images/videos/ING.mp4',            category: 'commercial',   title: 'ING Everyday',                      size: 'md', ytUrl: 'https://www.youtube.com/watch?v=c18YiqR01SM' },
  { poster: '../../images/Smirnoff.jpg',               video: '../../images/videos/Smirnoff.mp4',       category: 'commercial',   title: 'Smirnoff - We do atomic',           size: 'md', ytUrl: 'https://www.youtube.com/watch?v=EJG9gQe3jNM' },
  { poster: '../../images/vabysmo.png',                video: '../../images/videos/Vabysmo.mp4',        category: 'commercial',   title: 'Vabysmo',                           size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=Kw1iHvmog4M' },
  { poster: '../../images/paypal.png',                 video: '../../images/videos/paypal.mp4',         category: 'commercial',   title: 'PayPal',                            size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=yw4ECUjPvdM&t=49s' },
  { poster: '../../images/Cheerleder.png',             video: '../../images/videos/Cheerleader.mp4',    category: 'music-videos', title: 'Cheerleader - Porter Robinson',     size: 'md', ytUrl: 'https://www.youtube.com/watch?v=CzJbz9qSsd0' },
  { poster: '../../images/bold.png',                   video: '../../images/videos/bold.mp4',           category: 'commercial',   title: 'Bold Spring Awakening Pods',        size: 'md', ytUrl: 'https://www.youtube.com/watch?v=z2yQXGD2gQU' },
  { poster: '../../images/verizon.png',                video: '../../images/videos/verizon.mp4',        category: 'commercial',   title: 'Verizon Christmas',                 size: 'sm', ytUrl: 'https://www.youtube.com/watch?v=bIg7T2uE6cc' },
]

function balanceColumns<T extends { size: Size }>(
  items: T[],
  numCols: number
): T[][] {
  const cols: T[][] = Array.from({ length: numCols }, () => [])
  const heights: number[] = Array(numCols).fill(0)

  for (const item of items) {
    const shortest = heights.indexOf(Math.min(...heights))
    cols[shortest].push(item)
    heights[shortest] += SIZE_HEIGHT[item.size] + 6
  }

  return cols
}

function GalleryItem({
  poster, video, title, category, size, ytUrl
}: {
  poster: string
  video: string
  title: string
  category: string
  size: Size
  ytUrl: string
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
          <a
          href={ytUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="gallery-page__cta"
          onClick={e => e.stopPropagation()}
        >
          Watch
        </a>
      </div>
    </div>
  )
}

const categoryLabel: Record<Category, string> = {
  all:            'Selected Works',
  commercial:     'Commercials',
  'music-videos': 'Music Videos',
  movies:         'Films',
}

export default function Gallery() {
  const [active, setActive] = useState<Category>('all')

  const filtered = galleryItems.filter(
    item => active === 'all' || item.category === active
  )

  const columns = balanceColumns(filtered, 3)

  return (
    <div className="gallery-page">

      {/* Header */}
      <div className="gallery-page__header">
        <div className="gallery-page__header-left">
          <p className="gallery-page__header-eyebrow">Portfolio</p>
          <h1 className="gallery-page__header-title">
            The <em>Gallery</em>
          </h1>
          
        </div>
        <div className="gallery-page__header-right">
          <div className="gallery-page__header-count">
            {filtered.length}
          </div>
          <div className="gallery-page__header-count-label">
            {categoryLabel[active]}
          </div>
        </div>
      </div>

      {/* Desktop filter */}
      <div className="gallery-page__filter">
        {(['all', 'commercial', 'music-videos', 'movies'] as Category[]).map(key => (
          <button
            key={key}
            className={`gallery-page__filter-btn${active === key ? ' gallery-page__filter-btn--active' : ''}`}
            onClick={() => setActive(key)}
          >
            {{ all: 'All', commercial: 'Commercial', 'music-videos': 'Music Videos', movies: 'Movies' }[key]}
          </button>
        ))}
      </div>

      {/* Mobile dropdown */}
      <select
        className="gallery-page__filter-select"
        value={active}
        onChange={e => setActive(e.target.value as Category)}
      >
        <option value="all">All</option>
        <option value="commercial">Commercial</option>
        <option value="music-videos">Music Videos</option>
        <option value="movies">Movies</option>
      </select>

      {/* Grid */}
      <div className="gallery-page__columns">
        {columns.map((col, ci) => (
          <div key={ci} className="gallery-page__col">
            {col.map((item, i) => (
              <GalleryItem key={i} {...item} />
            ))}
          </div>
        ))}
      </div>

    </div>
  )
}