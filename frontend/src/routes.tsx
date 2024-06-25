import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/login/LoginPage'
import { HomePage } from './pages/home/HomePage'
import { useAuth } from './hooks/useAuth'

const AppRouter = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/home"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
      />
    </Routes>
  )
}

export default AppRouter
