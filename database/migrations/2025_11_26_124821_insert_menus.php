<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('menus')->insert([
            ['admin_id' => 1, 'name' => 'Telur Balado', 'category' => 'food', 'stock' => 1, 'price' => 8000, 'image' => 'telur-balado.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Gorengan', 'category' => 'food', 'stock' => 1, 'price' => 3000, 'image' => 'gorengan.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Tumis Pare', 'category' => 'food', 'stock' => 1, 'price' => 7000, 'image' => 'tumis-pare.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Nasi', 'category' => 'food', 'stock' => 1, 'price' => 5000, 'image' => 'nasi.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Kerupuk', 'category' => 'food', 'stock' => 1, 'price' => 2000, 'image' => 'kerupuk.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Sayur Terong', 'category' => 'food', 'stock' => 1, 'price' => 6000, 'image' => 'sayur-terong.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Sayur Tahu Pedas', 'category' => 'food', 'stock' => 1, 'price' => 7000, 'image' => 'sayur-tahu-pedas.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Oseng Usus', 'category' => 'food', 'stock' => 1, 'price' => 9000, 'image' => 'oseng-usus.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Ati Balado', 'category' => 'food', 'stock' => 1, 'price' => 10000, 'image' => 'ati-balado.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Tumis Kacang Panjang', 'category' => 'food', 'stock' => 1, 'price' => 7000, 'image' => 'tumis-kacang-panjang.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Sayur Sop', 'category' => 'food', 'stock' => 1, 'price' => 7000, 'image' => 'sayur-sop.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Soto', 'category' => 'food', 'stock' => 1, 'price' => 12000, 'image' => 'soto.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Ayam Goreng', 'category' => 'food', 'stock' => 1, 'price' => 12000, 'image' => 'ayam-goreng.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Mie Goreng', 'category' => 'food', 'stock' => 1, 'price' => 8000, 'image' => 'mie-goreng.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Tumis Kangkung', 'category' => 'food', 'stock' => 1, 'price' => 6000, 'image' => 'tumis-kangkung.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Kikil', 'category' => 'food', 'stock' => 1, 'price' => 9000, 'image' => 'kikil.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Orek Basah', 'category' => 'food', 'stock' => 1, 'price' => 6000, 'image' => 'orek-basah.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Orek Kering', 'category' => 'food', 'stock' => 1, 'price' => 6000, 'image' => 'orek-kering.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Buncis', 'category' => 'food', 'stock' => 1, 'price' => 6000, 'image' => 'buncis.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Labu Siam', 'category' => 'food', 'stock' => 1, 'price' => 6000, 'image' => 'labu-siam.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Tumis Jamur', 'category' => 'food', 'stock' => 1, 'price' => 7000, 'image' => 'tumis-jamur.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Tumis Toge', 'category' => 'food', 'stock' => 1, 'price' => 6000, 'image' => 'tumis-toge.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Tumis Pakcoy', 'category' => 'food', 'stock' => 1, 'price' => 7000, 'image' => 'tumis-pakcoy.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Telur Ceplok', 'category' => 'food', 'stock' => 1, 'price' => 5000, 'image' => 'telur-ceplok.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Telur Dadar', 'category' => 'food', 'stock' => 1, 'price' => 6000, 'image' => 'telur-dadar.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Pindang Goreng', 'category' => 'food', 'stock' => 1, 'price' => 7000, 'image' => 'pindang-goreng.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Tumis Sawi Putih', 'category' => 'food', 'stock' => 1, 'price' => 6000, 'image' => 'tumis-sawi-putih.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Ayam Balado', 'category' => 'food', 'stock' => 1, 'price' => 12000, 'image' => 'ayam-balado.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Ayam Kecap', 'category' => 'food', 'stock' => 1, 'price' => 11000, 'image' => 'ayam-kecap.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Kentang Balado', 'category' => 'food', 'stock' => 1, 'price' => 7000, 'image' => 'kentang-balado.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Ayam Opor', 'category' => 'food', 'stock' => 1, 'price' => 13000, 'image' => 'ayam-opor.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Lele Goreng', 'category' => 'food', 'stock' => 1, 'price' => 9000, 'image' => 'lele-goreng.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Es Teh', 'category' => 'drink', 'stock' => 1, 'price' => 4000, 'image' => 'es-teh.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Teh Hangat', 'category' => 'drink', 'stock' => 1, 'price' => 3000, 'image' => 'teh-hangat.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Es Jeruk', 'category' => 'drink', 'stock' => 1, 'price' => 5000, 'image' => 'es-jeruk.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Lemon Tea', 'category' => 'drink', 'stock' => 1, 'price' => 5000, 'image' => 'lemon-tea.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Nutrisari', 'category' => 'drink', 'stock' => 1, 'price' => 5000, 'image' => 'nutrisari.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Air Es', 'category' => 'drink', 'stock' => 1, 'price' => 2000, 'image' => 'air-es.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Kopi Hitam', 'category' => 'drink', 'stock' => 1, 'price' => 6000, 'image' => 'kopi-hitam.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Susu Putih Hangat', 'category' => 'drink', 'stock' => 1, 'price' => 7000, 'image' => 'susu-putih-hangat.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Es Susu Putih', 'category' => 'drink', 'stock' => 1, 'price' => 7000, 'image' => 'es-susu-putih.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Susu Cokelat Hangat', 'category' => 'drink', 'stock' => 1, 'price' => 7000, 'image' => 'susu-cokelat-hangat.png', 'created_at' => now(), 'updated_at' => now()],
            ['admin_id' => 1, 'name' => 'Es Susu Cokelat', 'category' => 'drink', 'stock' => 1, 'price' => 7000, 'image' => 'es-susu-cokelat.png', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('menus')->delete();
    }
};
