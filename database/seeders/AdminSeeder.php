<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    public function run()
    {
        // Hapus admin lama jika ada
        Admin::truncate();

        // Buat admin default
        Admin::create([
            'username' => 'admin',
            'password' => md5('admin123'), // Ganti dengan password yang lebih aman
            'foto_profil' => null,
        ]);

        echo "✅ Admin default berhasil dibuat!\n";
        echo "Username: admin\n";
        echo "Password: admin123\n";
    }
}