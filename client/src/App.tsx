
import { ConfigProvider } from 'antd';
import Routers from './routers/Routers';
function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: '#1570EF',
        },
        components: {},
      }}
    >
      <Routers />
    </ConfigProvider>

  )
}

export default App
