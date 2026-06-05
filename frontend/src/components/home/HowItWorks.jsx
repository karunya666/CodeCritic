export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Paste your code',
      description: 'Drop any code snippet into the editor. Any language, any size, any complexity.',
      color: '#5E5CE6',
    },
    {
      number: '02',
      title: 'AI analyses it',
      description: 'CodeCritic scans for errors, improvements, and calculates time & space complexity instantly.',
      color: '#00D2FF',
    },
    {
      number: '03',
      title: 'Review & improve',
      description: 'Get a detailed breakdown. Fix issues, apply suggestions, and ship better code.',
      color: '#32D74B',
    },
  ]

  return (
    <section className="px-8 py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest font-medium mb-3"
            style={{ color: '#00D2FF' }}
          >
            How it works
          </p>
          <h2 className="text-4xl font-bold text-white tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Three steps to better code
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-8 relative">

          {/* Connector line */}
          <div className="absolute top-8 left-1/6 right-1/6 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
          />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">

              {/* Number circle */}
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 relative"
                style={{
                  background: '#080808',
                  border: `1px solid rgba(255,255,255,0.08)`,
                  boxShadow: `0 0 20px ${step.color}22`,
                }}
              >
                <span className="font-mono text-sm font-semibold"
                  style={{ color: step.color }}
                >
                  {step.number}
                </span>
              </div>

              <h3 className="text-base font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}