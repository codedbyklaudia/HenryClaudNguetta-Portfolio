import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/HomePage'
import Contact from './components/Contact'
import About from './components/About'
import Footer from './components/Footer'
import './global.scss'

function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <Navbar showSun={!isHome} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<div />} />
        <Route path="/showreel" element={<div />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App