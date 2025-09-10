import CardImg from '@/components/card-img'

const Gallery = () => {
    return (
        <section className="flex flex-col items-center px-14 mb-6 gap-8">
            <h2 className="font-dancing text-4xl font-bold text-dark-green">Keindahan Alam Gampong Nusa</h2>
            <p className="font-nunito text-lg text-dark-green text-center w-3/5 mb-8">Jelajahi pesona alam kami yang memukau, dari perbukitan hijau hingga sungai yang jernih dan sawah yang membentang.</p>

            <div className="flex flex-col lg:flex-row gap-6">
                <CardImg src="/storage/keindahanalamnusaku1.webp" caption="Panorama alam yang memukau dan asri" width="lg:max-w-1/3" height="min-h-1/3"/>
                <CardImg src="/storage/keindahanalamnusaku2.webp" caption="Perbukitan hijau dan sungai yang bersih" width="lg:max-w-1/3" height="min-h-1/3"/>
                <CardImg src="/storage/keindahanalamnusaku3.webp" caption="Hamparan sawah yang subur dan hijau" width="lg:max-w-1/3" height="min-h-1/3"/>
            </div>
        </section>
    )
}

export default Gallery
