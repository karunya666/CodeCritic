export default function Visualise() {
  return (
    <div className="flex h-screen pt-12 bg-black items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{
            background: 'rgba(0,210,255,0.08)',
            border: '1px solid rgba(0,210,255,0.2)',
          }}
        >
          <span style={{ color: '#00D2FF', fontSize: '22px' }}>◎</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Visualiser coming soon
        </h2>
        <p className="text-sm text-text-muted max-w-xs leading-relaxed">
          Step-by-step algorithm visualisation is currently in development.
          Check back soon.
        </p>
        <div className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: 'rgba(0,210,255,0.08)',
            border: '1px solid rgba(0,210,255,0.2)',
            color: '#00D2FF',
          }}
        >
          In progress
        </div>
      </div>
    </div>
  )
}