import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from "react"
import { CircleAlert } from 'lucide-react';

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

    const {data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        manager: '',
        address: '',
        contact: '',
        variants: variants,
        categories: '',
        // images: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = {
            ...data,
            variants: variants
        };
        console.log('Form data:', submitData);
        // post(route('products.store'));
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
                    {/* <div className='gap-1.5'> */}
                    {/*     <Label htmlFor="products images">Images</Label> */}
                    {/*     <Textarea placeholder="Images" value={data.images}  onChange={(e) => setData('images', e.target.value)}/> */}
                    {/* </div> */}
                    <Button disabled={processing} type="submit">
                        {processing ? 'Creating Product...' : 'Create Product'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
