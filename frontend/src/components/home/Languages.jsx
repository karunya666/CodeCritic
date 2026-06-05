import { DiJavascript1, DiPython, DiJava, DiRuby, DiPhp, DiSwift } from 'react-icons/di'
import { SiTypescript, SiCplusplus, SiGo, SiRust, SiKotlin, SiDotnet } from 'react-icons/si'

const languages = [
  { name: 'JavaScript', icon: <DiJavascript1 size={28} color='#F7DF1E' /> },
  { name: 'Python', icon: <DiPython size={28} color='#3776AB' /> },
  { name: 'TypeScript', icon: <SiTypescript size={24} color='#3178C6' /> },
  { name: 'Java', icon: <DiJava size={28} color='#007396' /> },
  { name: 'C++', icon: <SiCplusplus size={24} color='#00599C' /> },
  { name: 'Go', icon: <SiGo size={28} color='#00ACD7' /> },
  { name: 'Rust', icon: <SiRust size={24} color='#CE422B' /> },
  { name: 'Ruby', icon: <DiRuby size={28} color='#CC342D' /> },
  { name: 'PHP', icon: <DiPhp size={28} color='#777BB4' /> },
  { name: 'Swift', icon: <DiSwift size={28} color='#FA7343' /> },
  { name: 'Kotlin', icon: <SiKotlin size={24} color='#7F52FF' /> },
  { name: 'C#', icon: <SiDotnet size={24} color='#512BD4' /> },
]

export default function Languages() {
  return (
    <section className="px-8 py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest font-medium mb-3"
            style={{ color: '#32D74B' }}
          >
            Language support
          </p>
          <h2 className="text-4xl font-bold text-white tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Every language. One reviewer.
          </h2>
          <p className="text-sm text-text-muted mt-4 max-w-md mx-auto leading-relaxed">
            From scripting to systems programming — CodeCritic understands them all.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-6 gap-3">
          {languages.map((lang, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200"
              style={{
                background: '#080808',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)'
                e.currentTarget.style.background = '#111111'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'
                e.currentTarget.style.background = '#080808'
              }}
            >
              <div className="flex items-center justify-center w-8 h-8">
                {lang.icon}
              </div>
              <span className="text-xs text-text-muted font-medium">{lang.name}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          + many more including Dart, Scala, Haskell, R, MATLAB and others
        </p>

      </div>
    </section>
  )
}