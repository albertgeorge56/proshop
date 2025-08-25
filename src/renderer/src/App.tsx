import { Navigate, Route, Routes, useNavigate } from 'react-router'
import Register from './pages/Register'
import TopBar from './components/TopBar'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
import Company from './pages/Company'
import DashboardLayout from './components/DashboardLayout'
import Product from './pages/Product'
import Group from './pages/Group'

console.log(import.meta.env.DEV ? 'Dev Mode' : 'Prod')

export default function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      if (e.altKey && e.code == 'ArrowLeft') {
        e.preventDefault()
        navigate(-1)
      }
      if (e.altKey && e.code == 'ArrowRight') {
        e.preventDefault()
        navigate(1)
      }
    }
    window.addEventListener('keydown', keyPressHandler)
    return () => window.removeEventListener('keydown', keyPressHandler)
  }, [])
  return (
    <div className="h-screen w-full select-none bg-primary-200">
      <TopBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="company" element={<Company />} />
          <Route path="group" element={<Group />} />
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>
    </div>
  )
}
