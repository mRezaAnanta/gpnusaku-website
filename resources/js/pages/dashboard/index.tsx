import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { ImageIcon, Eye, Edit, Trash2 } from 'lucide-react';
import { truncateText, formatPrice, formatDate } from '@/lib/utils'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Category {
    id: number;
    name: string;
    description: string;
}

interface Variant {
    name: string;
    desc: string;
    price: string;
}

interface PriceRange {
    min: number;
    max: number;
}

interface Product {
    id: number;
    name: string;
    description: string;
    manager: string;
    address: string;
    contact: string;
    category: Category;
    variants: Variant[];
    images: string[];
    primary_image: string | null;
    variant_names: string;
    price_range: PriceRange;
    created_at: string;
    updated_at: string;
}

interface Props {
    products: Product[];
    categories: Category[];
}

    const formatPriceRange = (priceRange: PriceRange) => {
        return priceRange.min === priceRange.max ? formatPrice(priceRange.min) : `${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}`
    };

export default function Dashboard() {
    const { products, categories } = usePage().props as Props;
    const recentCategories = categories.slice(0).splice(0, 4)
    const recentProducts = products.slice(0).splice(0, 4)

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete product - ${id}. ${name}?`)) {
            destroy(route("products.destroy", id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Total Products</h3>
                        <p className="text-3xl font-bold text-blue-600">{products.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Total Categories</h3>
                        <p className="text-3xl font-bold text-green-600">{categories.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                        <div className="flex gap-4">
                            <Link href={route('products.create')}>
                                <Button size="sm" className="w-full">Add Product</Button>
                            </Link>
                            <Link href={route('categories.create')}>
                                <Button size="sm" variant="outline" className="w-full">Add Category</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold">Recent Products</h2>
                    </div>

                    {recentProducts.length > 0 ? (
                        <div className="p-6">
                            <Table>
                                <TableCaption>A list of your recent products.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px]">Image</TableHead>
                                        <TableHead>No</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Created</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentProducts.map((product, index) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                {product.primary_image ? (
                                                    <img
                                                        src={product.primary_image}
                                                        alt={product.name}
                                                        className="w-12 h-12 object-cover rounded-md border"
                                                    />
                                                ) : (
                                                        <div className="w-12 h-12 bg-gray-200 rounded-md border flex items-center justify-center">
                                                            <ImageIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                    )}
                                            </TableCell>
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium">{product.name}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {truncateText(product.description, 30)}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {product.category.name}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-500">
                                                {formatDate(product.created_at)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                            <div className="p-6 text-center py-8">
                                <div className="space-y-3">
                                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                    <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                    <p className="text-gray-500">Get started by creating your first product.</p>
                                    <Link href={route('products.create')}>
                                        <Button>Create Your First Product</Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold">Recent Categories</h2>
                    </div>

                    {recentCategories.length > 0 && (
                        <div className='m-4'>
                            <Table>
                                <TableCaption>A list of your recent categories.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Last Updated</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentCategories.map((c, index) => (
                                        <TableRow key={c.id}>
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell>{c.name}</TableCell>
                                            <TableCell className="max-w-[300px] whitespace-normal break-words">{c.description}</TableCell>
                                            <TableCell>{formatDate(c.updated_at)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
