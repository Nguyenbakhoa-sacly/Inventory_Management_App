import { Link } from 'react-router-dom'
import { Button, Card, Form, Input, Space, Typography } from 'antd'
import { useState } from 'react';
import SocialLogin from './components/SocialLogin';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { SignUpType } from '../../types/auth.type';
import handleAPI from '../../apis/HandleAPI';
import { addAuth } from '../../redux/reducers/authReducer.';


const { Title, Text, Paragraph } = Typography;

const SignUp = () => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch();
  const handleSignUp = async (values: SignUpType) => {
    try {
      const res: any = await handleAPI('/auth/register', values, 'post')
      res.data && dispatch(addAuth(res.data))
      toast.success(res.message)
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <>
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
                  type: 'email',
                  message: 'The input is not valid email!',
                },
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
                }, () => ({
                  validator: (_, value) => {
                    if (value.length < 6) {
                      return Promise.reject(new Error('Password must be at least 6 characters long'));
                    }
                    else {
                      return Promise.resolve();
                    }
                  },
                })
              ]}
            >
              <Input.Password placeholder='Enter your password' maxLength={100} type='password' />
            </Form.Item>
          </Form>
          <div className='my-5'>
            <Button
              loading={isLoading}
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
              <Link to='/'>Login</Link>
            </Space>
          </div>
        </Card>
      </div>
    </>
  )
}

export default SignUp