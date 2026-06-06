import { useState } from 'react'

const tabs = ['Errors', 'Improvements', 'Complexity']

export default function ReviewPanel({ review, loading }) {
  const [activeTab, setActiveTab] = useState('Errors')

  if (loading) {
    return (
      <div className="flex flex-col h-full rounded-lg items-center justify-center gap-3"
        style={{
          background: '#080808',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#1a1a1a" strokeWidth="2"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#5E5CE6" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p className="text-xs text-text-muted">Analysing your code...</p>
      </div>
    )
  }

  if (!review) {
    return (
      <div className="flex flex-col h-full rounded-lg items-center justify-center gap-3"
        style={{
          background: '#080808',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(94,92,230,0.1)', border: '1px solid rgba(94,92,230,0.2)' }}
        >
          <span style={{ color: '#5E5CE6' }}>✦</span>
        </div>
        <p className="text-sm text-white font-medium">No review yet</p>
        <p className="text-xs text-text-muted text-center max-w-xs">
          Paste your code in the editor and hit Analyse to get instant AI feedback.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden"
      style={{
        background: '#080808',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs font-medium text-white">CodeCritic AI</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs px-2 py-0.5 rounded-full font-mono"
            style={{
              background: 'rgba(94,92,230,0.1)',
              color: '#5E5CE6',
              border: '1px solid rgba(94,92,230,0.2)'
            }}
          >
            {review.language}
          </span>
        </div>
      </div>

      {/* Explanation */}
      {review.explanation && (
        <div className="px-4 py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs text-text-muted leading-relaxed">{review.explanation}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2.5 text-xs font-medium transition-all duration-150 relative"
            style={{
              color: activeTab === tab ? '#fff' : '#8A8A8E',
              borderBottom: activeTab === tab ? '1px solid #5E5CE6' : '1px solid transparent',
            }}
          >
            {tab}
            {tab === 'Errors' && review.errors?.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
                style={{
                  background: 'rgba(255,69,58,0.15)',
                  color: '#FF453A',
                  fontSize: '10px',
                }}
              >
                {review.errors.length}
              </span>
            )}
            {tab === 'Improvements' && review.improvements?.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
                style={{
                  background: 'rgba(94,92,230,0.15)',
                  color: '#5E5CE6',
                  fontSize: '10px',
                }}
              >
                {review.improvements.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">

        {activeTab === 'Errors' && (
          <>
            {review.errors?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <span style={{ color: '#32D74B', fontSize: '20px' }}>✓</span>
                <p className="text-xs text-text-muted">No errors found</p>
              </div>
            ) : (
              review.errors.map((err, i) => (
                <div key={i} className="p-3 rounded-lg"
                  style={{
                    background: 'rgba(255,69,58,0.06)',
                    border: '1px solid rgba(255,69,58,0.15)',
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium uppercase tracking-widest"
                      style={{ color: '#FF453A', fontSize: '10px' }}
                    >
                      {err.severity}
                    </span>
                    {err.line && (
                      <span className="text-xs font-mono"
                        style={{ color: '#8A8A8E', fontSize: '10px' }}
                      >
                        line {err.line}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white leading-relaxed">{err.message}</p>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === 'Improvements' && (
          <>
            {review.improvements?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <span style={{ color: '#32D74B', fontSize: '20px' }}>✓</span>
                <p className="text-xs text-text-muted">No improvements needed</p>
              </div>
            ) : (
              review.improvements.map((imp, i) => (
                <div key={i} className="p-3 rounded-lg"
                  style={{
                    background: 'rgba(94,92,230,0.06)',
                    border: '1px solid rgba(94,92,230,0.15)',
                  }}
                >
                  <span className="text-xs font-medium uppercase tracking-widest block mb-1.5"
                    style={{ color: '#5E5CE6', fontSize: '10px' }}
                  >
                    {imp.category}
                  </span>
                  <p className="text-xs text-white leading-relaxed">{imp.message}</p>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === 'Complexity' && (
  <div className="flex flex-col gap-3">
    <div className="p-4 rounded-lg"
      style={{
        background: 'rgba(0,210,255,0.06)',
        border: '1px solid rgba(0,210,255,0.15)',
      }}
    >
      <p className="text-xs uppercase tracking-widest mb-2"
        style={{ color: '#00D2FF', fontSize: '10px' }}
      >
        Time Complexity
      </p>
      <p className="text-2xl font-bold font-mono text-white">
        {review.timeComplexity?.split(' - ')[0]?.split('—')[0]?.trim() || 'N/A'}
      </p>
      {review.previousTimeComplexity && (
        <p className="text-xs mt-2" style={{ color: '#8A8A8E' }}>
          Before: <span className="font-mono">{review.previousTimeComplexity}</span>
        </p>
      )}
    </div>

    <div className="p-4 rounded-lg"
      style={{
        background: 'rgba(191,90,242,0.06)',
        border: '1px solid rgba(191,90,242,0.15)',
      }}
    >
      <p className="text-xs uppercase tracking-widest mb-2"
        style={{ color: '#BF5AF2', fontSize: '10px' }}
      >
        Space Complexity
      </p>
      <p className="text-2xl font-bold font-mono text-white">
        {review.spaceComplexity?.split(' - ')[0]?.split('—')[0]?.trim() || 'N/A'}
      </p>
      {review.previousSpaceComplexity && (
        <p className="text-xs mt-2" style={{ color: '#8A8A8E' }}>
          Before: <span className="font-mono">{review.previousSpaceComplexity}</span>
        </p>
      )}
    </div>
  </div>
)}
      </div>
    </div>
  )
}