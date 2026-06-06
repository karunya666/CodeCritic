import { useAuth as useClerkAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

export const useAuthToken = () => {
  const { getToken, isSignedIn } = useClerkAuth()

  useEffect(() => {
    // Expose token getter globally so axios interceptor can use it
    window.__clerk_token = getToken
    return () => {
      delete window.__clerk_token
    }
  }, [getToken])

  return { getToken, isSignedIn }
}