import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Mail } from 'lucide-react';

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="mb-6 w-full p-6 lg:p-8 text-sm not-has-[nav]:hidden bg-[#8bd766]">
            <nav className="flex items-center justify-end gap-4">
                <Link
                    href={route('register')}
                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                    Home
                </Link>
                <Link
                    href={route('register')}
                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                    Products
                </Link>
                <Link
                    href={route('register')}
                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                    Maps
                </Link>
                <Link
                    href={route('register')}
                    className="flex items-center gap-2 rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                    <Mail size={16} />
                    Contact
                </Link>
            </nav>
        </header>
    );
}
