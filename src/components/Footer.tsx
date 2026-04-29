import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn, faVimeoV } from '@fortawesome/free-brands-svg-icons'
import { Phone, Mail } from 'lucide-react'
import '../styles/_footer.scss'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__nav">
        <a href="/contact">Contact</a>
        <a href="/gallery">Gallery</a>
        <a href="/showreel">Showreel</a>
      </div>

      <div className="footer__contact">
        <p>work@henryclaudnguetta.co.uk</p>
        <p>+44 7312 868 327</p>
      </div>

      <div className="footer__social">
        <a href="tel:+447312868327" aria-label="Phone"><Phone size={18} /></a>
        <a href="mailto:work@henryclaudnguetta.co.uk" aria-label="Email"><Mail size={18} /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" aria-label="Vimeo">
          <FontAwesomeIcon icon={faVimeoV} />
        </a>
      </div>

      <div className="footer__credit">
        <p>© Copyright 2026 | Henry Claud N'Guetta</p>
        <p>Website by codedbyklaudia</p>
      </div>
    </footer>
  )
}