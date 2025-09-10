import { type SharedData } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Profile from '@/components/profile'
import Gallery from '@/components/gallery'
import Footer from '@/components/footer'

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
                <Profile />
                <Gallery />
            </main>
            <Footer />
            <p className="bg-light-green text-center font-nunito text-sm text-dark-green pb-2">Copyright © 2025 Gampong Nusa. All Rights Reserved. Made by <a href="https://github.com/mRezaAnanta">Muhammad Reza Ananta</a></p>
        </>
    );
}
