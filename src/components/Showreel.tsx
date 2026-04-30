import '../styles/_showreel.scss'
import showreelVideo from '../../images/ShowreelHCN.mp4'
import { Link } from 'react-router-dom'

export default function Showreel() {
  return (
    <div className="showreel">
      <div className="showreel__actions">
        <a
          href="https://vimeo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="showreel__btn"
        >
          Play on Vimeo ↗
        </a>
        <Link to="/contact" className="showreel__btn">
          Contact ↗
        </Link>
      </div>

      <div className="showreel__player">
        <video
          src={showreelVideo}
          controls
          playsInline
          className="showreel__video"
        />
      </div>
    </div>
  )
}