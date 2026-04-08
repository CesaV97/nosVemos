import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import InvitePage from './pages/InvitePage'
import AdminDashboard from './pages/AdminDashboard'
import AdminEditPage from './pages/AdminEditPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/invite/:id" element={<InvitePage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/invite/:id/edit" element={<AdminEditPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
