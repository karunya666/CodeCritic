import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import ProfileMenu from './ProfileMenu'

export default function Navbar() {
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  const handleProtectedNav = (path) => {
    if (!isSignedIn) {
      navigate('/sign-in')
    } else {
      navigate(path)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-12"
      style={{
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      {/* Logo */}
<Link to="/" className="flex items-center gap-2">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" stroke="#5E5CE6" strokeWidth="1.5"/>
    <path d="M6 10L9 7L12 10L9 13L6 10Z" stroke="#5E5CE6" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M11 10H14" stroke="#00D2FF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 8L14 10L12 12" stroke="#00D2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  <span className="text-white font-semibold text-base tracking-tight">
    CodeCritic
  </span>
</Link>

      {/* Nav Links */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => handleProtectedNav('/review')}
          className="px-3 py-1.5 text-xs rounded text-text-muted hover:text-white hover:bg-white/5 transition-all duration-150 tracking-wide"
        >
          Code Review
        </button>
        <button
          onClick={() => handleProtectedNav('/visualise')}
          className="px-3 py-1.5 text-xs rounded text-text-muted hover:text-white hover:bg-white/5 transition-all duration-150 tracking-wide"
        >
          Visualise
        </button>
      </div>

      {/* Auth */}
      <div className="flex items-center gap-2">
        {isSignedIn ? (
          <ProfileMenu />
        ) : (
          <div className="flex items-center gap-1.5">
            <Link
              to="/sign-in"
              className="px-3 py-1.5 text-xs text-text-muted hover:text-white transition-colors duration-150 tracking-wide"
            >
              Log in
            </Link>
            <Link
              to="/sign-up"
              className="px-3 py-1.5 text-xs rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors duration-150 tracking-wide"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}