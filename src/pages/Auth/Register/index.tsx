'use client';

import { Button, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';

const { Text } = Typography;

export default function RegisterPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Register values:', values);
    // TODO: Gọi API đăng ký
  };

  return (
    <AuthLayout title='Create Account ✨' subtitle='Sign up to get started'>
      <Form form={form} layout='vertical' size='large' onFinish={onFinish} autoComplete='off'>
        <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input placeholder='example@email.com' />
        </Form.Item>

        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Register
          </Button>
        </Form.Item>
      </Form>

      <div className='mt-6 text-center'>
        <Text type='secondary'>
          Already have an account?{' '}
          <Link to={'/login'} className='font-medium text-blue-600 hover:text-blue-500'>
            Sign in
          </Link>
        </Text>
      </div>
    </AuthLayout>
  );
}
