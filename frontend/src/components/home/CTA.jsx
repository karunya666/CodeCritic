import { Link } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

export default function CTA() {
  const { isSignedIn } = useAuth()

  return (
    <section className="px-8 py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* CTA Card */}
        <div className="relative rounded-xl overflow-hidden p-16 flex flex-col items-center text-center"
          style={{
            background: '#080808',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(94,92,230,0.2) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest font-medium mb-4"
              style={{ color: '#5E5CE6' }}
            >
              Get started free
            </p>
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Start reviewing
              <br />
              your code today.
            </h2>
            <p className="text-sm text-text-muted max-w-sm mx-auto mb-10 leading-relaxed">
              No credit card. No setup. Just paste your code and get instant AI feedback.
            </p>

            <div className="flex items-center justify-center gap-3">
              <Link
                to={isSignedIn ? '/review' : '/sign-up'}
                className="px-6 py-2.5 rounded text-sm font-medium text-white transition-all duration-150"
                style={{ background: '#5E5CE6' }}
                onMouseEnter={e => e.target.style.background = '#4D4AD5'}
                onMouseLeave={e => e.target.style.background = '#5E5CE6'}
              >
                {isSignedIn ? 'Go to Review →' : 'Start for free →'}
              </Link>
              {!isSignedIn && (
                <Link
                  to="/sign-in"
                  className="px-6 py-2.5 rounded text-sm font-medium text-text-muted hover:text-white transition-colors duration-150"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-semibold text-white">CodeCritic</span>
          </div>
          <p className="text-xs text-text-muted">
            © 2026 CodeCritic. Built for developers.
          </p>
          <div />
        </div>

      </div>
    </section>
  )
}