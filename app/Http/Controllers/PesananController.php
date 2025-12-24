<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PesananController extends Controller
{
    public function index()
    {
        $userIdentifier = request()->cookie('user_identifier');

        if (!$userIdentifier) {
            $pesanan = collect();
        } else {
            [$email, $telepon] = explode('|', $userIdentifier);
            
            $pesanan = Pesanan::where('email', $email)
                ->where('telepon', $telepon)
                ->orderBy('tanggal_pesanan', 'desc')
                ->limit(50)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'total_harga' => $order->total_harga,
                        'metode_pembayaran' => $order->metode_pembayaran,
                        'status_pembayaran' => $order->status_pembayaran,
                        'status_pesanan' => $order->status_pesanan,
                        'tanggal_pesanan' => $order->tanggal_pesanan->format('d/m/Y H:i'),
                    ];
                });
        }

        return Inertia::render('Pesanan', [
            'pesanan' => $pesanan
        ]);
    }

    public function show($id)
    {
        $pesanan = Pesanan::with('detailPesanan')->findOrFail($id);

        // Validate access
        $userIdentifier = request()->cookie('user_identifier');
        if ($userIdentifier) {
            $pesananIdentifier = $pesanan->email . '|' . $pesanan->telepon;
            
            if ($userIdentifier !== $pesananIdentifier) {
                abort(403, 'Anda tidak memiliki akses ke pesanan ini');
            }
        }

        return Inertia::render('PesananDetail', [
            'pesanan' => [
                'id' => $pesanan->id,
                'nama_lengkap' => $pesanan->nama_lengkap,
                'total_harga' => $pesanan->total_harga,
                'metode_pembayaran' => $pesanan->metode_pembayaran,
                'status_pembayaran' => $pesanan->status_pembayaran,
                'status_pesanan' => $pesanan->status_pesanan,
                'tanggal_pesanan' => $pesanan->tanggal_pesanan->format('d/m/Y H:i'),
                'transaction_token' => $pesanan->transaction_token,
                'detail_pesanan' => $pesanan->detailPesanan->map(function ($item) {
                    return [
                        'nama_menu' => $item->nama_menu,
                        'harga' => $item->harga,
                        'jumlah' => $item->jumlah,
                        'subtotal' => $item->subtotal,
                    ];
                }),
            ]
        ]);
    }

    public function batalkan(Request $request)
    {
        $pesanan = Pesanan::findOrFail($request->pesanan_id);
        
        $pesanan->update([
            'status_pesanan' => 'dibatalkan',
            'status_pembayaran' => 'canceled'
        ]);

        return response()->json(['status' => 'success']);
    }
}