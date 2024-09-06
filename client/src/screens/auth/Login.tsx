
import { Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import SocialLogin from './components/SocialLogin';
import { LogInType } from '../../types/auth.type'
const { Title, Text, Paragraph } = Typography;


const Login = () => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRemember, setIsRemember] = useState<boolean>(false)

  const handleLogin = (values: LogInType) => {
    console.log(values)
  }

  return (
    <div>
      <Card >
        <div className='text-center'>
          <Title level={2}>Login in to your account</Title>
          <Paragraph type='secondary'>Webcome back! Please enter your details</Paragraph>
        </div>
        <Form
          layout='vertical'
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
          size='large'
        >
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
            <Input placeholder='Enter your email' allowClear maxLength={100} type='email' />
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
        <div className="flex justify-between">
          <Checkbox checked={isRemember}
            onChange={(e) => setIsRemember(e.target.checked)}>Remember for 30 days</Checkbox>
          <Link to='/' className='text-blue-600 '>Forgot password?</Link>
        </div>
        <div className='my-5'>
          <Button
            onClick={() => form.submit()}
            type='primary' typeof='primary'
            style={{ width: '100%' }}
            size='large'
          >Login</Button>
        </div>
        <SocialLogin />
        <div className='text-center mt-5' >
          <Space>
            <Text type='secondary'>Don't have an account?</Text>
            <Link to='/sign-up'>Sign Up</Link>
          </Space>
        </div>
      </Card>
    </div>
  )
}

export default Login