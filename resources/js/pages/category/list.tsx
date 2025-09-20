import { Head, Link, usePage } from '@inertiajs/react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CardCategory from '@/components/card-category'
import { truncateText } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

interface Product {
    id: number;
    name: string;
    description: string;
    manager: string;
    address: string;
    contact: string;
    variants: Array<{
        name: string;
        desc: string;
        price: string;
    }>;
    images: string[];
    primary_image: string | null;
    variant_names: string;
    price_range: {
        min: number;
        max: number;
    };
    created_at: string;
    updated_at: string;
}

interface Category {
    id: number;
    name: string;
    description: string;
}

interface Props {
    category: Category;
    products: Product[];
}

export default function List() {
    const { category, products } = usePage().props as Props;

    return (
        <>
            <Head title={`Kategori - ${category.name}`}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
            </Head>
            <Navbar />
            <main className="bg-gradient-to-b from-green via-light-green to-white p-6 lg:p-24">
                <div className="flex flex-col mx-auto gap-8">
                    {/* Back Button and Category Header */}
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/category"
                            className="flex items-center gap-2 text-dark-green hover:text-green transition-colors duration-200 w-fit"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-nunito font-medium">Kembali ke Kategori</span>
                        </Link>

                        <div className="text-center">
                            <h1 className="font-dancing font-bold text-4xl text-dark-green mb-2">
                                {category.name}
                            </h1>
                            <p className="font-nunito text-lg text-gray-700 max-w-2xl mx-auto">
                                {category.description}
                            </p>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="flex flex-col gap-6">
                        {products && products.length > 0 ? (
                            <>
                                <div className="text-center">
                                    <h2 className="font-nunito font-bold text-2xl text-dark-green">
                                        Produk dalam Kategori Ini ({products.length} produk)
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {products.map(product => (
                                        <CardCategory
                                            key={product.id}
                                            id={product.id}
                                            title={product.name}
                                            description={product.description}
                                            manager={product.manager}
                                            address={product.address}
                                            contact={product.contact}
                                            primaryImage={product.primary_image}
                                            variantNames={product.variant_names}
                                            priceRange={product.price_range}
                                            isProduct={true}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    <h3 className="font-nunito font-bold text-xl text-gray-700 mb-2">
                                        Belum Ada Produk
                                    </h3>
                                    <p className="font-nunito text-gray-500">
                                        Belum ada produk yang terdaftar dalam kategori <strong>{category.name}</strong>.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
