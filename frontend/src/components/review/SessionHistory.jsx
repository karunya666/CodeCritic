import { useEffect, useState } from 'react'
import api from '../../lib/api'
import { useAuthToken } from '../../hooks/useAuth'

export default function SessionHistory({ onSelect, activeSessionId, onNew, refreshTrigger }) {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  useAuthToken()

  useEffect(() => {
    fetchSessions()
  }, [refreshTrigger])

  const fetchSessions = async () => {
    try {
      const res = await api.get('/api/sessions')
      setSessions(res.data)
    } catch (err) {
      console.error('Failed to fetch sessions', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
      await api.delete(`/api/sessions/${id}`)
      setSessions(prev => prev.filter(s => s._id !== id))
    } catch (err) {
      console.error('Failed to delete session', err)
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now - date
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const getLangColor = (lang) => {
    const map = {
      javascript: '#F7DF1E', typescript: '#3178C6',
      python: '#3776AB', java: '#007396',
      cpp: '#00599C', go: '#00ACD7',
      rust: '#CE422B', ruby: '#CC342D',
    }
    return map[lang] || '#8A8A8E'
  }

  return (
    <div className="flex flex-col h-full"
      style={{
        borderRight: '1px solid rgba(255,255,255,0.06)',
        width: '240px',
        minWidth: '240px',
      }}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="text-xs font-medium text-white">History</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">{sessions.length}</span>
          <button
            onClick={onNew}
            className="w-5 h-5 rounded flex items-center justify-center transition-all duration-150"
            style={{
              background: 'rgba(94,92,230,0.1)',
              border: '1px solid rgba(94,92,230,0.2)',
              color: '#5E5CE6',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(94,92,230,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(94,92,230,0.1)'}
            title="New session"
          >
            +
          </button>
        </div>
      </div>

      {/* Sessions list */}
      <div className="flex-1 overflow-y-auto py-2">
        {loading ? (
          <div className="flex items-center justify-center h-20">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#1a1a1a" strokeWidth="2"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#5E5CE6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2 px-4">
            <p className="text-xs text-text-muted text-center">
              No reviews yet. Analyse some code to get started.
            </p>
          </div>
        ) : (
          sessions.map(session => (
            <div
              key={session._id}
              onClick={() => onSelect(session._id)}
              className="group flex flex-col px-4 py-3 cursor-pointer transition-all duration-150 relative"
              style={{
                background: activeSessionId === session._id
                  ? 'rgba(94,92,230,0.08)'
                  : 'transparent',
                borderLeft: activeSessionId === session._id
                  ? '2px solid #5E5CE6'
                  : '2px solid transparent',
              }}
              onMouseEnter={e => {
                if (activeSessionId !== session._id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }
              }}
              onMouseLeave={e => {
                if (activeSessionId !== session._id) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <p className="text-xs text-white font-medium truncate pr-6 mb-1">
                {session.title}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-1.5 py-0.5 rounded"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: getLangColor(session.language),
                    fontSize: '10px',
                  }}
                >
                  {session.language}
                </span>
                <span className="text-xs" style={{ color: '#8A8A8E', fontSize: '10px' }}>
                  {formatDate(session.createdAt)}
                </span>
              </div>
              <button
                onClick={e => handleDelete(e, session._id)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 w-5 h-5 flex items-center justify-center rounded"
                style={{ color: '#8A8A8E' }}
                onMouseEnter={e => e.currentTarget.style.color = '#FF453A'}
                onMouseLeave={e => e.currentTarget.style.color = '#8A8A8E'}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}