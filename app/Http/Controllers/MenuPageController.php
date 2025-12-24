<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class MenuPageController extends Controller
{
    public function index()
    {
        return Inertia::render('Menu');
    }
}
