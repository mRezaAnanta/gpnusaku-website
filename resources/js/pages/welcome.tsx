import { type SharedData } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Profile from '@/components/profile'
import Gallery from '@/components/gallery'
import Product from '@/components/product'
import Footer from '@/components/footer'

export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Navbar />
            <main className="bg-gradient-to-b from-green via-light-green to-white">
                <Hero />
                <Profile />
                <Gallery />
                <Product />
            </main>
            <Footer />
        </>
    );
}
