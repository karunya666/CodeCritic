import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1200)
    const timer2 = setTimeout(() => setVisible(false), 1700)
    return () => { clearTimeout(timer1); clearTimeout(timer2) }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: '#000',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo */}
        <div style={{ position: 'relative' }}>
          <svg width="48" height="48" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 0 12px rgba(94,92,230,0.4))' }}
          >
            <circle cx="10" cy="10" r="9" stroke="#5E5CE6" strokeWidth="1.5"/>
            <path d="M6 10L9 7L12 10L9 13L6 10Z" stroke="#5E5CE6" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M11 10H14" stroke="#00D2FF" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 8L14 10L12 12" stroke="#00D2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          {/* Diagonal shimmer overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
            backgroundSize: '200% 200%',
            animation: 'shimmer 1.2s ease forwards',
            borderRadius: '50%',
          }} />
        </div>

        {/* Name with shimmer */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <span style={{
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #333 0%, #ffffff 40%, #ffffff 60%, #333 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'textShimmer 1.2s ease forwards',
          }}>
            CodeCritic
          </span>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -100% -100%; opacity: 1; }
          100% { background-position: 200% 200%; opacity: 0; }
        }
        @keyframes textShimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}