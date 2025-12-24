<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RiwayatFotoProfil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfilController extends Controller
{
    public function index()
    {
        $admin = Auth::guard('admin')->user();
        
        return Inertia::render('Admin/Profil', [
            'admin' => $admin
        ]);
    }

    public function update(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        $request->validate([
            'username' => 'required|string|max:255|unique:loginadmin,username,' . $admin->id,
            'password_lama' => 'nullable',
            'password_baru' => 'nullable|min:6',
            'konfirmasi_password' => 'nullable|same:password_baru',
            'foto_profil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = ['username' => $request->username];

        // Upload foto profil
        if ($request->hasFile('foto_profil')) {
            // Hapus foto lama
            if ($admin->foto_profil && file_exists(public_path('uploads/' . $admin->foto_profil))) {
                unlink(public_path('uploads/' . $admin->foto_profil));
            }

            $file = $request->file('foto_profil');
            $filename = 'profil_' . $admin->id . '_' . time() . '.' . $file->getClientOriginalExtension();
            
            if (!file_exists(public_path('uploads'))) {
                mkdir(public_path('uploads'), 0777, true);
            }

            Storage::putFileAs('uploads', $request->file('foto_profil'), $filename);
            Storage::disk('public')->putFileAs('uploads', $request->file('foto_profil'), $filename);

            RiwayatFotoProfil::create([
                'admin_id' => $admin->id,
                'url' => $filename,
            ]);
            
            $file->move(public_path('uploads'), $filename);
            $data['foto_profil'] = $filename;

        }

        // Update password jika diisi
        if ($request->filled('password_baru')) {
            if (md5($request->password_lama) !== $admin->password) {
                return back()->withErrors(['password_lama' => 'Password lama tidak sesuai!']);
            }
            $data['password'] = md5($request->password_baru);
        }

        $admin->update($data);

        return back()->with('success', 'Profil berhasil diperbarui!');
    }

    public function indexRiwayatFotoProfil(Request $request)
    {
        $admin = Auth::guard('admin')->user();
        $fotoProfilUrl = $request->query('url');

        if (!$fotoProfilUrl) {
            $riwayatFotoProfil = RiwayatFotoProfil::where('admin_id', $admin->id)->get()
                ->map(function ($fotoProfil) {
                    return $fotoProfil->url;
                });
    
            return Inertia::render('Admin/RiwayatFotoProfil', [
                'riwayatFotoProfil' => $riwayatFotoProfil,
            ]);
        }

        $fotoProfil = RiwayatFotoProfil::where('admin_id', $admin->id)
            ->where('url', $fotoProfilUrl)
            ->first();

        if (!$fotoProfil) {
            return Inertia::location('/admin/profil');
        }

        $fotoProfil = $fotoProfil->url;

        return Storage::download("uploads/$fotoProfil");
    }
}