import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from "react"
import { CircleAlert, Upload, X, ImageIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Product',
        href: '/dashboard/products/create',
    },
];

interface Categories {
    id: number,
    name: string,
    description: string,
}

interface Props {
    categories: Categories[]
}

export default function Create() {
    const { categories } = usePage().props as Props;
    const [variants, setVariants] = useState([{ name: "", desc: "", price: ""}])
    const [images, setImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleAddVariant = () => {
        setVariants([...variants, { name: "", desc: "", price: ""}])
    }

    const handleChangeVariant = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
        const value = e.target.value
        const onChangeValue = [...variants]
        onChangeValue[index][field] = value
        setVariants(onChangeValue)
    }

    const handleDeleteVariant = (index: number) => {
        const arr = [...variants]
        arr.splice(index, 1)
        setVariants(arr)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        const fileArray = Array.from(files)
        const remainingSlots = 3 - images.length
        const filesToAdd = fileArray.slice(0, remainingSlots)

        // Validate file types and show better error messages
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
        const errors = []
        const validFiles = filesToAdd.filter(file => {
            if (!validTypes.includes(file.type)) {
                errors.push(`${file.name} is not a valid image type. Please use JPG, PNG, or WebP.`)
                return false
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                errors.push(`${file.name} is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum size is 5MB.`)
                return false
            }
            return true
        })

        // Show all validation errors at once
        if (errors.length > 0) {
            alert('Image upload errors:\n' + errors.join('\n'))
        }

        if (validFiles.length === 0) return

        // Add valid files to images state
        const newImages = [...images, ...validFiles]
        setImages(newImages)

        // Create preview URLs for valid files only
        const newPreviews = validFiles.map(file => URL.createObjectURL(file))
        setImagePreviews(prev => [...prev, ...newPreviews])

        // Provide feedback about successful uploads
        // if (validFiles.length > 0) {
        //     console.log(`Successfully added ${validFiles.length} image(s)`);
        // }

        // Clear the input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleRemoveImage = (index: number) => {
        // Revoke the object URL to free memory before removing
        if (imagePreviews[index]) {
            URL.revokeObjectURL(imagePreviews[index])
        }

        const newImages = images.filter((_, i) => i !== index)
        const newPreviews = imagePreviews.filter((_, i) => i !== index)

        setImages(newImages)
        setImagePreviews(newPreviews)

        // console.log(`Removed image ${index + 1}. Remaining: ${newImages.length} images`);
    }

    const handleImageUploadClick = () => {
        fileInputRef.current?.click()
    }

    const {data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        manager: '',
        address: '',
        contact: '',
        variants: variants,
        categories: '',
        images: images,
    });

    // Update form data when variants or images change
    useEffect(() => {
        setData('variants', variants)
    }, [variants])

    useEffect(() => {
        setData('images', images)
    }, [images])

    // Cleanup effect to revoke object URLs when component unmounts
    useEffect(() => {
        return () => {
            // Clean up all preview URLs when component unmounts
            imagePreviews.forEach(preview => {
                URL.revokeObjectURL(preview);
            });
        };
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate that we have at least one variant with valid data
        const validVariants = variants.filter(v => v.name.trim() && v.price.trim());
        if (validVariants.length === 0) {
            alert('Please add at least one valid variant with name and price.');
            return;
        }

        const formData = new FormData();

        // Add basic fields
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('manager', data.manager);
        formData.append('address', data.address);
        formData.append('contact', data.contact);
        formData.append('categories', data.categories);

        // Add variants (use current state)
        variants.forEach((variant, index) => {
            formData.append(`variants[${index}][name]`, variant.name);
            formData.append(`variants[${index}][desc]`, variant.desc || '');
            formData.append(`variants[${index}][price]`, variant.price);
        });

        // Add images (use current state)
        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        // Debug: Log FormData contents
        // console.log('FormData contents:');
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }

        post(route('products.store'), {
            data: formData,
            forceFormData: true,
                onSuccess: () => {
                // console.log('Product created successfully!');
                // Clean up image preview URLs before resetting state
                imagePreviews.forEach(preview => {
                    URL.revokeObjectURL(preview);
                });
                // Reset form state
                setVariants([{ name: "", desc: "", price: ""}]);
                setImages([]);
                setImagePreviews([]);
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    {Object.keys(errors).length > 0 &&(
                        <Alert>
                        <CircleAlert className="h-4 w-4" />
                        <AlertTitle>Errors!</AlertTitle>
                        <AlertDescription>
                            <ul>
                                {Object.entries(errors).map(([key, message]) => (
                                    <li key={key}>{message as string}</li>
                                ))}
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
                        <Select onValueChange={value => setData('categories', value)}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Please select product category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((c) => (
                                    <SelectItem key={c.id} value={c.id.toString()} onChange={(e) => setData('categories', e.target.value)}>{c.name}</SelectItem>
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
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            {images.length < 3 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleImageUploadClick}
                                    className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center space-y-2"
                                >
                                    <Upload className="h-8 w-8 text-gray-400" />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">Click to upload images</p>
                                        <p className="text-xs text-gray-400">JPG, PNG, WebP (Max 5MB each)</p>
                                        <p className="text-xs text-gray-400">{images.length}/3 images uploaded</p>
                                    </div>
                                </Button>
                            )}

                            {imagePreviews.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                                                <img
                                                    src={preview}
                                                    alt={`Product image ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleRemoveImage(index)}
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
                            )}

                            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <ImageIcon className="h-4 w-4" />
                                    <span className="font-medium">Image Upload Guidelines:</span>
                                </div>
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                    <li>Maximum 3 images allowed</li>
                                    <li>Supported formats: JPG, PNG, WebP</li>
                                    <li>Maximum file size: 5MB per image</li>
                                    <li>First image will be used as the primary product image</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Button disabled={processing} type="submit">
                        {processing ? 'Creating Product...' : 'Create Product'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
