import { Link } from 'react-router-dom'
import { Button, Card, Form, Input, Space, Typography } from 'antd'
import { useState } from 'react';
import SocialLogin from './components/SocialLogin';
import { SignUpType } from '../../types/auth.type';

const { Title, Text, Paragraph } = Typography;

const SignUp = () => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignUp = (values: SignUpType) => {
    console.log(values)
  }

  return (
    <>
      <div>
        <Card >
          <div className='text-center'>
            <Title level={2}>Create a new account</Title>
            <Paragraph type='secondary'>Start your 30 days free trial</Paragraph>
          </div>
          <Form
            layout='vertical'
            form={form}
            onFinish={handleSignUp}
            disabled={isLoading}
            size='large'
          >
            <Form.Item
              name='name'
              label='Name'
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input placeholder='Enter your name' allowClear maxLength={100} type='name' />
            </Form.Item>
            <Form.Item
              name='email'
              label='Email'
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input placeholder='Enter your email' allowClear type='name' />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                }]}
            >
              <Input.Password placeholder='Enter your password' maxLength={100} type='password' />
            </Form.Item>
          </Form>
          <div className='my-5'>
            <Button
              onClick={() => form.submit()}
              type='primary' typeof='primary'
              style={{ width: '100%' }}
              size='large'
            >SignUp</Button>
          </div>
          <SocialLogin />
          <div className='text-center mt-5' >
            <Space>
              <Text type='secondary'>Already have an account?</Text>
              <Link to='/login'>Login</Link>
            </Space>
          </div>
        </Card>
      </div>
    </>
  )
}

export default SignUp