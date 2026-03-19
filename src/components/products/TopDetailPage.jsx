import heroBg from '../../assets/images/storeBackground.png'

function TopPage() {
    return (
        // -mt-14 pulls the hero up behind the header so the logo overlaps into the banner
        <section className="relative w-full h-[340px] sm:h-[400px] md:h-[440px] overflow-hidden -mt-14">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroBg})` }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Text – sits below the logo's bottom edge (logo is 128px, header 56px → overlap 72px) */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-28 sm:pt-24">
                <h1 className="text-white text-3xl sm:text-5xl md:text-[3.5rem] font-bold tracking-wide drop-shadow-lg leading-tight">
                    Chi tiết sản phẩm
                </h1>

            </div>
        </section>
    )
}

export default TopPage
