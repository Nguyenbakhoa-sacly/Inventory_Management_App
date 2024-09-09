import { useDispatch, useSelector } from "react-redux"
import AuthRouter from "./AuthRouter"
import MainRouter from "./MainRouter"
import { useEffect, useState } from "react"
import { Spin } from "antd"
import { localDataNames } from "../constants/appInfos"
import { addAuth } from "../redux/reducers/authReducer."

const Routers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const auth = useSelector((state: any) => state.auth.data)
  const dispatch = useDispatch()

  useEffect(() => {
    getData();
  }, [])
  const getData = async () => {
    const res = localStorage.getItem(localDataNames.authData);
    res && dispatch(addAuth(JSON.parse(res)));
  }
  return isLoading ? <Spin /> : !auth.token ? <AuthRouter /> : <MainRouter />
}

export default Routers