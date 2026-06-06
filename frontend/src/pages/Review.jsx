import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import CodeEditor from '../components/review/CodeEditor'
import ReviewPanel from '../components/review/ReviewPanel'
import SessionHistory from '../components/review/SessionHistory'
import api from '../lib/api'
import { useAuthToken } from '../hooks/useAuth'

export default function Review() {
  const [code, setCode] = useState('')
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [optimising, setOptimising] = useState(false)
  const [activeSessionId, setActiveSessionId] = useState(null)
  const [sessionsKey, setSessionsKey] = useState(0)
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [isOptimised, setIsOptimised] = useState(false)
  const { getToken } = useAuth()
  useAuthToken()

  const handleNewSession = () => {
    setCode('')
    setReview(null)
    setActiveSessionId(null)
    setIsReadOnly(false)
    setIsOptimised(false)
    setSessionsKey(prev => prev + 1) 
  }

  const handleAnalyse = async () => {
  if (!code.trim()) return
  setLoading(true)
  setReview(null)
  try {
    const token = await getToken()
    const res = await api.post(
      '/api/review',
      { code },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setReview(res.data.review)
    setActiveSessionId(res.data.sessionId)
    setIsReadOnly(false)
    setIsOptimised(false)
    setSessionsKey(prev => prev + 1)
  } catch (err) {
    console.error('Review failed', err)
  } finally {
    setLoading(false)
  }
}

  const handleOptimise = async () => {
    if (!code.trim()) return
    setOptimising(true)
    const previousReview = review
    try {
      const token = await getToken()
      const res = await api.post(
        '/api/review/optimise',
        { code },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCode(res.data.optimisedCode)
      setIsReadOnly(false)

      const reviewRes = await api.post(
        '/api/review',
        { code: res.data.optimisedCode },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setReview({
        ...reviewRes.data.review,
        previousTimeComplexity: previousReview?.timeComplexity?.split(' - ')[0]?.split('—')[0]?.trim(),
        previousSpaceComplexity: previousReview?.spaceComplexity?.split(' - ')[0]?.split('—')[0]?.trim(),
      })
      setActiveSessionId(reviewRes.data.sessionId)
      setSessionsKey(prev => prev + 1)
      setIsOptimised(true)
    } catch (err) {
      console.error('Optimise failed', err)
    } finally {
      setOptimising(false)
    }
  }

  const handleSessionSelect = async (sessionId) => {
    if (sessionId === activeSessionId) return
    try {
      const token = await getToken()
      const res = await api.get(
        `/api/sessions/${sessionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCode(res.data.code)
      setReview(res.data.review)
      setActiveSessionId(sessionId)
      setIsReadOnly(true)
      setIsOptimised(false)
    } catch (err) {
      console.error('Failed to load session', err)
    }
  }

  return (
  <div className="flex h-screen pt-12 bg-black">
    <SessionHistory
      onSelect={handleSessionSelect}
      activeSessionId={activeSessionId}
      onNew={handleNewSession}
      refreshTrigger={sessionsKey}
    />
    <div className="flex flex-1 gap-4 p-4 overflow-hidden">
      <div className="flex-1">
        <CodeEditor
          key={activeSessionId || 'new'}
          code={code}
          onChange={(val) => { setCode(val); setIsOptimised(false) }}
          onAnalyse={handleAnalyse}
          onOptimise={handleOptimise}
          loading={loading}
          optimising={optimising}
          isReadOnly={isReadOnly}
          isOptimised={isOptimised}
        />
      </div>
      <div className="w-96">
        <ReviewPanel
          review={review}
          loading={loading}
        />
      </div>
    </div>
  </div>
)
}