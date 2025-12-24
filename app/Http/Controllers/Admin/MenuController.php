<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Laravel\Pail\File;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::orderBy('kategori', 'asc')
                     ->orderBy('id', 'asc')
                     ->get();
                     
        return Inertia::render('Admin/MenuIndex', [
            'menus' => $menus
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/MenuCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'kategori' => 'required|in:makanan,minuman',
            'stok' => 'required|in:0,1',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        $data = [
            'nama' => $request->nama,
            'harga' => $request->harga,
            'kategori' => $request->kategori,
            'stok' => $request->stok,
        ];

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $pathname = $file->store('uploads', 'public');
            $filename = basename($pathname);
            $data['gambar'] = $filename;
        }

        Menu::create($data);

        return Inertia::location(route('admin.menu.index'));
    }

    public function edit(Menu $menu)
    {
        return Inertia::render('Admin/MenuEdit', [
            'menu' => $menu
        ]);
    }

    public function update(Request $request, Menu $menu)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'kategori' => 'required|in:makanan,minuman',
            'stok' => 'required|in:0,1',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        $data = [
            'nama' => $request->nama,
            'harga' => $request->harga,
            'kategori' => $request->kategori,
            'stok' => $request->stok,
        ];

        if ($request->hasFile('gambar')) {
            if (Storage::disk('public')->exists('uploads/' . $menu->gambar)) {
                Storage::disk('public')->delete('uploads/' . $menu->gambar);
            }

            $file = $request->file('gambar');
            $pathname = $file->store('uploads', 'public');
            $filename = basename($pathname);
            $data['gambar'] = $filename;
        }

        $menu->update($data);

        return Inertia::location(route('admin.menu.index'));
    }

    public function destroy(Menu $menu)
    {
        try {
            DB::beginTransaction();

            // Hitung transaksi yang ada
            $transaksi_count = DB::table('detail_pesanan')
                                ->where('menu_id', $menu->id)
                                ->count();

            if (Storage::disk('public')->exists('uploads/' . $menu->gambar)) {
                Storage::disk('public')->delete('uploads/' . $menu->gambar);
            }

            // Hapus menu
            $menu->delete();

            DB::commit();

            $message = "✅ Menu '{$menu->nama}' berhasil dihapus!\n\n";
            $message .= "📋 Yang dihapus:\n";
            $message .= "- Menu dari database\n";
            $message .= "- File gambar\n\n";
            $message .= "✅ LAPORAN TETAP UTUH:\n";
            $message .= "- {$transaksi_count} transaksi tetap tercatat\n";
            $message .= "- Data nama menu & harga tetap ada";

            return Inertia::location(route('admin.menu.index'));
                           
        } catch (\Exception $e) {
            DB::rollBack();
            
            return Inertia::location(route('admin.menu.index'));
        }
    }
}