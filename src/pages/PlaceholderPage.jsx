import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import BrandLeafIcon from '../components/common/BrandLeafIcon'

function PlaceholderPage({ title, bgImage = '' }) {
  let outletContext
  try {
    outletContext = useOutletContext()
  } catch {
    outletContext = null
  }

  useEffect(() => {
    if (outletContext?.setBannerConfig) {
      outletContext.setBannerConfig({ title, bgImage })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, bgImage])

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-green-600">
        <BrandLeafIcon size={40} className="text-white" />
      </span>
      <p className="text-gray-400 text-base">Trang này đang được xây dựng. Vui lòng quay lại sau.</p>
      <a href="/" className="mt-8 inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full transition-colors duration-300">
        Về trang chủ
      </a>
    </div>
  )
}

export default PlaceholderPage
