import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './shared/utils/zodLng.ts'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import LoadingPage from './components/commons/LoadingPage.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import router from './router.tsx'
import theme from './theme.ts'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4caf50',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#f44336',
                secondary: '#fff',
              },
            },
          }}
        />
        <QueryClientProvider client={queryClient}>
          {import.meta.env.MODE !== 'production' && <ReactQueryDevtools />}
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Suspense>
  </StrictMode>
)
