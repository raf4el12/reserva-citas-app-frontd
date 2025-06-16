/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type RequestOptions = {
  headers?: Record<string, string>
  middleware?: (request: Request) => Request | Promise<Request>
}
type ContextHttpClient = {
  request: Request
  method: HttpMethod
  baseUrl: string
  endpoint: string
}
type RequestInterceptor = (request: Request) => Request | Promise<Request>
type ResponseInterceptor = (
  response: Response,
  context: ContextHttpClient
) => Response | Promise<Response>
type ErrorInterceptor = (error: any) => any | Promise<any>

export default class HttpClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []
  private errorInterceptors: ErrorInterceptor[] = []

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.defaultHeaders = {}
  }

  interceptRequest(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor)

    return () => {
      const index = this.requestInterceptors.indexOf(interceptor)
      if (index !== -1) {
        this.requestInterceptors.splice(index, 1)
      }
    }
  }

  interceptResponse(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor)

    return () => {
      const index = this.responseInterceptors.indexOf(interceptor)
      if (index !== -1) {
        this.responseInterceptors.splice(index, 1)
      }
    }
  }

  interceptError(interceptor: ErrorInterceptor): () => void {
    this.errorInterceptors.push(interceptor)

    return () => {
      const index = this.errorInterceptors.indexOf(interceptor)
      if (index !== -1) {
        this.errorInterceptors.splice(index, 1)
      }
    }
  }

  private async applyRequestInterceptors(request: Request): Promise<Request> {
    let interceptedRequest = request
    for (const interceptor of this.requestInterceptors) {
      interceptedRequest = await interceptor(interceptedRequest)
    }
    return interceptedRequest
  }

  private async applyResponseInterceptors(
    response: Response,
    context: ContextHttpClient
  ): Promise<Response> {
    let interceptedResponse = response
    for (const interceptor of this.responseInterceptors) {
      interceptedResponse = await interceptor(interceptedResponse, context)
    }
    return interceptedResponse
  }

  private async applyErrorInterceptors(error: any): Promise<any> {
    let interceptedError = error
    for (const interceptor of this.errorInterceptors) {
      interceptedError = await interceptor(interceptedError)
    }
    return interceptedError
  }

  async request<T = any>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const headers = {
      ...this.defaultHeaders,
      ...(options?.headers || {}),
    }

    const config: RequestInit = {
      method,
      headers,
      credentials: 'include'
    }

    if (data && method !== 'GET') {
      config.body = JSON.stringify(data)
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
      }
    }

    let request = new Request(url, config)

    if (options?.middleware) {
      request = await options.middleware(request)
    }

    try {
      request = await this.applyRequestInterceptors(request)

      let response = await fetch(request)

      response = await this.applyResponseInterceptors(response, {
        request,
        method,
        baseUrl: this.baseUrl,
        endpoint,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage =
          errorData.errors && errorData.errors.length > 0
            ? Array.isArray(errorData.errors)
              ? errorData.errors.join('|')
              : errorData.errors[0]
            : errorData.message || `Error in request ${method}`

        throw new Error(errorMessage)
      }

      return response.json()
    } catch (error) {
      const processedError = await this.applyErrorInterceptors(error)
      throw processedError
    }
  }

  async get<T = any>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, options)
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>('POST', endpoint, data, options)
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>('PUT', endpoint, data, options)
  }

  async delete<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, options)
  }
}
