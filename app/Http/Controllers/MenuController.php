<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\View\View;

class MenuController extends Controller
{
    public function show(): View
    {
        return view('menu', [
            'foods' => Menu::where('category', 'food')->get(),
            'drinks' => Menu::where('category', 'drink')->get()
        ]);
    }
}
