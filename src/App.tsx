import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/HomePage'
import Contact from './components/Contact'
import About from './components/About'
import Gallery from './components/Gallery'
import Showreel from './components/Showreel'
import Footer from './components/Footer'
import './global.scss'

function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/showreel" element={<Showreel />} />
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