import { Layout, Menu, MenuProps, Typography } from "antd";
import { BiBox, BiHomeAlt } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import { MdOutlineInventory2 } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";

const { Text } = Typography
type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout
const SiderComponent = () => {

  const items: MenuItem[] = [
    {
      key: 'dashboard',
      label: <Link className=" font-medium" to={'/'}>Dashboard</Link>,
      icon: <BiHomeAlt size={20} />,
    },
    {
      key: 'inventory',
      label: <Link className=" font-medium" to={'/inventory'}>Inventory</Link>,
      icon: < MdOutlineInventory2 size={20} />,
    },
    {
      key: 'reports',
      label: <Link className=" font-medium" to={'/reports'}>Reports</Link>,
      icon: <TbReportAnalytics size={20} />,
    },
    {
      key: 'suppliers',
      label: <Link className=" font-medium" to={'/suppliers'}>Suppliers</Link>,
      icon: <FaRegUserCircle size={20} />,
    },
    {
      key: 'orders',
      label: <Link className=" font-medium" to={'/orders'}>Orders</Link>,
      icon: <BiBox size={20} />,
    },
    {
      key: 'managestore',
      label: <Link className=" font-medium" to={'/managestore'}>Manage Store</Link>,
      icon: <FaRegRectangleList size={20} />,
    },

  ]
  return (
    <>
      <Sider theme="light" className="h-screen">
        <div className="flex justify-center items-center p-2 gap-2">
          <img
            style={{
              width: 48,
              height: 48
            }}
            src={'https://firebasestorage.googleapis.com/v0/b/inventory-management-app-8e149.appspot.com/o/Logo.png?alt=media&token=ec8168de-8f25-4802-9334-ff1579ebc4b0'} alt="" />
          <Text style={{
            fontSize: '19px',
            fontWeight: 'bold',
            color: '#1570ef'
          }}>KANBAN</Text>
        </div>
        <Menu
          theme="light"
          items={items}
        />
      </Sider >
    </>
  )
}

export default SiderComponent