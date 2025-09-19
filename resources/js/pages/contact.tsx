import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Contact() {
    const {data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const admin = `6282267604625`
        const message = `Halo admin Desa Nusa Perkenalkan, saya ${data.name} (${data.email}). saya ingin bertanya atau menyampaikan hal berikut: ${data.message}. Terima kasih sebelumnya.`
        const whatsappUrl = `https://wa.me/${admin}?text=${encodeURIComponent(message)}`;

        // route(whatsappUrl)
        // navigate(whatsappUrl)
    }

    return (
        <>
            <Head title="Contact Us">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Navbar />
            <main className="flex items-center bg-gradient-to-b from-green via-light-green to-white p-6 lg:p-24">
                <div className="flex flex-col items-center mx-auto gap-4 p-8 bg-white lg:w-1/2 shadow-lg rounded-lg">
                    <h1 className="font-dancing font-bold text-4xl text-dark-green">Hubungi Kami</h1>
                    <p className="font-nunito text-base">Terima kasih atas minat Anda pada Desa Wisata Aceh Besar 🌿. Kami dengan senang hati akan membantu segala kebutuhan Anda terkait informasi wisata, budaya lokal, penginapan, atau peluang kolaborasi.</p>
                    <p className="font-nunito text-base">Silakan isi formulir di bawah ini, dan tim kami akan segera menghubungi Anda melalui WhatsApp untuk merespons pertanyaan, saran, atau kerja sama yang Anda ajukan.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                        <Input placeholder="Nama Lengkap" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                        <Input placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)}></Input>
                        <Textarea placeholder="Pesan Anda" value={data.message} onChange={(e) => setData('message', e.target.value)}></Textarea>
                        <Button type="submit">Kirim via WhatsApp</Button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
