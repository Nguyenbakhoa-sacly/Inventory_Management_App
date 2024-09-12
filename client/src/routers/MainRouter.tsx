import { Layout } from "antd"
import { HomeScreen, InventoryScreen, ManagestoreScreen, OrderScreen, ReportScreen, SupplierScreen } from "../screens"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HeaderComponent, SiderComponent } from "../components"

const { Content, Footer } = Layout
const MainRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <SiderComponent />
          <Layout>
            <HeaderComponent />
            <Content>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/inventory" element={<InventoryScreen />} />
                <Route path="/reports" element={<ReportScreen />} />
                <Route path="/suppliers" element={<SupplierScreen />} />
                <Route path="/orders" element={<OrderScreen />} />
                <Route path="/managestore" element={<ManagestoreScreen />} />
              </Routes>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default MainRouter