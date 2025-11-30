<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

Route::post('/message', [MessageController::class, 'store']);

Route::get('/menu', [MenuController::class, 'index']);

Route::get('/api/cart', [CartController::class, 'show']);

Route::put('/api/cart', [CartController::class, 'update']);

Route::get('/api/orders', [OrderController::class, 'index']);

Route::get('/api/order/{id}', [OrderController::class, 'show']);

Route::get('/orders', function () {
    return view('orders');
});

Route::get('/admin', function () {
    return redirect('admin/dashboard');
});

Route::get('/admin/login', [AdminController::class, 'show']);

Route::post('/admin/login', [AdminController::class, 'authenticate']);

Route::get('/admin/dashboard', [AdminController::class, 'show']);

Route::get('/admin/logout', [AdminController::class, 'logout']);
