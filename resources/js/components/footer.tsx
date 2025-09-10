import { Link } from "@inertiajs/react"
import { Instagram, Twitter } from "lucide-react"
import Tiktok from "@/components/icon/tiktok"

const Footer = () => {
    return (
        <section className="flex flex-row justify-between text-dark-green px-6 py-12 lg:px-16 gap-10 bg-gradient-to-b from-white to-light-green">
            <div className="flex flex-col lg:flex-row justify-around w-1/2 gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <img
                            src="/storage/logo-nusaku-hitam.png"
                            alt="Gampong Nusa Logo"
                            className="w-10 h-10"
                        />
                        <div className="font-dancing italic leading-tight">
                            <h2 className="text-lg font-bold">Gampong Nusa</h2>
                            <h2 className="text-xs">Lhoknga, Aceh Besar</h2>
                        </div>
                    </div>
                    <p className="font-nunito text-sm">Desa wisata berbasis budaya dan lingkungan. Rasakan kehangatan budaya dan keindahan alam kami.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="font-poppins text-lg font-bold">Kontak</h4>
                    <ul className="font-nunito text-sm">
                        <li className="mb-2">Alamat: Jalan Banda Aceh Meulaboh Km 9,6 Gampong Nusaku, Kec. Lhoknga, Kab. Aceh Besar</li>
                        <li className="mb-2">Telepon: +62 823 7033 3349 / +62 813 6077 8548</li>
                        <li className="mb-2">Email: gampongnusaku@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-around w-1/2 gap-10">
                <div className="flex flex-col gap-1">
                    <h4 className="font-poppins text-lg font-bold">Tautan Cepat</h4>
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
                        className="inline-block text-base text-dark-green hover:text-dark-green/75 font-bold leading-normal transform transition duration-200 ease-in-out hover:-translate-y-0.5"
                    >
                        Contact Us
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="font-poppins text-lg font-bold">Ikuti Kami</h4>
                    <Link
                        href={route('register')}
                        className="flex items-center gap-2 font-dancing font-bold text-lg hover:text-dark-green/75 transform transition duration-200 ease-in-out hover:-translate-y-0.5"
                    >
                        <Instagram size={20} />
                        @gampongnusaku
                    </Link>
                    <Link
                        href={route('register')}
                        className="flex items-center gap-1 font-dancing font-bold text-lg hover:text-dark-green/75 transform transition duration-200 ease-in-out hover:-translate-y-0.5"
                    >
                        {/* <Twitter /> */}
                        <Tiktok />
                        @desawisatanusa
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Footer
