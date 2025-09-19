import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Contact() {
    const {data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: ''
    });

    const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: {[key: string]: string} = {};

        // Validate name field
        if (!data.name.trim()) {
            newErrors.name = 'Nama lengkap harus diisi';
        }

        // Validate email field
        if (!data.email.trim()) {
            newErrors.email = 'Email harus diisi';
        } else if (!validateEmail(data.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        // Validate message field
        if (!data.message.trim()) {
            newErrors.message = 'Pesan harus diisi';
        }

        setValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Clear previous validation errors
        setValidationErrors({});

        // Validate form
        if (!validateForm()) {
            return;
        }

        const admin = `6282267604625`
        const message = `Halo Admin Desa Nusa Perkenalkan, saya ${data.name} (${data.email}). Saya ingin bertanya atau menyampaikan hal berikut: ${data.message}. Terima kasih sebelumnya.`
        const whatsappUrl = `https://wa.me/${admin}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');

        // Optional: Reset form after successful submission
        setData({
            name: '',
            email: '',
            message: ''
        });
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

                    {Object.keys(validationErrors).length > 0 && (
                        <Alert className="w-full">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Terjadi kesalahan!</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc list-inside mt-2">
                                    {Object.entries(validationErrors).map(([key, message]) => (
                                        <li key={key}>{message}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                        <div className="space-y-1">
                            <Input
                                placeholder="Nama Lengkap *"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={validationErrors.name ? 'border-red-500' : ''}
                            />
                            {validationErrors.name && (
                                <p className="text-red-500 text-sm">{validationErrors.name}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Input
                                type="email"
                                placeholder="Email *"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={validationErrors.email ? 'border-red-500' : ''}
                            />
                            {validationErrors.email && (
                                <p className="text-red-500 text-sm">{validationErrors.email}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Textarea
                                placeholder="Pesan Anda *"
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className={validationErrors.message ? 'border-red-500' : ''}
                                rows={4}
                            />
                            {validationErrors.message && (
                                <p className="text-red-500 text-sm">{validationErrors.message}</p>
                            )}
                        </div>

                        <Button type="submit" disabled={processing}>
                            {processing ? 'Mengirim...' : 'Kirim via WhatsApp'}
                        </Button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
