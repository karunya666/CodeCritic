import { Link } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

export default function Hero() {
  const { isSignedIn } = useAuth()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden text-center">

      {/* Background grid */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Purple glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full z-0"
        style={{
          background: 'radial-gradient(circle, rgba(94,92,230,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">

        {/* Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full mb-8"
          style={{
            background: 'rgba(94,92,230,0.1)',
            border: '1px solid rgba(94,92,230,0.3)',
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs text-primary tracking-widest uppercase font-medium">
            AI-Powered Code Review
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl font-bold tracking-tight text-white mb-6"
          style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
        >
          Your code,
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #5E5CE6 0%, #00D2FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ruthlessly reviewed.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base text-text-muted max-w-xl mb-10 leading-relaxed">
          Paste any code. Get instant AI feedback on errors, improvements,
          time & space complexity — across every language.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            to={isSignedIn ? '/review' : '/sign-up'}
            className="px-5 py-2.5 rounded text-sm font-medium text-white transition-all duration-150"
            style={{ background: '#5E5CE6' }}
            onMouseEnter={e => e.target.style.background = '#4D4AD5'}
            onMouseLeave={e => e.target.style.background = '#5E5CE6'}
          >
            Start reviewing →
          </Link>
          <Link
            to={isSignedIn ? '/review' : '/sign-in'}
            className="px-5 py-2.5 rounded text-sm font-medium text-text-muted hover:text-white transition-colors duration-150"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            Sign in
          </Link>
        </div>

        {/* Code snippet preview */}
        <div className="mt-16 w-full max-w-2xl rounded-lg overflow-hidden"
          style={{
            background: '#080808',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Window bar */}
          <div className="flex items-center gap-1.5 px-4 py-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF453A' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFD60A' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#32D74B' }} />
            <span className="ml-3 text-xs text-text-muted font-mono">bubble_sort.py</span>
          </div>

          {/* Code */}
          <div className="p-4 text-left font-mono text-xs leading-relaxed">
            <div><span style={{ color: '#5E5CE6' }}>def</span> <span style={{ color: '#00D2FF' }}>bubble_sort</span><span style={{ color: '#8A8A8E' }}>(arr):</span></div>
            <div className="ml-4"><span style={{ color: '#5E5CE6' }}>for</span> <span style={{ color: '#fff' }}>i</span> <span style={{ color: '#5E5CE6' }}>in</span> <span style={{ color: '#00D2FF' }}>range</span><span style={{ color: '#8A8A8E' }}>(</span><span style={{ color: '#00D2FF' }}>len</span><span style={{ color: '#8A8A8E' }}>(arr)):</span></div>
            <div className="ml-8"><span style={{ color: '#5E5CE6' }}>for</span> <span style={{ color: '#fff' }}>j</span> <span style={{ color: '#5E5CE6' }}>in</span> <span style={{ color: '#00D2FF' }}>range</span><span style={{ color: '#8A8A8E' }}>(</span><span style={{ color: '#fff' }}>i</span><span style={{ color: '#8A8A8E' }}>,</span> <span style={{ color: '#00D2FF' }}>len</span><span style={{ color: '#8A8A8E' }}>(arr)):</span></div>
            <div className="ml-12"><span style={{ color: '#5E5CE6' }}>if</span> <span style={{ color: '#fff' }}>arr[j] </span><span style={{ color: '#5E5CE6' }}>&lt;</span><span style={{ color: '#fff' }}> arr[i]:</span></div>
            <div className="ml-16"><span style={{ color: '#fff' }}>arr[i], arr[j] </span><span style={{ color: '#5E5CE6' }}>=</span><span style={{ color: '#fff' }}> arr[j], arr[i]</span></div>
            <div className="mt-2"><span style={{ color: '#5E5CE6' }}>return</span> <span style={{ color: '#fff' }}>arr</span></div>

            {/* AI review overlay */}
            <div className="mt-4 p-3 rounded"
              style={{
                background: 'rgba(94,92,230,0.08)',
                border: '1px solid rgba(94,92,230,0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-xs font-medium" style={{ color: '#5E5CE6' }}>CodeCritic AI</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                ⚠ Time complexity is <span className="text-white">O(n²)</span> — consider using a more efficient algorithm for large inputs. Inner loop range should start at <span className="text-white">0</span> not <span className="text-white">i</span>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}