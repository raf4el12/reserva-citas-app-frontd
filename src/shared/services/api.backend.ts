import Envs from '../envs'
import HttpClient from './http-client'

const API_BACKEND_URL = `${Envs.VITE_API_BACKEND_URL}/api`
const ApiBackend = new HttpClient(API_BACKEND_URL)

ApiBackend.interceptResponse(async (response, context) => {
  if (response.status === 401) {
    try {
      const tempClient = new HttpClient(context.baseUrl)

      await tempClient.post('/auth/refresh')

      return await tempClient.request(context.method, context.endpoint)
    } catch {
      window.location.href = '/auth/login'
    }
  }

  return response
})

export default ApiBackend
