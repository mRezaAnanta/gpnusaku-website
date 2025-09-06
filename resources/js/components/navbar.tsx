import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Mail } from 'lucide-react';

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;

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

                <div className="flex items-center gap-6">
                    <Link
                        href={route('home')}
                        className="inline-block text-base text-dark-green hover:text-dark-green/75 font-bold leading-normal transform transition duration-200 ease-in-out hover:-translate-y-0.5"
                    >
                        Home
                    </Link>
                    <Link
                        href={route('register')}
                        className="inline-block text-base text-dark-green hover:text-dark-green/75 font-bold leading-normal transform transition duration-200 ease-in-out hover:-translate-y-0.5"
                    >
                        Products
                    </Link>
                    <Link
                        href={route('register')}
                        className="inline-block text-base text-dark-green hover:text-dark-green/75 font-bold leading-normal transform transition duration-200 ease-in-out hover:-translate-y-0.5"
                    >
                        Maps
                    </Link>
                    <Link
                        href={route('register')}
                        className="flex items-center gap-2 rounded-lg border border-white bg-white px-5 py-1.5 text-base leading-normal text-dark-green hover:text-dark-green/75 font-bold hover:border-[#1915014a] transform transition duration-200 ease-in-out hover:-translate-y-0.5"
                    >
                        <Mail size={16} />
                        Contact Us
                    </Link>
                </div>
            </nav>
        </header>
    );
}
