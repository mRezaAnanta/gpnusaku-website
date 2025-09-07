const Hero = () => {
    return (
        <section className="relative flex justify-center items-start lg:justify-start p-12 min-h-[80vh] overflow-hidden">
            <video
                loop
                autoPlay
                muted
                playsInline
                id="bg-video"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="/storage/bgvideogpnusa.webm" type="video/webm" />
                Your browser does not support the video tag.
            </video>

            <div className="relative z-10 flex flex-col bg-black/50 lg:max-w-1/2 p-6 gap-3 rounded-lg text-white">
                <h1 className="mb-1 text-3xl font-bold font-dancing">
                    Assalamualaikum, Selamat Datang!
                </h1>
                <h3 className="text-xl font-poppins">
                    Temukan pesona alam, budaya, dan keramahan warga di Gampong Nusa. Mulai perjalanan wisatamu sekarang.
                </h3>
                <p className="text-xl font-nunito">
                    Kami memiliki berbagai macam wisata alam, budaya, dan kuliner yang sangat menarik.
                </p>
                <button className="mt-4 w-fit bg-button text-base font-nunito font-bold p-3 rounded-lg">
                    Mulai Perjalanan Wisata
                </button>
            </div>
            {/* TODO: add unmute/muted button */}
        </section>
    )
}

export default Hero
