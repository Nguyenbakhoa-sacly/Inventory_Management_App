
import handleAPI from "../apis/HandleAPI"

const HomeScreens = () => {

  const getProducts = async () => {
    try {
      const res: any = await handleAPI('/products')
    } catch (err: any) {
      if (err.error === 'jwt expired') {
      }
    }
  }

  return (
    <div>
      HomeScreens
    </div>
  )
}

export default HomeScreens