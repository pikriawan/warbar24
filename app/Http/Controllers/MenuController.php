<?php

namespace App\Http\Controllers;

use App\Models\Menu;

class MenuController extends Controller
{
    public function index()
    {
        $menu = Menu::orderBy('kategori')
            ->orderByRaw('(stok = 0) ASC')
            ->orderBy('id')
            ->get();

        return response()->json($menu);
    }
}
