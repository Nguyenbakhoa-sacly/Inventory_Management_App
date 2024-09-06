
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, SignUp } from '../screens'


const AuthRouter = () => {
  return (
    <>
      <div className='w-full h-screen'>
        <div className='grid grid-cols-1 md:grid-cols-2 '>
          <div className='hidden md:flex h-screen justify-center items-center'>
            <div>
              <img
                style={{
                  width: 256,
                  objectFit: 'cover',
                }}
                src="https://firebasestorage.googleapis.com/v0/b/inventory-management-app-8e149.appspot.com/o/logo1.png?alt=media&token=f8b9bdd4-95ec-4994-8830-a5d73a53daf3" alt="" />
            </div>
          </div>
          <div className='h-screen flex justify-center items-center'>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
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