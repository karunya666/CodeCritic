export default function Features() {
  const features = [
    {
      icon: '⚠',
      title: 'Error Detection',
      description: 'Catches bugs, type errors, logic flaws, and bad practices before they hit production.',
      color: '#FF453A',
      bg: 'rgba(255,69,58,0.08)',
      border: 'rgba(255,69,58,0.2)',
    },
    {
      icon: '⚡',
      title: 'Improvements',
      description: 'Get actionable suggestions on readability, security, performance and best practices.',
      color: '#5E5CE6',
      bg: 'rgba(94,92,230,0.08)',
      border: 'rgba(94,92,230,0.2)',
    },
    {
      icon: '◎',
      title: 'Complexity Analysis',
      description: 'Instant Big-O time and space complexity breakdown with clear explanations.',
      color: '#00D2FF',
      bg: 'rgba(0,210,255,0.08)',
      border: 'rgba(0,210,255,0.2)',
    },
    {
      icon: '◈',
      title: 'All Languages',
      description: 'Python, JavaScript, Java, C++, Go, Rust, PHP, Ruby and every major language supported.',
      color: '#32D74B',
      bg: 'rgba(50,215,75,0.08)',
      border: 'rgba(50,215,75,0.2)',
    },
    {
      icon: '⊞',
      title: 'Session History',
      description: 'Every review is saved. Go back to any past session and pick up where you left off.',
      color: '#FFD60A',
      bg: 'rgba(255,214,10,0.08)',
      border: 'rgba(255,214,10,0.2)',
    },
    {
      icon: '◉',
      title: 'Algorithm Visualiser',
      description: 'See your algorithms come to life with step-by-step visual execution traces.',
      color: '#BF5AF2',
      bg: 'rgba(191,90,242,0.08)',
      border: 'rgba(191,90,242,0.2)',
    },
  ]

  return (
    <section className="px-8 py-24 max-w-6xl mx-auto">

      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest font-medium mb-3"
          style={{ color: '#5E5CE6' }}
        >
          Features
        </p>
        <h2 className="text-4xl font-bold text-white tracking-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          Everything your code needs
        </h2>
        <p className="text-sm text-text-muted mt-4 max-w-md mx-auto leading-relaxed">
          Built for developers who care about quality. Every review is instant, precise, and actionable.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-5 rounded-lg transition-all duration-200 group cursor-default"
            style={{
              background: '#080808',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.border = `1px solid ${f.border}`
              e.currentTarget.style.background = f.bg
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'
              e.currentTarget.style.background = '#080808'
            }}
          >
            <div className="w-8 h-8 rounded-md flex items-center justify-center mb-4 text-base"
              style={{ background: f.bg, color: f.color }}
            >
              {f.icon}
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}