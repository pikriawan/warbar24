<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menus = Menu::orderBy('kategori')
            ->orderByRaw('(stok = 0) ASC')
            ->orderBy('id')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $menus,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama'     => 'required|string|max:255',
            'harga'    => 'required|numeric|min:0',
            'kategori' => 'required|in:makanan,minuman',
            'stok'     => 'required|in:0,1',
            'gambar'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $data = [
            'nama'     => $request->nama,
            'harga'    => $request->harga,
            'kategori' => $request->kategori,
            'stok'     => $request->stok,
        ];

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $pathname = $file->store('uploads', 'public');
            $filename = basename($pathname);
            $data['gambar'] = $filename;
        }

        $menu = Menu::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Menu berhasil ditambahkan',
            'data'    => $menu,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        return response()->json([
            'success' => true,
            'data'    => $menu
        ]);
    }

    public function showImage(Menu $menu)
    {
        if (!$menu->gambar) {
            abort(404);
        }

        $file = storage_path('app/public/uploads/') . $menu->gambar;

        if (!file_exists($file)) {
            abort(404);
        }

        return response()->file($file);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        $validator = Validator::make($request->all(), [
            'nama'     => 'required|string|max:255',
            'harga'    => 'required|numeric|min:0',
            'kategori' => 'required|in:makanan,minuman',
            'stok'     => 'required|in:0,1',
            'gambar'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $data = [
            'nama'     => $request->nama,
            'harga'    => $request->harga,
            'kategori' => $request->kategori,
            'stok'     => $request->stok,
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

        return response()->json([
            'success' => true,
            'message' => 'Menu berhasil diupdate',
            'data'    => $menu->fresh(),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        try {
            DB::transaction(function () use ($menu, &$transaksiCount) {

                // Hitung transaksi terkait (pakai relasi model)
                $transaksiCount = $menu->detailPesanan()->count();

                if (Storage::disk('public')->exists('uploads/' . $menu->gambar)) {
                Storage::disk('public')->delete('uploads/' . $menu->gambar);
            }

                // Hapus menu
                // (menu_id di detail_pesanan otomatis NULL jika FK nullable + onDelete set null)
                $menu->delete();
            });

            return response()->json([
                'success' => true,
                'message' => "Menu berhasil dihapus",
                'report'  => [
                    'menu_nama'          => $menu->nama,
                    'transaksi_tersisa'  => $transaksiCount,
                    'gambar_dihapus'     => true,
                    'laporan_tetap_aman' => true
                ]
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus menu',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
