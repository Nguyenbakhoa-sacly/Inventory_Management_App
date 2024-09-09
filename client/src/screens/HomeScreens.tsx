import { Button } from "antd"
import { useDispatch } from "react-redux"
import { remoAuth } from "../redux/reducers/authReducer."

const HomeScreens = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(remoAuth({}))
  }
  return (
    <div>
      <Button
        onClick={() => handleLogout()}
      >Logout</Button>
    </div>
  )
}

export default HomeScreens