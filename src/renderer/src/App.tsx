import { Navigate, Route, Routes } from 'react-router'
import Register from './pages/Register'
import TopBar from './components/TopBar'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div className="h-screen w-full select-none bg-primary-200">
      <TopBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
