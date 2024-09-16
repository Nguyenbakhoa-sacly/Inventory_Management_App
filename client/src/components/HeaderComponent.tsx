import { Avatar, Button, Dropdown, Input, Layout, MenuProps } from "antd"
import { BiSearch } from "react-icons/bi"
import { GoBell } from "react-icons/go"
import { useDispatch, useSelector } from "react-redux"
import { auth } from "../firebase/firebase.config"
import { remoAuth } from "../redux/reducers/authReducer."
import { useNavigate } from "react-router-dom"

const { Header } = Layout

const HeaderComponent = () => {
  const imageUser = useSelector((state: any) => state.auth?.data?.rest?.photoUrl)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: 'Đăng xuất',
      onClick: () => {
        auth.signOut()
        dispatch(remoAuth())
        localStorage.clear()
        navigate('/')
      }
    },
  ]

  return (
    <>
      <Header >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-10">
            <Input
              style={{}}
              placeholder="Search product, supplier, order"
              prefix={<BiSearch className="" size={20} />}
            />
          </div>
          <div className="col-span-2 flex items-center justify-end gap-4">
            <Button icon={<GoBell size={20} />} />
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <Avatar src={imageUser} />
            </Dropdown>
          </div>
        </div>
      </Header >
    </>
  )
}

export default HeaderComponent