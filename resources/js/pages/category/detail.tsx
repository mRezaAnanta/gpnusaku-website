import { Head, Link, usePage } from '@inertiajs/react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ArrowLeft, MapPin, User, Phone, Package, Tag, Calendar, MessageCircle, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { useState, useEffect } from 'react'
import WhatsApp from '@/components/icon/whatsapp'

interface Product {
    id: number;
    name: string;
    description: string;
    manager: string;
    address: string;
    contact: string;
    category: {
        id: number;
        name: string;
        description: string;
    };
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

interface Props {
    product: Product;
}

export default function Detail() {
    const { product } = usePage().props as Props;
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);

    const formatWhatsAppMessage = (productName: string, managerName: string) => {
        const message = `Halo ${managerName}, saya tertarik dengan produk "${productName}" yang Anda tawarkan. Bisakah Anda memberikan informasi lebih lanjut?`;
        return encodeURIComponent(message);
    };

    const formatPhoneNumber = (phone: string) => {
        // Remove any non-digit characters
        let cleaned = phone.replace(/\D/g, '');
        // If starts with 0, replace with 62
        if (cleaned.startsWith('0')) {
            cleaned = '62' + cleaned.slice(1);
        }
        // If doesn't start with 62, assume it's Indonesian number
        if (!cleaned.startsWith('62')) {
            cleaned = '62' + cleaned;
        }
        return cleaned;
    };

    const whatsappUrl = `https://wa.me/${formatPhoneNumber(product.contact)}?text=${formatWhatsAppMessage(product.name, product.manager)}`;

    const openImageModal = (imageIndex: number) => {
        console.log('Opening modal with image index:', imageIndex);
        setModalImageIndex(imageIndex);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        console.log('Closing modal');
        setIsImageModalOpen(false);
    };

    const navigateModalImage = (direction: 'prev' | 'next') => {
        if (!product.images || product.images.length <= 1) return;

        if (direction === 'prev') {
            setModalImageIndex((prev) =>
                prev === 0 ? product.images.length - 1 : prev - 1
            );
        } else {
            setModalImageIndex((prev) =>
                prev === product.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    // Handle keyboard navigation in modal
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!isImageModalOpen) return;

            switch (e.key) {
                case 'Escape':
                    closeImageModal();
                    break;
                case 'ArrowLeft':
                    navigateModalImage('prev');
                    break;
                case 'ArrowRight':
                    navigateModalImage('next');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isImageModalOpen, product.images]);

    return (
        <>
            <Head title={`${product.name} - Detail Produk`}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
            </Head>
            <Navbar />
            <main className="bg-gradient-to-b from-green via-light-green to-white min-h-screen">
                {/* Breadcrumb Navigation */}
                <div className="bg-dark-green/10 py-4">
                    <div className="container mx-auto px-6 lg:px-24">
                        <div className="flex items-center gap-2 text-sm text-dark-green">
                            <Link href="/category" className="hover:text-green transition-colors duration-200">
                                Kategori
                            </Link>
                            <span>/</span>
                            <Link
                                href={`/category/${product.category.id}`}
                                className="hover:text-green transition-colors duration-200"
                            >
                                {product.category.name}
                            </Link>
                            <span>/</span>
                            <span className="font-medium">{product.name}</span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 lg:px-24 py-8">
                    {/* Back Button */}
                    <Link
                        href={`/category/${product.category.id}`}
                        className="flex items-center gap-2 text-dark-green hover:text-green transition-colors duration-200 mb-8 w-fit"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-nunito font-medium">Kembali ke {product.category.name}</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Images Section */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl group">
                                {product.images && product.images.length > 0 ? (
                                    <button onClick={() => openImageModal(selectedImageIndex)} className="w-full h-full">
                                        <img
                                            src={product.images[selectedImageIndex]}
                                            alt={product.name}
                                            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                                        />
                                        {/* Zoom overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-white/90 rounded-full p-3">
                                                    <ZoomIn className="w-6 h-6 text-dark-green" />
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <Package className="w-16 h-16 text-gray-400" />
                                        </div>
                                    )}
                            </div>

                            {/* Thumbnail Images */}
                            {product.images && product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {product.images.map((image, index) => (
                                        <button key={index} className="relative group" onClick={() => openImageModal(index)}>
                                            <div
                                                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 w-full ${ selectedImageIndex === index ? 'border-dark-green shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${product.name} ${index + 1}`}
                                                    className="w-full h-full object-cover cursor-pointer"
                                                />
                                            </div>
                                            {/* Zoom icon for thumbnails */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center rounded-lg">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="bg-white/90 rounded-full p-2">
                                                        <ZoomIn className="w-4 h-4 text-dark-green" />
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Information */}
                        <div className="space-y-6">
                            {/* Title and Category */}
                            <div>
                                {/* <div className="flex items-center gap-2 mb-2"> */}
                                {/*     <Tag size={16} className="text-dark-green" /> */}
                                {/*     <span className="text-sm text-gray-600 font-medium">{product.category.name}</span> */}
                                {/* </div> */}
                                <h1 className="font-dancing font-bold text-4xl text-dark-green mb-2">
                                    {product.name}
                                </h1>
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-lg p-6 shadow-lg">
                                <h3 className="font-nunito font-bold text-xl text-dark-green mb-3">Deskripsi Produk</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    {showFullDescription || product.description.length <= 200 ? (
                                        <p>{product.description}</p>
                                    ) : (
                                            <>
                                                <p>{product.description.substring(0, 200)}...</p>
                                                <button
                                                    onClick={() => setShowFullDescription(true)}
                                                    className="text-dark-green hover:text-green font-medium mt-2 transition-colors duration-200"
                                                >
                                                    Baca selengkapnya
                                                </button>
                                            </>
                                        )}
                                </div>
                            </div>

                            {/* Variants */}
                            {product.variants && product.variants.length > 0 && (
                                <div className="bg-white rounded-lg p-6 shadow-lg">
                                    <h3 className="font-nunito font-bold text-xl text-dark-green mb-4">Harga</h3>
                                    <div className="grid gap-3">
                                        {product.variants.map((variant, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-dark-green/30 transition-all duration-200">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-dark-green">{variant.name}</h4>
                                                        {variant.desc && (
                                                            <p className="text-sm text-gray-600 mt-1">{variant.desc}</p>
                                                        )}
                                                    </div>
                                                    <div className="ml-4 text-right">
                                                        <p className="font-bold text-green-700">
                                                            Rp {parseFloat(variant.price).toLocaleString('id-ID')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Manager Information */}
                            <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-l-dark-green">
                                <h3 className="font-nunito font-bold text-xl text-dark-green mb-4">Detail Pengelola</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-dark-green" />
                                        <div>
                                            <p className="text-sm text-gray-600">Nama Pengelola</p>
                                            <p className="font-medium text-gray-800">{product.manager}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-dark-green mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-600">Alamat</p>
                                            <p className="font-medium text-gray-800">{product.address}</p>
                                        </div>
                                    </div>
                                    {/* <div className="flex items-center gap-3"> */}
                                    {/*     <Phone className="w-5 h-5 text-dark-green" /> */}
                                    {/*     <div> */}
                                    {/*         <p className="text-sm text-gray-600">Kontak</p> */}
                                    {/*         <p className="font-medium text-gray-800">{product.contact}</p> */}
                                    {/*     </div> */}
                                    {/* </div> */}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-fit bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-nunito font-bold text-center transition-all duration-200 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                                >
                                    <WhatsApp />
                                    Hubungi via WhatsApp
                                </a>
                                <p className="text-xs text-gray-500">
                                    Klik tombol di atas untuk menghubungi pengelola langsung melalui WhatsApp
                                </p>
                            </div>

                            {/* Product Meta */}
                            {/* <div className="bg-gray-50 rounded-lg p-4"> */}
                            {/*     <div className="flex items-center gap-2 text-sm text-gray-600"> */}
                            {/*         <Calendar size={16} /> */}
                            {/*         <span>Dipublikasikan: {product.created_at}</span> */}
                            {/*     </div> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </main>

            {/* Image Modal */}
            {isImageModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                    {/* Close Button */}
                    <button
                        onClick={closeImageModal}
                        className="absolute top-4 right-4 z-50 bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full"
                    >
                        <X size={24} />
                    </button>

                    {/* Navigation Buttons */}
                    {product.images && product.images.length > 1 && (
                        <>
                            <button
                                onClick={() => navigateModalImage('prev')}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => navigateModalImage('next')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}

                    {/* Modal Content */}
                    <div className="relative flex items-center justify-center max-w-full max-h-full">
                        {product.images && product.images[modalImageIndex] ? (
                            <img
                                src={product.images[modalImageIndex]}
                                alt={`${product.name} - Image ${modalImageIndex + 1}`}
                                className="max-w-full max-h-screen object-contain"
                                style={{ maxHeight: '90vh' }}
                            />
                        ) : (
                                <div className="text-white text-center">
                                    <p>Image not found</p>
                                    <p>Modal Index: {modalImageIndex}</p>
                                    <p>Images Count: {product.images?.length || 0}</p>
                                </div>
                            )}

                        {/* Image Counter */}
                        {product.images && product.images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
                                {modalImageIndex + 1} / {product.images.length}
                            </div>
                        )}
                    </div>

                    {/* Backdrop click to close */}
                    <div
                        className="absolute inset-0"
                        onClick={closeImageModal}
                    />
                </div>
            )}
            <Footer />
        </>
    );
}
