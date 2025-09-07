import CardImg from '@/components/card-img'

const Gallery = () => {
    return (
        <section className="mb-6">
            <h2>Keindahan Alam Gampong Nusa</h2>
            <p>Jelajahi pesona alam kami yang memukau, dari perbukitan hijau hingga sungai yang jernih dan sawah yang membentang.</p>

            <div className="flex flex-col lg:flex-row gap-4">
                <CardImg src="/storage/keindahanalamnusaku1.webp" caption="Panorama alam yang memukau dan asri" width="lg:max-w-1/3" height="min-h-1/3"/>
                <CardImg src="/storage/keindahanalamnusaku2.webp" caption="Perbukitan hijau dan sungai yang bersih" width="lg:max-w-1/3" height="min-h-1/3"/>
                <CardImg src="/storage/keindahanalamnusaku3.webp" caption="Hamparan sawah yang subur dan hijau" width="lg:max-w-1/3" height="min-h-1/3"/>
            </div>
        </section>
    )
}

export default Gallery
