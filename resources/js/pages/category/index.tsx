import { Head, Link, usePage } from '@inertiajs/react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CardProduct from '@/components/card-product'
import { truncateText, formatDate } from '@/lib/utils'

interface Category {
    id: number,
    name: string,
    description?: string,
    created_at: string,
}

interface Props {
    categories: Category[]
}
export default function Index() {
    const { categories } = usePage().props as Props;

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
                        {categories && categories.map(c => {
                            return (
                                <Link key={c.id} href={route('category.list', c.id)}>
                                    <CardProduct title={c.name} description={truncateText(c.description, 120)} timestamp={formatDate(c.created_at)} />
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
