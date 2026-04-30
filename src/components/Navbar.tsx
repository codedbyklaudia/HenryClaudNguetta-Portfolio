import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn, faVimeoV } from '@fortawesome/free-brands-svg-icons'
import '../styles/_navbar.scss'
import sunImg from '../images/sun.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
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
          className="navbar__burger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span /><span /><span />
        </button>
      </nav>
      <div className={`nav-overlay${open ? ' open' : ''}`}>
        <button className="nav-overlay__close" onClick={close} aria-label="Close menu">✕</button>
        <div className="nav-overlay__sun-wrap">
          <img src={sunImg} alt="" className="nav-overlay__sun" />
        </div>
        <nav className="nav-overlay__links">
          <Link to="/"         onClick={close}>Home</Link>
          <Link to="/about"    onClick={close}>About Me</Link>
          <Link to="/gallery"  onClick={close}>Gallery</Link>
          <Link to="/showreel" onClick={close}>Showreel</Link>
          <Link to="/contact"  onClick={close}>Contact</Link>
        </nav>
        <div className="nav-overlay__signature">
          <img src="../../images/sign.png" alt="Signature" />
        </div>
        <div className="nav-overlay__social">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          <a href="https://vimeo.com"    target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faVimeoV} /></a>
        </div>
        <div className="nav-overlay__theme">
          <span>Theme</span>
          <button onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☽' : '☀'}
            <span className="nav-overlay__theme-arrow"></span>
          </button>
        </div>
      </div>
    </>
  )
}