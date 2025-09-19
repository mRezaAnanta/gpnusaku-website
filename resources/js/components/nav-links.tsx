import { Link } from '@inertiajs/react';
import { Mail } from 'lucide-react';

const NavLinks = ({ isMobile = false }: { isMobile?: boolean}) => {
    return (
        <>
            <Link
                href={route('home')}
                className="inline-block text-base text-dark-green hover:text-dark-green/75 font-bold leading-normal transform transition duration-200 ease-in-out hover:-translate-y-0.5"
            >
                Home
            </Link>
            <Link
                href={route('category.index')}
                className="inline-block text-base text-dark-green hover:text-dark-green/75 font-bold leading-normal transform transition duration-200 ease-in-out hover:-translate-y-0.5"
            >
                Products
            </Link>
            <Link
                href={route('maps')}
                className="inline-block text-base text-dark-green hover:text-dark-green/75 font-bold leading-normal transform transition duration-200 ease-in-out hover:-translate-y-0.5"
            >
                Maps
            </Link>
            <Link
                href={route('contact')}
                className="flex items-center gap-2 rounded-lg border border-white bg-white px-5 py-1.5 text-base leading-normal text-dark-green hover:text-dark-green/75 font-bold hover:border-[#1915014a] transform transition duration-200 ease-in-out hover:-translate-y-0.5"
            >
                <Mail size={16} />
                Contact Us
            </Link>
        </>
    )
}

export default NavLinks
