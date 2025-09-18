import { Head, Link } from '@inertiajs/react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CardProduct from '@/components/card-product'
import { truncateText } from '@/lib/utils'

interface Category {
    id: number,
    name: string,
    description?: string,
    timestamp: string,
}

interface Props {
    categories: Category[]
}
export default function Index() {
    const category = [
        {
            id: 1,
            name: "Makanan Tradisional",
            description: "Makanan tradisional merupakan hidangan yang resep, cara memasak, dan cara penyajiannya diwariskan secara turun-temurun dalam suatu masyarakat atau daerah...",
            timestamp: "2025-09-11"
        },
        {
            id: 2,
            name: "Minuman",
            description: "Nikmati kesegaran minuman khas yang diolah dari bahan-bahan alami setempat.",
            timestamp: "2025-09-11"
        },
        {
            id: 3,
            name: "Souvenir Desa",
            description: "Bawa pulang kenang-kenangan otentik hasil karya tangan para pengrajin lokal. Setiap souvenir memiliki cerita dan keunikan tersendiri yang mewakili...",
            timestamp: "2025-09-11"
        },
        {
            id: 4,
            name: "Wisata Alam",
            description: "Jelajahi keindahan bentang alam desa yang masih asri dan alami. Nikmati pemandangan hijau, udara yang sejuk, dan suasana tenang yang sempurna untuk...",
            timestamp: "2025-09-11"
        },
        {
            id: 5,
            name: "Wisata Budaya",
            description: "Selami kekayaan tradisi dan adat istiadat masyarakat kami. Saksikan pertunjukan kesenian yang memukau, pelajari sejarah lokal, dan berinteraksi...",
            timestamp: "2025-09-11"
        },
        {
            id: 6,
            name: "Homestay Desa",
            description: "Rasakan pengalaman menginap yang otentik di rumah warga. Nikmati keramahan khas pedesaan, cicipi hidangan rumahan yang lezat, dan jadilah bagian dari...",
            timestamp: "2025-09-11"
        },
        {
            id: 7,
            name: "Paket Wisata",
            description: "Pilih paket wisata kami untuk pengalaman liburan yang terencana, mudah, dan tak terlupakan. Paket ini telah merangkum aktivitas alam, budaya, dan kuliner terbaik...",
            timestamp: "2025-09-11"
        },
    ]
    return (
        <>
            <Head title="Kategori">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Navbar />
            <main className="bg-gradient-to-b from-green via-light-green to-white p-6 lg:p-24">
                <div className="flex flex-col items-center mx-auto gap-4 text-center">
                    <h1 className="font-dancing font-bold text-4xl text-dark-green">Kategori Produk</h1>
                    <p className="font-nunito text-base w-2/3 mb-4">Pilih kategori yang ingin kamu telusuri</p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {category && category.map(c => {
                            return (
                                <Link key={c.id} href={route('category.list', c.id)}>
                                    <CardProduct title={c.name} description={truncateText(c.description, 120)} timestamp={c.timestamp} />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
