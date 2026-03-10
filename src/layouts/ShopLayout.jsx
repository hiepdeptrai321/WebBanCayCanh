import { Outlet } from 'react-router-dom'
import HeaderShop from '../components/layout/HeaderShop'
import Footer from '../components/layout/Footer'

function ShopLayout() {
  return (
    <div>
      <HeaderShop />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default ShopLayout
