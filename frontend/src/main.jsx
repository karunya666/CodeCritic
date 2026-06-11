import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './styles/globals.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#111',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
          },
          success: {
            iconTheme: { primary: '#32D74B', secondary: '#111' },
          },
          error: {
            iconTheme: { primary: '#FF453A', secondary: '#111' },
          },
        }}
      />
      <App />
    </ClerkProvider>
  </StrictMode>,
)