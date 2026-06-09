import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Review from './pages/Review'
import Visualise from './pages/Visualise'
import SSOCallback from './pages/SSOCallback'
import PageLoader from './components/common/PageLoader'

import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'


const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return null

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />
  }

  return children
}

function PageTitle({ title }) {
  useEffect(() => {
    document.title = title ? `${title} | CodeCritic` : 'CodeCritic — AI Code Review'
  }, [title])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <PageLoader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sso-callback" element={<SSOCallback />} />
        <Route
          path="/review"
          element={
            <ProtectedRoute>
              <Review />
            </ProtectedRoute>
          }
        />
        <Route
          path="/visualise"
          element={
            <ProtectedRoute>
              <Visualise />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App