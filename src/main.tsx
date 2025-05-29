import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CssBaseline } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import router from './router.tsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
        {import.meta.env.MODE !== 'production' && <ReactQueryDevtools />}
        <RouterProvider router={router} />
      </QueryClientProvider>
  </StrictMode>
)
