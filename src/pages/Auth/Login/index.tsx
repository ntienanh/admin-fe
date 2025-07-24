import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import React from 'react';
import AuthLayout from '../../../layouts/AuthLayout';

const { Link } = Typography;

interface LoginPageValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: LoginPageValues) => {
    setLoading(true);
    try {
      // Simulate API call
      console.log('Login values:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Handle successful login here
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthLayout title='Welcome Back 👋' subtitle='Sign in to your account'>
      <Form
        form={form}
        name='login'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
        size='large'
      >
        <Form.Item
          name='email'
          label='Email'
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input prefix={<UserOutlined className='text-gray-400' />} placeholder='Enter your email' />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}
        >
          <Input.Password prefix={<LockOutlined className='text-gray-400' />} placeholder='Enter your password' />
        </Form.Item>

        <Form.Item>
          <div className='flex items-center justify-between'>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link href='#' className='text-blue-600 hover:text-blue-500'>
              Forgot password?
            </Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='h-12 w-full text-base font-medium' loading={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Form.Item>
      </Form>

      {/* <Divider>
        <Text type='secondary' className='text-sm'>
          Or continue with
        </Text>
      </Divider>

      <Space direction='vertical' className='w-full' size='middle'>
        <Button
          icon={<GoogleOutlined />}
          className='flex h-12 w-full items-center justify-center'
          onClick={() => console.log('Google login')}
        >
          Continue with Google
        </Button>
      </Space> */}

      {/* <div className='mt-6 text-center'>
        <Text type='secondary'>
          Don't have an account?{' '}
          <Link href='/register' className='font-medium text-blue-600 hover:text-blue-500'>
            Sign up
          </Link>
        </Text>
      </div> */}
    </AuthLayout>
  );
}
