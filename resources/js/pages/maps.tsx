import { Head } from '@inertiajs/react';
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Maps() {
    return (
        <>
            <Head title="Maps">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Navbar />
            <main className="bg-gradient-to-b from-green via-light-green to-white p-6 lg:p-24">
                <div className="flex flex-col items-center mx-auto gap-4 text-center">
                    <h1 className="font-dancing font-bold text-4xl text-dark-green">Peta Gampong Nusa</h1>
                    <p className="font-nunito text-base w-2/3">Temukan lokasi kami di peta berikut. Kami terletak di kawasan indah yang kaya akan budaya dan keindahan alam. Silakan datang berkunjung!</p>
                    <div className="overflow-hidden rounded-lg drop-shadow-lg bg-white p-2">
                        <img src="/storage/petagpnusaku.webp" alt="Peta Gampong Nusa" className="w-full h-full"/>
                        <p className="font-nunito text-sm mt-2">Sumber: Kelompok 150 KKN XXVII Gampong Nusa 2025</p>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.4798609160625!2d95.26609455349643!3d5.4955223827370006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30403b928775a631%3A0x4100fb68ce2d507a!2sDesa%20Wisata%20Nusa%2C%20Aceh!5e0!3m2!1sid!2sid!4v1757563789006!5m2!1sid!2sid" width="600" height="450" loading="lazy" ></iframe>
                </div>
            </main>
            <Footer />
        </>
    );
}
