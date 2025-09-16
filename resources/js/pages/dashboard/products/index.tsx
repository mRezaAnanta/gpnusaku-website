import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// TODO: change ziggy to wayfinder
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

// interface Products {
//     id: number,
//     name: string,
//     description: string,
// }
//
// interface Props {
//     flash: {
//         message?: string
//     },
//     categories: Categories[]
// }
//
export default function Index() {
    // const { categories, flash } = usePage().props as Props;
    // const {processing, delete: destroy} = useForm();
    //
    // const handleDelete = (id: number, name: string) => {
    //     if (confirm(`Do you want to delete a category - ${id}. ${name}`)){
    //         destroy(route("categories.destroy", id));
    //     }
    // }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
                <Link href={route('products.create')}><Button>Create a Product</Button></Link>
            </div>
            {/* <div className='m-4'> */}
            {/*     <div> */}
            {/*         {flash.message && ( */}
            {/*             <Alert> */}
            {/*                 <Megaphone className="h-4 w-4" /> */}
            {/*                 <AlertTitle>Notification!</AlertTitle> */}
            {/*                 <AlertDescription> */}
            {/*                     {flash.message} */}
            {/*                 </AlertDescription> */}
            {/*             </Alert> */}
            {/*         )} */}
            {/*     </div> */}
            {/* </div> */}
            {/* {categories.length > 0 && ( */}
            {/*     <div className='m-4'> */}
            {/*         <Table> */}
            {/*             <TableCaption>A list of your recent categories.</TableCaption> */}
            {/*             <TableHeader> */}
            {/*                 <TableRow> */}
            {/*                     <TableHead className="w-[100px]">ID</TableHead> */}
            {/*                     <TableHead>Name</TableHead> */}
            {/*                     <TableHead>Description</TableHead> */}
            {/*                     <TableHead>Last Updated</TableHead> */}
            {/*                     <TableHead className="text-center">Action</TableHead> */}
            {/*                 </TableRow> */}
            {/*             </TableHeader> */}
            {/*             <TableBody> */}
            {/*                 {categories.map((c) => ( */}
            {/*                     <TableRow key={c.id}> */}
            {/*                         <TableCell className="font-medium">{c.id}</TableCell> */}
            {/*                         <TableCell>{c.name}</TableCell> */}
            {/*                         <TableCell className="max-w-[300px] whitespace-normal break-words">{c.description}</TableCell> */}
            {/*                         <TableCell>{c.updated_at}</TableCell> */}
            {/*                         <TableCell className="text-center space-x-2"> */}
            {/*                             <Link href={route('categories.edit', c.id)}><Button className="bg-slate-600 hover:bg-slate-700">Edit</Button></Link> */}
            {/*                             <Button disabled={processing} onClick={() => handleDelete(c.id, c.name)} className="bg-red-500 hover:bg-red-700">Delete</Button> */}
            {/*                         </TableCell> */}
            {/*                     </TableRow> */}
            {/*                 ))} */}
            {/*             </TableBody> */}
            {/*         </Table> */}
            {/*     </div> */}
            {/* )} */}
        </AppLayout>
    );
}
