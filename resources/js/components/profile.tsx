import CardImg from '@/components/card-img'

const Profile = () => {
    return (
        <section id="profile" className="lg:p-26 px-8 py-20 flex flex-col items-center gap-20 font-nunito">
            <h2 className="font-dancing text-4xl text-dark-green font-bold">Profile Gampong Nusaku</h2>

            <div className="flex flex-col lg:flex-row gap-8">
                <CardImg src="/storage/ilustrasi-antusias-warga.webp" caption="Antusiasme Warga dalam Pelatihan Kerajinan"/>
                <div className="lg:max-w-1/2 text-black text-lg">
                    <p>Gampong Nusa, yang terletak di Kecamatan Lhoknga, Kabupaten Aceh Besar, merupakan salah satu desa yang tumbuh dengan nilai-nilai kearifan lokal dan kehidupan masyarakat yang sangat khas. Suasananya yang damai, serta kedekatan masyarakat dengan alam dan budaya tradisional, menjadikan Gampong ini menarik bagi siapa saja yang ingin merasakan pengalaman pedesaan yang otentik.</p>
                    <br/>
                    <p>Letaknya sangat strategis hanya sekitar 30 km dari pusat Kota Banda Aceh dan mudah dijangkau dari Bandara Sultan Iskandar Muda. Posisi ini menjadikan Gampong Nusa sebagai pintu gerbang ideal bagi wisatawan yang ingin menjelajahi keindahan dan kekayaan budaya Aceh.</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse gap-8">
                <CardImg src="/storage/antusiasme-gotong-royong.webp" caption="Antusiasme Warga dalam Membangun Gampong Nusa"/>
                <div className="lg:max-w-1/2 text-black text-lg">
                    <div className="bg-white p-4 border-l-4 border-l-dark-green shadow-md mb-4">
                        <p className="italic text-dark-green font-bold">“Gampong Nusa bukan sekadar destinasi wisata, tetapi cerminan hidup masyarakat Aceh yang selaras dengan alam dan budaya.”</p>
                        <span className="text-sm text-gray-500">- Filosofi ini menjadi dasar pengembangan desa wisata sejak 2015.</span>
                    </div>
                    <p>Sejak tahun 2015, masyarakat bersama <b>Lembaga Pariwisata Nusa (LPN)</b> mulai mengelola Gampong Nusa sebagai desa wisata. Berbagai potensi lokal dijadikan bagian dari paket wisata mulai dari kegiatan bertani, memasak makanan khas, hingga menyaksikan pertunjukan seni tradisional.</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-8">
                <div className="text-black text-lg">
                    <p>Pengunjung dapat mengikuti aktivitas seperti pengolahan sampah anorganik menjadi cenderamata, permainan rakyat, hingga petualangan alam seperti hiking, susur sungai, dan kemping di alam terbuka. Semua aktivitas dikemas dalam suasana kekeluargaan, memberikan pengalaman menyeluruh tentang kehidupan masyarakat Aceh.</p>
                </div>
                <CardImg src="/storage/membuat-kerajinan.webp" caption="Antusiasme Pengunjung dalam Pelatihan Kerajinan" width="lg:max-w-2/3"/>
                <div className="text-black text-lg">
                    <p>Fasilitas seperti <b>homestay</b> yang dikelola langsung oleh warga telah disiapkan untuk menyambut wisatawan yang ingin menginap dan merasakan kehidupan desa lebih dalam. Para pemuda Gampong Nusa, melalui LPN, juga dilatih menjadi pemandu wisata profesional yang siap mendampingi tamu menjelajahi berbagai atraksi yang ada.</p>
                    <br/>
                    <p>Kini, Gampong Nusa telah menjadi contoh sukses pengembangan desa wisata berbasis budaya dan lingkungan. Keaslian, keramahan, dan partisipasi aktif masyarakat menjadi daya tarik utama yang menjadikan desa ini dikenal hingga mancanegara.</p>
                </div>
            </div>
        </section>
    )
}

export default Profile
