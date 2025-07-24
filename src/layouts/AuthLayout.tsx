// components/layouts/AuthLayout.tsx
import { Card, Typography } from 'antd';
import type { ReactNode } from 'react';

const { Title, Text } = Typography;

interface AuthLayoutProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export default function AuthLayout({
  title = 'Welcome 👋',
  subtitle = 'Sign in to your account',
  children,
}: AuthLayoutProps) {
  return (
    <div className='flex min-h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-400 via-white to-pink-200 px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-lg shadow-lg'>
        {(title || subtitle) && (
          <div className='mb-8 text-center'>
            {title && (
              <Title level={2} className='mb-2'>
                {title}
              </Title>
            )}
            {subtitle && <Text type='secondary'>{subtitle}</Text>}
          </div>
        )}

        {children}
      </Card>
    </div>
  );
}
