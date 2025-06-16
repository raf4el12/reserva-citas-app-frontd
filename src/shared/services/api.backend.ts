import Envs from '../envs'
import HttpClient from './http-client'

const API_BACKEND_URL = `${Envs.VITE_API_BACKEND_URL}/api`
const ApiBackend = new HttpClient(API_BACKEND_URL)

export default ApiBackend
