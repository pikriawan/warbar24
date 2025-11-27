<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials))
        {
            $request->session()->regenerate();

            return redirect()->intended('admin/dashboard');
        }

        return back()->withErrors([
            'username' => 'Username tidak ditemukan.'
        ])->onlyInput('username');
    }

    public function show(Request $request)
    {
        if (Auth::check())
        {
            if ($request->is('admin/login'))
            {
                return redirect('admin/dashboard');
            }

            return view('admin.dashboard');
        }
        else
        {
            if (!$request->is('admin/login'))
            {
                return redirect('admin/login');
            }

            return view('admin.login');
        }
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('admin/login');
    }
}
