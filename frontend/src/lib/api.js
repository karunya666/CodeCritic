import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach Clerk token to every request
api.interceptors.request.use(async (config) => {
  try {
    const token = await window.__clerk_token?.()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (e) {
    // no token
  }
  return config
})

export default api