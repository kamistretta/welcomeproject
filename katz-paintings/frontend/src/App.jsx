import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import PaintingDetailPage from './pages/PaintingDetailPage'
import CommissionPage from './pages/CommissionPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import AdminCommissionsPage from './pages/AdminCommissionsPage'
import AddPaintingPage from './pages/AddPaintingPage'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-neon-cyan focus:outline focus:outline-2 focus:outline-neon-cyan"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/gallery/:id" element={<PaintingDetailPage />} />
          <Route path="/commission" element={<CommissionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/commissions" element={<AdminCommissionsPage />} />
          <Route path="/admin/add-painting" element={<AddPaintingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
