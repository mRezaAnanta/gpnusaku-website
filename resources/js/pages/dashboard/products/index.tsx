import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Megaphone, Eye, Edit, Trash2, ImageIcon } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
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
    flash: {
        message?: string;
    };
}

export default function Index() {
    const { products, flash } = usePage().props as Props;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete the product "${name}"?`)) {
            destroy(route("products.destroy", id));
        }
    };

    const formatPrice = (priceRange: PriceRange) => {
        if (priceRange.min === priceRange.max) {
            return `$${priceRange.min.toFixed(2)}`;
        }
        return `$${priceRange.min.toFixed(2)} - $${priceRange.max.toFixed(2)}`;
    };

    const truncateText = (text: string, maxLength: number = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className='m-4'>
                <Link href={route('products.create')}>
                    <Button>Create a Product</Button>
                </Link>
            </div>

            <div className='m-4'>
                {flash.message && (
                    <Alert className="mb-4">
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>
                            {flash.message}
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            {products.length > 0 ? (
                <div className='m-4'>
                    <Table>
                        <TableCaption>A list of your products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Manager</TableHead>
                                <TableHead>Variants</TableHead>
                                <TableHead>Price Range</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
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
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="font-medium">{product.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {truncateText(product.description, 60)}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            {product.category.name}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{product.manager}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium">
                                                {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {truncateText(product.variant_names, 40)}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-green-600">
                                        {formatPrice(product.price_range)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            <div>{product.contact}</div>
                                            <div className="text-xs text-gray-500">
                                                {truncateText(product.address, 30)}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500">
                                        {new Date(product.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex justify-center space-x-1">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                title="View Details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Link href={route('products.edit', product.id)}>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-blue-50"
                                                    title="Edit Product"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                disabled={processing}
                                                onClick={() => handleDelete(product.id, product.name)}
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 p-0 hover:bg-red-50 text-red-600 hover:text-red-700"
                                                title="Delete Product"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                    <div className='m-4 text-center py-8'>
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
        </AppLayout>
    );
}
