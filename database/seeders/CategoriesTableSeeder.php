<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Makanan Tradisional', 'description' => 'Makanan tradisional merupakan hidangan yang resep, cara memasak, dan cara penyajiannya diwariskan secara turun-temurun dalam suatu masyarakat atau daerah'],
            ['name' => 'Minuman', 'description' => 'Nikmati kesegaran minuman khas yang diolah dari bahan-bahan alami setempat.'],
            ['name' => 'Souvenir Desa', 'description' => 'Bawa pulang kenang-kenangan otentik hasil karya tangan para pengrajin lokal. Setiap souvenir memiliki cerita dan keunikan tersendiri yang mewakili'],
            ['name' => 'Wisata Alam', 'description' => 'Jelajahi keindahan bentang alam desa yang masih asri dan alami. Nikmati pemandangan hijau, udara yang sejuk, dan suasana tenang yang sempurna untuk'],
            ['name' => 'Wisata Budaya', 'description' => 'Selami kekayaan tradisi dan adat istiadat masyarakat kami. Saksikan pertunjukan kesenian yang memukau, pelajari sejarah lokal, dan berinteraksi'],
            ['name' => 'Homestay Desa', 'description' => 'Rasakan pengalaman menginap yang otentik di rumah warga. Nikmati keramahan khas pedesaan, cicipi hidangan rumahan yang lezat, dan jadilah bagian dari'],
            ['name' => 'Paket Wisata', 'description' => 'Pilih paket wisata kami untuk pengalaman liburan yang terencana, mudah, dan tak terlupakan. Paket ini telah merangkum aktivitas alam, budaya, dan kuliner terbaik'],
        ];

        Category::insert($categories);
    }
}
