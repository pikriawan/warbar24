<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

Route::post('/message', [MessageController::class, 'store']);

Route::get('/menu', [MenuController::class, 'show']);

Route::get('/admin', function () {
    return redirect('admin/dashboard');
});

Route::get('/admin/login', [AdminController::class, 'show']);

Route::post('/admin/login', [AdminController::class, 'authenticate']);

Route::get('/admin/dashboard', [AdminController::class, 'show']);

Route::get('/admin/logout', [AdminController::class, 'logout']);
