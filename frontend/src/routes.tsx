import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/login/LoginPage'
import { HomePage } from './pages/home/HomePage'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
