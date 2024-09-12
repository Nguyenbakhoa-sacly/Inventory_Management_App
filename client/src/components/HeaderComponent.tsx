import { Avatar, Button, Input, Layout } from "antd"
import { BiSearch } from "react-icons/bi"
import { GoBell } from "react-icons/go"

const { Header } = Layout

const HeaderComponent = () => {
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
            <Avatar src={'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'} />
          </div>
        </div>
      </Header >
    </>
  )
}

export default HeaderComponent