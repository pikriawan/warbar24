<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\PesananController as AdminPesananController;
use App\Http\Controllers\Admin\LaporanController;
use App\Http\Controllers\Admin\ProfilController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PesananController as CustomerPesananController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MenuPageController;

/*
|--------------------------------------------------------------------------
| CUSTOMER AREA (REACT + INERTIA)
|--------------------------------------------------------------------------
*/

// Home
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/home', [HomeController::class, 'index']);

// Menu Page (React)
Route::get('/menu', [MenuPageController::class, 'index'])->name('menu');

// Cart routes
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/tambah', [CartController::class, 'tambah'])->name('cart.tambah');
Route::post('/cart/update', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/hapus/{id}', [CartController::class, 'hapus'])->name('cart.hapus');
Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');

// Pesanan Customer (React + Inertia)
Route::prefix('pesanan')->name('pesanan.')->group(function () {
    Route::get('/', [CustomerPesananController::class, 'index'])->name('index');
    Route::get('/{id}', [CustomerPesananController::class, 'show'])->name('detail');
    Route::post('/batalkan', [CustomerPesananController::class, 'batalkan'])->name('batalkan');
});

// Midtrans Webhook
Route::post('/midtrans/notification', [AdminPesananController::class, 'notification'])
    ->name('midtrans.notification');


/*
|--------------------------------------------------------------------------
| ADMIN AREA (REACT + INERTIA + ROLE BASED)
|--------------------------------------------------------------------------
*/

Route::get('/login', function () {
    return redirect()->route('admin.login');
})->name('login');

Route::prefix('admin')->name('admin.')->group(function () {

    // AUTH (Guest only)
    Route::middleware('guest:admin')->group(function () {
        Route::get('login', [AuthController::class, 'showLogin'])->name('login');
        Route::post('login', [AuthController::class, 'login'])->name('admin.login')->middleware(['admin.throttle']);
    });

    // AUTHENTICATED ROUTES
    Route::middleware('auth:admin')->group(function () {
        
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');

        // DASHBOARD → ADMIN, KASIR, DAPUR
        Route::get('dashboard', [DashboardController::class, 'index'])
            ->middleware('role:admin,kasir,dapur')
            ->name('dashboard');

        // MENU → ADMIN ONLY
        Route::middleware('role:admin')->group(function () {
            Route::get('menu', [MenuController::class, 'index'])->name('menu.index');
            Route::get('menu/create', [MenuController::class, 'create'])->name('menu.create');
            Route::post('menu', [MenuController::class, 'store'])->name('menu.store');
            Route::get('menu/{menu}/edit', [MenuController::class, 'edit'])->name('menu.edit');
            Route::put('menu/{menu}', [MenuController::class, 'update'])->name('menu.update');
            Route::delete('menu/{menu}', [MenuController::class, 'destroy'])->name('menu.destroy');
        });

        // PESANAN → SEMUA ROLE
        Route::middleware('role:admin,kasir,dapur')->group(function () {
            Route::get('pesanan', [AdminPesananController::class, 'index'])->name('pesanan.index');
            Route::get('pesanan/{pesanan}', [AdminPesananController::class, 'show'])->name('pesanan.show');
        });

        // VERIFIKASI → ADMIN & KASIR
        Route::post('pesanan/{pesanan}/verifikasi', [AdminPesananController::class, 'verifikasiPembayaran'])
            ->middleware('role:admin,kasir')
            ->name('pesanan.verifikasi');

        // LANJUTKAN STATUS → ADMIN & DAPUR
        Route::post('pesanan/{pesanan}/lanjutkan', [AdminPesananController::class, 'lanjutkanStatus'])
            ->middleware('role:admin,dapur')
            ->name('pesanan.lanjutkan');

        // BATALKAN → ADMIN & KASIR
        Route::post('pesanan/{pesanan}/batalkan', [AdminPesananController::class, 'batalkan'])
            ->middleware('role:admin,kasir')
            ->name('pesanan.batalkan');

        // LAPORAN → ADMIN & KASIR
        Route::get('laporan', [LaporanController::class, 'index'])
            ->middleware('role:admin,kasir')
            ->name('laporan.index');

        // PROFIL → SEMUA ROLE
        Route::middleware('role:admin,kasir,dapur')->group(function () {
            Route::get('profil', [ProfilController::class, 'index'])->name('profil.index');
            Route::post('profil', [ProfilController::class, 'update'])->name('profil.update');
            Route::get('/riwayat-foto-profil', [ProfilController::class, 'indexRiwayatFotoProfil'])->name('profil.riwayatFotoProfil');
        });
    });
});
