<?php

namespace App\Http\Controllers;

use App\Models\DetailPesanan;
use App\Models\Keranjang;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CartController extends Controller
{
    private function getSessionId()
    {
        $sessionId = request()->cookie('cart_session');

        if (!$sessionId) {
            $sessionId = Str::uuid()->toString();
            Cookie::queue('cart_session', $sessionId, 60 * 24 * 365);
        }

        return $sessionId;
    }

    public function index()
    {
        $sessionId = $this->getSessionId();

        $keranjang = Keranjang::with('menu')
            ->where('session_id', $sessionId)
            ->get()
            ->map(function ($item) {
                $item->total = $item->menu->harga * $item->jumlah;
                return $item;
            });

        $totalHarga = $keranjang->sum('total');

        return Inertia::render('Cart', [
            'keranjang' => $keranjang->values()->all(),
            'totalHarga' => $totalHarga
        ]);
    }

    public function tambah(Request $request)
    {
        $request->validate([
            'menu_id' => 'required|exists:menu,id'
        ]);

        $sessionId = $this->getSessionId();
        $menuId = $request->menu_id;

        $keranjang = Keranjang::where('session_id', $sessionId)
            ->where('menu_id', $menuId)
            ->first();

        if ($keranjang) {
            $keranjang->increment('jumlah');
        } else {
            Keranjang::create([
                'menu_id' => $menuId,
                'session_id' => $sessionId,
                'jumlah' => 1
            ]);
        }

        return response()->json(['status' => 'success']);
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:keranjang,id',
            'action' => 'required|in:plus,minus'
        ]);

        $keranjang = Keranjang::findOrFail($request->id);

        if ($request->action === 'plus') {
            $keranjang->increment('jumlah');
        } elseif ($request->action === 'minus') {
            if ($keranjang->jumlah > 1) {
                $keranjang->decrement('jumlah');
            } else {
                $keranjang->delete();
            }
        }

        return back();
    }

    public function hapus($id)
    {
        $keranjang = Keranjang::findOrFail($id);
        $keranjang->delete();

        return back()->with('success', 'Item berhasil dihapus');
    }

    public function checkout(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nama_belakang' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telepon' => 'required|string|max:20',
            'metode' => 'required|in:cash,digital',
            'minuman_gratis' => 'nullable|string',
            'makan_ditempat' => 'nullable'
        ]);

        $sessionId = $this->getSessionId();

        // Set user identifier cookie
        $userIdentifier = $validated['email'] . '|' . $validated['telepon'];
        Cookie::queue('user_identifier', $userIdentifier, 60 * 24 * 365);

        // Get cart items
        $keranjang = Keranjang::with('menu')
            ->where('session_id', $sessionId)
            ->get();

        if ($keranjang->isEmpty()) {
            return back()->withErrors(['error' => 'Keranjang kosong']);
        }

        $totalHarga = $keranjang->sum(function ($item) {
            return $item->menu->harga * $item->jumlah;
        });

        // Create order
        $pesanan = Pesanan::create([
            'nama_depan' => $validated['nama'],
            'nama_belakang' => $validated['nama_belakang'],
            'email' => $validated['email'],
            'telepon' => $validated['telepon'],
            'metode_pembayaran' => $validated['metode'],
            'status_pembayaran' => 'pending',
            'status_pesanan' => 'pending',
            'total_harga' => $totalHarga,
            'minuman_gratis' => $validated['minuman_gratis'] ?? 'Tidak ada',
            'makan_ditempat' => !empty($validated['makan_ditempat']) ? 1 : 0,
        ]);

        // Create order details
        foreach ($keranjang as $item) {
            DetailPesanan::create([
                'pesanan_id' => $pesanan->id,
                'menu_id' => $item->menu_id,
                'nama_menu' => $item->menu->nama,
                'harga' => $item->menu->harga,
                'jumlah' => $item->jumlah,
                'subtotal' => $item->menu->harga * $item->jumlah
            ]);
        }

        // Clear cart after successful order
        Keranjang::where('session_id', $sessionId)->delete();

        // Handle cash payment - redirect to order detail
        if ($validated['metode'] === 'cash') {
            return Inertia::location(url("/pesanan/{$pesanan->id}")
            );
        }

        // Handle digital payment with Midtrans
        \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
        \Midtrans\Config::$isProduction = config('services.midtrans.is_production');
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;

        $midtransOrderId = (string) Str::uuid();

        $params = [
            'transaction_details' => [
                'order_id' => $midtransOrderId,
                'gross_amount' => $totalHarga,
            ],
            'customer_details' => [
                'first_name' => $validated['nama'],
                'last_name' => $validated['nama_belakang'],
                'email' => $validated['email'],
                'phone' => $validated['telepon'],
            ],
            'callbacks' => [
                'finish' => url("/pesanan/{$pesanan->id}"),
                'error' => url("/pesanan/{$pesanan->id}"),
            ],
        ];

        try {
            $snapToken = \Midtrans\Snap::getSnapToken($params);
            $pesanan->update([
                'midtrans_order_id' => $midtransOrderId,
                'transaction_token' => $snapToken,
            ]);

            return Inertia::location("https://app.sandbox.midtrans.com/snap/v2/vtweb/$snapToken");
        } catch (\Exception $e) {
            // Jika gagal generate token, redirect ke detail dengan error
            return redirect("/pesanan/{$pesanan->id}")
                ->withErrors(['error' => 'Gagal memproses pembayaran digital']);
        }
    }
}