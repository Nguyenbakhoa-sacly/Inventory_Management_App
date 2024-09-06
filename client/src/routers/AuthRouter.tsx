
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, SignUp } from '../screens'


const AuthRouter = () => {
  return (
    <>
      <div className='w-full h-screen'>
        <div className='grid grid-cols-1 md:grid-cols-2 '>
          <div className='hidden md:flex'>
            hello
          </div>
          <div className='h-screen flex justify-center items-center'>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                {/* Add your other routes here */}
                {/* <Route path="*" element={<NotFound />} /> Handle 404 errors */}
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthRouter