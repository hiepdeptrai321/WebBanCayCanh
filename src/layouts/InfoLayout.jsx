import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderInfo from '../components/layout/HeaderInfo'
import Footer from '../components/layout/Footer'

function InfoLayout() {
  const [bannerConfig, setBannerConfig] = useState({ title: '', bgImage: '' })

  return (
    <div>
      <HeaderInfo title={bannerConfig.title} bgImage={bannerConfig.bgImage} />
      <main>
        <Outlet context={{ setBannerConfig }} />
      </main>
      <Footer />
    </div>
  )
}

export default InfoLayout
