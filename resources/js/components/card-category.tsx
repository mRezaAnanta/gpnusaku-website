import { Link } from '@inertiajs/react'
import { truncateText } from '@/lib/utils'

interface Props {
    id: number;
    title: string;
    description: string;
    manager?: string;
    address?: string;
    contact?: string;
    primaryImage?: string | null;
    variantNames?: string;
    priceRange?: {
        min: number;
        max: number;
    };
    isProduct?: boolean;
}

const CardCategory: React.FC<Props> = ({ 
    id, 
    title, 
    description, 
    manager, 
    address, 
    contact, 
    primaryImage, 
    variantNames,
    priceRange,
    isProduct = false 
}) => {
    return (
        <div className="flex flex-col justify-between gap-4 min-h-64 bg-gradient-to-b from-white via-white to-light-green rounded-lg p-6 shadow-2xl">
            {/* Product Image */}
            {isProduct && primaryImage && (
                <div className="w-full h-32 rounded-lg overflow-hidden">
                    <img 
                        src={primaryImage} 
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            
            {/* Content */}
            <div className="flex flex-col gap-2 flex-grow">
                <h3 className="font-poppins text-dark-green font-bold text-xl">{title}</h3>
                <p className="font-nunito text-base text-start">{truncateText(description, 50)}</p>
                
                {/* Product specific information */}
                {isProduct && (
                    <div className="mt-2 space-y-1">
                        {manager && (
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Pengelola:</span> {manager}
                            </p>
                        )}
                        {address && (
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Alamat:</span> {truncateText(address, 30)}
                            </p>
                        )}
                        {contact && (
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Kontak:</span> {contact}
                            </p>
                        )}
                        {variantNames && (
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Varian:</span> {variantNames}
                            </p>
                        )}
                        {priceRange && priceRange.min > 0 && (
                            <p className="text-sm text-green-700 font-medium">
                                Harga: Rp {priceRange.min.toLocaleString('id-ID')}
                                {priceRange.min !== priceRange.max && ` - Rp ${priceRange.max.toLocaleString('id-ID')}`}
                            </p>
                        )}
                    </div>
                )}
            </div>
            
            {/* Action Button */}
            <div className="mt-auto">
                {isProduct ? (
                    <Link href={`/product/${id}`}>
                        <button className="w-full bg-dark-green text-white px-4 py-2 font-nunito rounded-lg hover:cursor-pointer hover:shadow-2xl transform duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-green">
                            Detail Produk
                        </button>
                    </Link>
                ) : (
                    <Link href={`/category/${id}`}>
                        <button className="w-fit bg-dark-green text-white px-4 py-2 font-nunito rounded-lg hover:cursor-pointer hover:shadow-2xl transform duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-green">
                            Detail Produk
                        </button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default CardCategory
