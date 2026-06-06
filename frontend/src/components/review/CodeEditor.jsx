import Editor from '@monaco-editor/react'
import { useRef, useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export default function CodeEditor({ code, onChange, onAnalyse, onOptimise, loading, optimising, isReadOnly, isOptimised }) {
  const editorRef = useRef(null)
  const monacoRef = useRef(null)
  const [detectedLang, setDetectedLang] = useState('plaintext')
  const [copied, setCopied] = useState(false)
  const detectTimeout = useRef(null)

  useEffect(() => {
    if (!code || code.trim().length < 10) {
      setDetectedLang('plaintext')
      return
    }
    // Debounce — wait 1 second after user stops typing
    clearTimeout(detectTimeout.current)
    detectTimeout.current = setTimeout(async () => {
      try {
        const token = await window.__clerk_token?.()
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/review/detect`,
          { code },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const lang = res.data.language
        setDetectedLang(lang)
        if (monacoRef.current && editorRef.current) {
          monacoRef.current.editor.setModelLanguage(
            editorRef.current.getModel(),
            lang
          )
        }
      } catch (err) {
        // fallback silently
      }
    }, 1000)

    return () => clearTimeout(detectTimeout.current)
  }, [code])

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco

    monaco.editor.defineTheme('codecritic', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '7B7FE8', fontStyle: 'bold' },
        { token: 'string', foreground: 'E5C07B' },
        { token: 'number', foreground: '56B6C2' },
        { token: 'comment', foreground: '4A4A5A', fontStyle: 'italic' },
        { token: 'function', foreground: '61AFEF' },
        { token: 'type', foreground: 'C678DD' },
        { token: 'variable', foreground: 'e5e5e5' },
        { token: 'operator', foreground: '89DDFF' },
        { token: 'delimiter', foreground: '6A6A7A' },
        { token: 'identifier', foreground: 'e5e5e5' },
      ],
      colors: {
        'editor.background': '#080808',
        'editor.foreground': '#e5e5e5',
        'editor.lineHighlightBackground': '#111111',
        'editorLineNumber.foreground': '#333333',
        'editorLineNumber.activeForeground': '#8A8A8E',
        'editor.selectionBackground': '#5E5CE620',
        'editor.inactiveSelectionBackground': '#5E5CE610',
        'editorIndentGuide.background': '#1a1a1a',
        'editorIndentGuide.activeBackground': '#333333',
        'editorCursor.foreground': '#5E5CE6',
      }
    })
    monaco.editor.setTheme('codecritic')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden"
      style={{
        background: '#080808',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Title bar */}
      <div className="flex items-center px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#FF453A' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#FFD60A' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#32D74B' }} />
          <span className="ml-3 text-xs font-mono" style={{ color: '#8A8A8E' }}>
            {isReadOnly ? 'read only' : 'code'}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 rounded transition-all duration-150 text-xs font-mono"
            style={{
              background: copied ? 'rgba(50,215,75,0.08)' : 'rgba(255,255,255,0.04)',
              border: copied ? '1px solid rgba(50,215,75,0.2)' : '1px solid rgba(255,255,255,0.06)',
              color: copied ? '#32D74B' : '#8A8A8E',
            }}
          >
            {copied ? (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                copied
              </>
            ) : (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                copy
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded"
            style={{
              background: 'rgba(94,92,230,0.08)',
              border: '1px solid rgba(94,92,230,0.15)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-mono" style={{ color: '#5E5CE6' }}>
              {detectedLang}
            </span>
          </div>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={detectedLang}
          value={code}
          onChange={onChange}
          onMount={handleEditorMount}
          options={{
            fontSize: 13,
            fontFamily: 'JetBrains Mono, monospace',
            fontLigatures: true,
            lineHeight: 1.8,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            renderLineHighlight: isReadOnly ? 'none' : 'line',
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            scrollbar: { vertical: 'auto', horizontal: 'hidden' },
            padding: { top: 16, bottom: 16 },
            readOnly: isReadOnly,
            cursorStyle: isReadOnly ? 'line-thin' : 'line',
            cursorBlinking: isReadOnly ? 'hidden' : 'blink',
          }}
        />
      </div>

      {/* Buttons — hidden in read only mode */}
      {!isReadOnly && (
        <div className="px-4 py-3 flex gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={onAnalyse}
            disabled={loading || !code?.trim()}
            className="flex-1 py-2.5 rounded text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2"
            style={{
              background: loading || !code?.trim() ? '#1a1a1a' : '#5E5CE6',
              color: loading || !code?.trim() ? '#8A8A8E' : '#fff',
            }}
            onMouseEnter={e => { if (!loading && code?.trim()) e.currentTarget.style.background = '#4D4AD5' }}
            onMouseLeave={e => { if (!loading && code?.trim()) e.currentTarget.style.background = '#5E5CE6' }}
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#333" strokeWidth="2"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#5E5CE6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Analysing...
              </>
            ) : '✦ Analyse'}
          </button>

          <button
            onClick={onOptimise}
            disabled={optimising || !code?.trim() || isOptimised}
            className="flex-1 py-2.5 rounded text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2"
            style={{
              background: optimising || !code?.trim() || isOptimised ? '#1a1a1a' : '#111',
              color: optimising || !code?.trim() || isOptimised ? '#8A8A8E' : '#00D2FF',
              border: '1px solid rgba(0,210,255,0.2)',
            }}
            onMouseEnter={e => { if (!optimising && code?.trim() && !isOptimised) e.currentTarget.style.background = 'rgba(0,210,255,0.08)' }}
            onMouseLeave={e => { if (!optimising && code?.trim() && !isOptimised) e.currentTarget.style.background = '#111' }}
          >
            {isOptimised ? '✓ Optimised' : optimising ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#333" strokeWidth="2"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#00D2FF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Optimising...
              </>
            ) : '◈ Optimise'}
          </button>
        </div>
      )}
    </div>
  )
}