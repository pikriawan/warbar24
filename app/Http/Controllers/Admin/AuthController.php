<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Rules\Captcha;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function showLogin()
    {
        if (Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard');
        }
        
        return Inertia::render('Admin/Login', [
            'recaptchaKey' => env('VITE_RECAPTCHA_SITE_KEY'),
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
            'g-recaptcha-response' => ['required', new Captcha]
        ]);

        // Custom auth check karena menggunakan MD5
        $admin = \App\Models\Admin::where('username', $request->username)->first();
        
        if ($admin && $admin->password === md5($request->password)) {
            Auth::guard('admin')->login($admin);
            Log::info('Admin login berhasil', [
                'admin_id' => $admin->id,
                'username' => $admin->username,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return Inertia::location(route('admin.dashboard'));
            // return redirect()->route('admin.dashboard');
        }

        Log::warning('Login admin gagal', [
            'username' => $request->username,
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'time' => now()->toDateTimeString(),
        ]);

        return back()->withErrors([
            'error' => 'Username atau password salah!',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return Inertia::location(route('admin.login'));
    }
}
