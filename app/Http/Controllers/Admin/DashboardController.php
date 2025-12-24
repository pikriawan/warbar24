<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Pesanan;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Statistik Menu
        $totalMenu = Menu::count();
        $totalMakanan = Menu::where('kategori', 'makanan')->count();
        $totalMinuman = Menu::where('kategori', 'minuman')->count();
        $totalTersedia = Menu::where('stok', '>', 0)->count();

        return Inertia::render('Admin/Dashboard', [
            'totalMenu' => $totalMenu,
            'totalMakanan' => $totalMakanan,
            'totalMinuman' => $totalMinuman,
            'totalTersedia' => $totalTersedia,
        ]);
    }
}