import { useState } from 'react';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import NavLinks from '@/components/nav-links';

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsClosing(false)
            setIsMobileMenuOpen(false)
        }, 400);
    }

    return (
        <header className="mb-6 w-full p-3 lg:p-4 text-sm not-has-[nav]:hidden bg-green">
            <nav className="flex items-center justify-between text-dark-green">
                <Link
                    href={route('home')}
                    className="inline-flex items-center gap-3 hover:text-dark-green/75 leading-normal transform transition duration-200 ease-in-out hover:-translate-y-0.5"
                >
                    <img
                        src="/storage/logo-nusaku-hitam.png"
                        alt="Gampong Nusa Logo"
                        className="w-10 h-10"
                    />
                    <div className="font-dancing italic leading-tight">
                        <h2 className="text-lg font-bold">Gampong Nusa</h2>
                        <h2 className="text-xs">Lhoknga, Aceh Besar</h2>
                    </div>
                </Link>

                <div className="hidden lg:flex items-center gap-6">
                    <NavLinks />
                </div>

                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="lg:hidden p-2 text-dark-green hover:text-dark-green/75 hover:cursor-pointer transition"
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X size={24} onClick={handleClose} /> : <Menu size={24} />}
                </button>
            </nav>
            {isMobileMenuOpen && (
                <div className={`absolute inset-x-0 z-10 mt-3 p-6 flex flex-col items-center justify-center gap-4 lg:hidden text-center bg-green/75 w-full ${isClosing ? 'animate-fade-out-up' : 'animate-fade-in-down'}`}>
                    <NavLinks isMobile />
                </div>
            )}
        </header>
    );
}
