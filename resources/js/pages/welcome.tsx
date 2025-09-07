import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'

export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Navbar />
            <main>
            <Hero />
            </main>
            {/* <div className="flex min-h-screen items-center bg-[#FDFDFC] text-[#1b1b18] lg:justify-center dark:bg-[#0a0a0a]"> */}
            {/*     <div className="flex w-full items-center justify-start opacity-100 transition-opacity duration-750 starting:opacity-0"> */}
            {/*         <main className="flex w-full flex-col-reverse lg:max-w-4xl lg:flex-row"> */}
            {/*         </main> */}
            {/*     </div> */}
            {/* </div> */}
        </>
    );
}
