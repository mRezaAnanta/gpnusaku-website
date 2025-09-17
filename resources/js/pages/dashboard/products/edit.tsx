import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from "react"
import { CircleAlert, Upload, X, ImageIcon } from 'lucide-react';

interface Categories {
    id: number,
    name: string,
    description: string,
}

interface Product {
    id: number;
    name: string;
    description: string;
    manager: string;
    address: string;
    contact: string;
    category_id: number;
    variants: Array<{
        name: string;
        desc: string;
        price: string;
    }>;
    images: string[];
    image_paths: string[];
}

interface Props {
    product: Product;
    categories: Categories[];
}

export default function Edit() {
    const { product, categories } = usePage().props as Props;

    // Initialize variants from product data, ensuring proper data structure
    const [variants, setVariants] = useState(() => {
        if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
            // Ensure all variant properties exist and are strings
            return product.variants.map(variant => ({
                name: variant.name || '',
                desc: variant.desc || '',
                price: variant.price ? variant.price.toString() : '0'
            }));
        }
        return [{ name: "", desc: "", price: "0" }];
    });
    const [existingImages, setExistingImages] = useState<string[]>(product.images || []);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Edit Product',
            href: `/dashboard/products/${product.id}/edit`,
        },
    ];

    const handleAddVariant = () => {
        setVariants([...variants, { name: "", desc: "", price: "0" }])
    }

    const handleChangeVariant = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
        const value = e.target.value
        const onChangeValue = [...variants]
        // Ensure the field exists and handle type conversion
        if (field === 'price') {
            // Ensure price is always a string number
            onChangeValue[index][field] = value || '0'
        } else {
            onChangeValue[index][field] = value
        }
        setVariants(onChangeValue)
    }

    const handleDeleteVariant = (index: number) => {
        const arr = [...variants]
        arr.splice(index, 1)
        setVariants(arr)
    }

    const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        const fileArray = Array.from(files)
        const totalImages = existingImages.length + newImages.length
        const remainingSlots = 3 - totalImages
        const filesToAdd = fileArray.slice(0, remainingSlots)

        // Validate file types
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
        const validFiles = filesToAdd.filter(file => {
            if (!validTypes.includes(file.type)) {
                alert(`File ${file.name} is not a valid image type. Please use JPG, PNG, or WebP.`)
                return false
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert(`File ${file.name} is too large. Please use images smaller than 5MB.`)
                return false
            }
            return true
        })

        if (validFiles.length === 0) return

        const updatedNewImages = [...newImages, ...validFiles]
        setNewImages(updatedNewImages)

        // Create preview URLs
        const newPreviews = validFiles.map(file => URL.createObjectURL(file))
        setNewImagePreviews(prev => [...prev, ...newPreviews])

        // Clear the input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleRemoveExistingImage = (index: number) => {
        const newExistingImages = existingImages.filter((_, i) => i !== index)
        setExistingImages(newExistingImages)
    }

    const handleRemoveNewImage = (index: number) => {
        const imageToRemove = newImages[index]
        const previewToRemove = newImagePreviews[index]

        const updatedNewImages = newImages.filter((_, i) => i !== index)
        const updatedPreviews = newImagePreviews.filter((_, i) => i !== index)

        // Revoke the object URL to free memory
        URL.revokeObjectURL(previewToRemove)

        setNewImages(updatedNewImages)
        setNewImagePreviews(updatedPreviews)
    }

    const handleImageUploadClick = () => {
        fileInputRef.current?.click()
    }

    const {data, setData, put, post, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        manager: product.manager,
        address: product.address,
        contact: product.contact,
        variants: variants,
        categories: product.category_id.toString(),
        keep_images: existingImages,
        new_images: [],
    });

    // Update form data when variants or images change
    useEffect(() => {
        setData('variants', variants)
    }, [variants])

    useEffect(() => {
        setData('keep_images', existingImages)
    }, [existingImages])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate variants client-side first
        const validVariants = variants.filter(v => v.name.trim() && v.price.trim());
        if (validVariants.length === 0) {
            alert('Please add at least one valid variant with name and price.');
            return;
        }

        const formData = new FormData();
        formData.append('_method', 'PUT');

        // Add basic fields
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('manager', data.manager);
        formData.append('address', data.address);
        formData.append('contact', data.contact);
        formData.append('categories', data.categories);

        // Add variants with proper validation
        variants.forEach((variant, index) => {
            formData.append(`variants[${index}][name]`, variant.name || '');
            formData.append(`variants[${index}][desc]`, variant.desc || '');
            formData.append(`variants[${index}][price]`, variant.price || '0');
        });

        // Add keep_images (existing images to retain)
        existingImages.forEach((imageUrl, index) => {
            formData.append(`keep_images[${index}]`, imageUrl);
        });

        // Add new images
        newImages.forEach((image, index) => {
            formData.append(`new_images[${index}]`, image);
        });

        // Debug: Log all the data being sent
        console.log('=== DEBUG INFO ===');
        console.log('Product ID:', product.id);
        console.log('Form data object:', data);
        console.log('Variants state:', variants);
        console.log('Existing images:', existingImages);
        console.log('New images:', newImages);
        console.log('FormData contents:');
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        console.log('=================');

        // Use POST with method spoofing for file uploads
        router.post(route('products.update', product.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log('Product updated successfully!');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                // Show detailed error information
                Object.entries(errors).forEach(([field, messages]) => {
                    console.error(`${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`);
                });
            }
        });
    }

    const totalImages = existingImages.length + newImages.length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    {Object.keys(errors).length > 0 &&(
                        <Alert>
                        <CircleAlert className="h-4 w-4" />
                        <AlertTitle>Validation Errors!</AlertTitle>
                        <AlertDescription>
                            <ul className="space-y-1">
                                {Object.entries(errors).map(([key, message]) => {
                                    const displayMessage = Array.isArray(message) ? message.join(', ') : message;
                                    return (
                                        <li key={key} className="text-sm">
                                            <strong>{key}:</strong> {displayMessage as string}
                                        </li>
                                    );
                                })}
                            </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className='gap-1.5'>
                        <Label htmlFor="products name">Name</Label>
                        <Input placeholder="Product Name" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="products description">Description</Label>
                        <Textarea placeholder="Description" value={data.description}  onChange={(e) => setData('description', e.target.value)}/>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="products manager">Manager</Label>
                        <Input placeholder="Manager" value={data.manager}  onChange={(e) => setData('manager', e.target.value)}/>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="products address">Address</Label>
                        <Textarea placeholder="Address" value={data.address}  onChange={(e) => setData('address', e.target.value)}/>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="products contact">Contact</Label>
                        <Input placeholder="Contact" value={data.contact}  onChange={(e) => setData('contact', e.target.value)}/>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="products variant">Price Variants</Label>
                        <div className="space-y-4">
                            {variants.map((item, index) => (
                                <div key={index} className="">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-medium">Variant {index + 1}</h4>
                                        {variants.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDeleteVariant(index)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div>
                                            <Label htmlFor={`variant-name-${index}`}>Variant Name</Label>
                                            <Input
                                                id={`variant-name-${index}`}
                                                placeholder="e.g., Small, Large, Premium"
                                                value={item.name}
                                                onChange={(e) => handleChangeVariant(e, index, 'name')}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`variant-desc-${index}`}>Description</Label>
                                            <Input
                                                id={`variant-desc-${index}`}
                                                placeholder="Description of variant"
                                                value={item.desc}
                                                onChange={(e) => handleChangeVariant(e, index, 'desc')}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`variant-price-${index}`}>Price</Label>
                                            <Input
                                                id={`variant-price-${index}`}
                                                placeholder="0.00"
                                                type="number"
                                                step="0.01"
                                                value={item.price}
                                                onChange={(e) => handleChangeVariant(e, index, 'price')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button type="button" variant="outline" onClick={handleAddVariant} className="mt-3">
                            + Add Price Variant
                        </Button>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="products categories">Category</Label>
                        <Select onValueChange={value => setData('categories', value)} defaultValue={product.category_id.toString()}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Please select product category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((c) => (
                                    <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='space-y-3'>
                        <Label>Product Images (Maximum 3)</Label>
                        <div className="space-y-4">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleNewImageChange}
                                className="hidden"
                            />

                            {/* Display existing images */}
                            {existingImages.length > 0 && (
                                <div className="space-y-2">
                                    <Label className="text-sm text-gray-600">Current Images:</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {existingImages.map((imageUrl, index) => (
                                            <div key={index} className="relative group">
                                                <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                                                    <img
                                                        src={imageUrl}
                                                        alt={`Product image ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleRemoveExistingImage(index)}
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                                    {index + 1}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Display new images */}
                            {newImagePreviews.length > 0 && (
                                <div className="space-y-2">
                                    <Label className="text-sm text-gray-600">New Images:</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {newImagePreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <div className="aspect-square rounded-lg overflow-hidden border-2 border-blue-200">
                                                    <img
                                                        src={preview}
                                                        alt={`New product image ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleRemoveNewImage(index)}
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                <div className="absolute bottom-2 left-2 bg-blue-600 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                                    NEW
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Upload button */}
                            {totalImages < 3 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleImageUploadClick}
                                    className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center space-y-2"
                                >
                                    <Upload className="h-8 w-8 text-gray-400" />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">Click to upload new images</p>
                                        <p className="text-xs text-gray-400">JPG, PNG, WebP (Max 5MB each)</p>
                                        <p className="text-xs text-gray-400">{totalImages}/3 images total</p>
                                    </div>
                                </Button>
                            )}

                            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <ImageIcon className="h-4 w-4" />
                                    <span className="font-medium">Image Management:</span>
                                </div>
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                    <li>Maximum 3 images allowed</li>
                                    <li>Supported formats: JPG, PNG, WebP</li>
                                    <li>Maximum file size: 5MB per image</li>
                                    <li>Click the X button on existing images to remove them</li>
                                    <li>New images are marked with a blue border</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Button disabled={processing} type="submit">
                        {processing ? 'Updating Product...' : 'Update Product'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
