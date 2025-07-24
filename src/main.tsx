// main.tsx
import '@ant-design/v5-patch-for-react-19';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntdApp } from 'antd';
import 'antd/dist/reset.css';
import { AxiosError } from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Create client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // mặc định staleTime nếu muốn
      retry: (failureCount, error) => {
        if (error instanceof AxiosError && error.message === 'Network Error') {
          return false; // Không retry nếu là lỗi CORS hoặc network error
        }
        return failureCount < 3; // Retry tối đa 3 lần
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AntdApp>
          <App />
        </AntdApp>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
