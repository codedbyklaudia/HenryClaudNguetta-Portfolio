import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/_navbar.scss'
import sunImg from '../images/sun.png'

export default function Navbar({ showSun = true }: { showSun?: boolean }) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const close = () => setOpen(false)
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <>
      <nav className="navbar">
        {showSun && (
          <Link to="/" className="navbar__logo" onClick={close}>
            <div className="navbar__sun-wrap">
              <img src={sunImg} alt="Logo" className="navbar__sun" />
            </div>
          </Link>
        )}
        <button
          className="navbar__burger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-overlay${open ? ' open' : ''}`}>
        <button className="nav-overlay__close" onClick={close} aria-label="Close menu">
          ✕
        </button>

        <div className="nav-overlay__sun-wrap">
          <img src={sunImg} alt="" className="nav-overlay__sun" />
        </div>

        <nav className="nav-overlay__links">
          <Link to="/"    onClick={close}>Home</Link>
          <Link to="/about"    onClick={close}>About Me</Link>
          <Link to="/gallery"  onClick={close}>Gallery</Link>
          <Link to="/showreel" onClick={close}>Showreel</Link>
          <Link to="/contact"  onClick={close}>Contact</Link>
        </nav>

        <div className="nav-overlay__signature">
          <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 30 C20 8, 35 5, 42 18 C49 30, 56 10, 66 14 C76 18, 80 28, 90 22 C98 17, 105 12, 112 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="nav-overlay__social">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
          <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" aria-label="Vimeo">V</a>
        </div>

        <div className="nav-overlay__theme">
          <span>Theme</span>
          <button onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☽' : '☀'}
            <span className="nav-overlay__theme-arrow">∨</span>
          </button>
        </div>
      </div>
    </>
  )
}