
import { Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { refreshToken, remoAuth } from "../redux/reducers/authReducer."
import handleAPI from "../apis/HandleAPI"

const HomeScreens = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state: any) => state.auth.data)
  console.log(auth)
  const logout = async () => {
    dispatch(remoAuth())
  }
  const getProducts = async () => {
    try {
      const res: any = await handleAPI('/products')
    } catch (err: any) {
      if (err.error === 'jwt expired') {
        HandleRefreshToken()
      }
    }
  }

  const HandleRefreshToken = async () => {
    try {
      const res: any = await handleAPI(`/refresh-token?id=${auth.rest._id}`)
      dispatch(refreshToken(res.token))
      getProducts()
    } catch (err: any) {
      if (err.error === 'jwt expired') {
        console.log('loix')
      }
    }
  }
  return (
    <div>
      <Button
        onClick={() => getProducts()}
      >Get</Button>
      <Button
        onClick={() => HandleRefreshToken()}
      >Refresh Token</Button>
      <Button
        onClick={() => logout()}
      >Log out</Button>
    </div>
  )
}

export default HomeScreens