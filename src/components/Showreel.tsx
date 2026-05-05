import { useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/_showreel.scss'
import showreelVideo from '../../images/ShowreelHCN.mp4'

export default function Showreel() {
  const playerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="showreel">

      {/* Header — same structure as gallery */}
      <div className="showreel__header">
        <div className="showreel__header-left">
          <p className="showreel__header-eyebrow">Henry Claud N'Guetta</p>
          <h1 className="showreel__header-title">
            The <em>Showreel</em>
          </h1>
        </div>
        <div className="showreel__header-right">
          <div className="showreel__header-meta">2024</div>
          <div className="showreel__header-meta-label">Latest Reel</div>
        </div>
      </div>

      

      {/* Player */}
      <div className="showreel__player-section" ref={playerRef}>
        <div className="showreel__player">
          <video
            src={showreelVideo}
            controls
            playsInline
            className="showreel__video"
          />
        </div>

        <div className="showreel__cta-row">
            <a
            href="https://vimeo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="showreel__btn showreel__btn--primary"
          >
            <span>Watch on Vimeo</span>
            <span>↗</span>
          </a>
          <Link to="/contact" className="showreel__btn showreel__btn--secondary">
            Get in touch ↗
          </Link>
        </div>
      </div>

    </div>
  )
}