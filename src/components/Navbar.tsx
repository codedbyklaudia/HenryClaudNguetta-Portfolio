import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedinIn, faVimeoV } from '@fortawesome/free-brands-svg-icons'
import '../styles/_navbar.scss'
import signImg from '../../images/sign.png'
import signLightImg from '../../images/signature-whiteback.png'
import sunImg from '../images/sun.png'
import moonImg from '../../images/moon.png'

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About Me' },
  { to: '/gallery',  label: 'Gallery' },
  { to: '/showreel', label: 'Showreel' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const close = () => setOpen(false)
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <>
      <nav className="navbar">
        <button
          className={`navbar__burger${open ? ' open' : ''}${isHome ? ' navbar__burger--home' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-overlay${open ? ' open' : ''}`} aria-hidden={!open}>
        <div className="nav-overlay__curtain-left" />
        <div className="nav-overlay__curtain-right" />

        {/* Brand — right half, hidden on mobile */}
        <div className="nav-overlay__brand">
          <div className="nav-overlay__brand-center">
            <img
              src={theme === 'light' ? moonImg : sunImg}
              alt=""
              className="nav-overlay__sun"
              aria-hidden="true"
            />
            <span className="nav-overlay__monogram" aria-hidden="true">HCN</span>
          </div>
          <img
            src={theme === 'light' ? signLightImg : signImg}
            alt="Signature"
            className="nav-overlay__signature"
          />
        </div>

        {/* Links + socials — centred on mobile, left half on desktop */}
        <nav className="nav-overlay__links">
          {NAV_LINKS.map(({ to, label }, i) => (
            <Link
              key={to}
              to={to}
              onClick={close}
              className={`nav-overlay__link${pathname === to ? ' active' : ''}`}
              style={{ '--i': i } as React.CSSProperties}
            >
              {label}
            </Link>
          ))}

          <div className="nav-overlay__social">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" aria-label="Vimeo">
              <FontAwesomeIcon icon={faVimeoV} />
            </a>
            <a href="mailto:work@henryclaudnguetta.co.uk" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </nav>

        {/* Theme toggle — centred on mobile, bottom right on desktop */}
        <div className="nav-overlay__meta">
          <button className="nav-overlay__theme" onClick={toggleTheme} aria-label="Toggle theme">
            <span>Theme</span>
            <span>{theme === 'dark' ? '☽' : '☀'}</span>
          </button>
        </div>
      </div>
    </>
  )
}