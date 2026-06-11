import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import ReviewPanel from '../components/review/ReviewPanel'

export default function ShareSession() {
    const { id } = useParams()
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        document.title = 'Shared Review | CodeCritic'
        fetchSession()
    }, [id])

    const fetchSession = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/sessions/public/${id}`
            )
            setSession(res.data)
        } catch (err) {
            setNotFound(true)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-screen bg-black items-center justify-center">
                <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#1a1a1a" strokeWidth="2" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="#5E5CE6" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
        )
    }

    if (notFound) {
        return (
            <div className="flex h-screen bg-black items-center justify-center flex-col gap-3">
                <p className="text-white text-sm font-medium">Session not found</p>
                <Link to="/" className="text-xs" style={{ color: '#5E5CE6' }}>Go home</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black pt-12">
            <div className="max-w-4xl mx-auto p-6 flex flex-col gap-4">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-text-muted mb-1">Shared review</p>
                        <h1 className="text-lg font-semibold text-white">{session.title}</h1>
                    </div>
                    <span className="text-xs font-mono px-2 py-1 rounded"
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: '#8A8A8E',
                        }}
                    >
                        {session.language}
                    </span>
                </div>

                {/* Code */}
                <div className="rounded-lg overflow-hidden"
                    style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <div className="flex items-center gap-1.5 px-4 py-3"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF453A' }} />
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFD60A' }} />
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#32D74B' }} />
                        <span className="ml-2 text-xs font-mono" style={{ color: '#8A8A8E' }}>read only</span>
                    </div>
                    <pre className="p-4 text-xs font-mono text-white overflow-x-auto leading-relaxed"
                        style={{ color: '#e5e5e5' }}
                    >
                        {session.code}
                    </pre>
                </div>

                {/* Review */}
                <div className="h-96">
                    <ReviewPanel review={session.review} loading={false} />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-center gap-2 pt-4">
                    <p className="text-xs text-text-muted">Reviewed with</p>
                    <Link to="/" className="text-xs font-semibold" style={{ color: '#5E5CE6' }}>
                        CodeCritic
                    </Link>
                </div>
            </div>
        </div>
    )
}