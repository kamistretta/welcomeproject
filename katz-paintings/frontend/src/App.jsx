import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import PaintingDetailPage from './pages/PaintingDetailPage'
import CommissionPage from './pages/CommissionPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/gallery/:id" element={<PaintingDetailPage />} />
          <Route path="/commission" element={<CommissionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
