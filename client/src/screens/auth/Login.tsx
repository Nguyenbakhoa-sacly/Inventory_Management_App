
import { Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import SocialLogin from './components/SocialLogin';
import { LogInType } from '../../types/auth.type'
import handleAPI from '../../apis/HandleAPI';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer.';
const { Title, Text, Paragraph } = Typography;
const Login = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRemember, setIsRemember] = useState<boolean>(false)
  const handleLogin = async (values: LogInType) => {
    setIsLoading(true)
    try {
      const res: any = await handleAPI('/auth/login', values, 'post')
      toast.success(res.message)
      res.data && dispatch(addAuth(res.data))
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>
      <Card >
        <div className='flex justify-center mb-3'>
          <img
            style={{
              width: 54,
              height: 54
            }}
            src={'https://firebasestorage.googleapis.com/v0/b/inventory-management-app-8e149.appspot.com/o/Logo.png?alt=media&token=ec8168de-8f25-4802-9334-ff1579ebc4b0'} alt="" />
        </div>
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
              },
            ]}
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
            loading={isLoading}
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