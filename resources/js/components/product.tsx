import { useState } from "react"
import CardImg from '@/components/card-img'
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { Link } from '@inertiajs/react';

// TODO: get dynamic product link
const images = [
    {
        src: "/storage/keindahanalamnusaku1.webp",
        caption: "Hello 1",
        href: "register"
    },
    {
        src: "/storage/keindahanalamnusaku2.webp",
        caption: "Hello 2",
        href: "register"
    },
    {
        src: "/storage/keindahanalamnusaku3.webp",
        caption: "Hello 3",
        href: "register"
    },
]

const Product = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const handlePrev = () => {
        setActiveIndex(index => index === 0 ? images.length - 1 : index - 1)
        console.log(activeIndex);
    }

    const handleNext = () => {
        setActiveIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
        console.log(activeIndex);
    }


    return (
        <section className="flex flex-col items-center gap-4 p-16">
            <h2 className="font-dancing text-3xl text-dark-green font-bold">Produk Unggulan Kami</h2>
            <p className="font-nunito text-base text-dark-green text-center w-3/5">Jelajahi berbagai produk khas desa kami, mulai dari kerajinan tangan, olahan makanan lokal, hingga oleh-oleh yang unik dan ramah lingkungan.</p>
            <button className="my-4 w-fit bg-button text-base font-nunito font-bold text-white py-3 px-5 rounded-lg">
                Lihat Produk Kami
            </button>
            {/* FIX: make a produk img carousel */}
            <div className="relative flex w-full justify-center items-center mb-20 overflow-hidden">
                <button onClick={handlePrev} className="absolute left-0 z-10 p-4 cursor-pointer">
                    <CircleArrowLeft />
                </button>
                <button onClick={handleNext} className="absolute right-0 z-10 p-4 cursor-pointer">
                    <CircleArrowRight />
                </button>
                <div className="relative flex justify-center items-center w-full h-full transition-all duration-500">
                    {images.map((item, index) => {
                        const isActive = index === activeIndex;
                        const isPrev = index === (activeIndex === 0 ? images.length - 1 : activeIndex - 1);
                        const isNext = index === (activeIndex === images.length - 1 ? 0 : activeIndex + 1);

                        let className = "absolute transition-all duration-700 ease-in-out transform";

                        if (isActive) {
                            className += " scale-100 opacity-100 z-20";
                        } else if (isPrev) {
                            className += " -translate-x-40 scale-90 opacity-50 z-10";
                        } else if (isNext) {
                            className += " translate-x-40 scale-90 opacity-50 z-10";
                        } else {
                            className += " opacity-0 scale-75 z-0";
                        }

                        return (
                            <div key={index} className={className}>
                                <Link href={route(item.href)}>
                                    <img src={item.src}/>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default Product
