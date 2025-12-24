<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\MidtransController;
use Illuminate\Support\Facades\Route;

Route::post('midtrans/callback', [MidtransController::class, 'callback']);

Route::get('/menu', [MenuController::class, 'index'])->name('menu.api');
Route::get('/menu/{menu}', [MenuController::class, 'show'])->name('menu.api.get');
Route::get('/menu/{menu}/image', [MenuController::class, 'showImage'])->name('menu.api.get.image');

Route::post('/admin/login', [AuthController::class, 'login'])->name('admin.api.login');

Route::delete('/admin/logout', [AuthController::class, 'logout'])->name('admin.api,logout');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/menu', [MenuController::class, 'store'])->name('menu.api.create');
    Route::put('/menu/{menu}', [MenuController::class, 'update'])->name('menu.api.update');
    Route::delete('/menu/{menu}', [MenuController::class, 'destroy'])->name('menu.api.delete');

    Route::get('/admin/user', [AuthController::class, 'show'])->name('admin.api.user');
    Route::get('/admin/profile-photo', [AuthController::class, 'showProfilePhoto'])->name('admin.api.profile-photo');
});
