<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PesananController extends Controller
{
    public function index(Request $request)
    {
        $filter = $request->get('filter', 'all');

        $query = Pesanan::query()
            ->with('detailPesanan')
            ->orderBy('tanggal_pesanan', 'desc');

        if ($filter !== 'all') {
            $query->where('status_pesanan', $filter);
        }

        $pesanans = $query->get();

        return Inertia::render('Admin/PesananIndex', [
            'pesanans' => $pesanans,
            'filter' => $filter
        ]);
    }

    public function show(Pesanan $pesanan)
    {
        $pesanan->load('detailPesanan');
        
        return Inertia::render('Admin/PesananDetail', [
            'pesanan' => [
                'id' => $pesanan->id,
                'nama_lengkap' => $pesanan->nama_lengkap,
                'email' => $pesanan->email,
                'telepon' => $pesanan->telepon,
                'makan_ditempat' => $pesanan->makan_ditempat,
                'minuman_gratis' => $pesanan->minuman_gratis,
                'tanggal_pesanan' => $pesanan->tanggal_pesanan,
                'metode_pembayaran' => $pesanan->metode_pembayaran,
                'status_pembayaran' => $pesanan->status_pembayaran,
                'status_pesanan' => $pesanan->status_pesanan,
                'tanggal_selesai' => $pesanan->tanggal_selesai,
                'total_harga' => $pesanan->total_harga,
                'detail_pesanan' => $pesanan->detailPesanan
            ]
        ]);
    }

    // ✅ ADMIN & KASIR
    public function verifikasiPembayaran(Request $request, Pesanan $pesanan)
    {
        if (!in_array(auth()->guard('admin')->user()->role, ['admin', 'kasir'])) {
            abort(403);
        }

        if ($pesanan->metode_pembayaran !== 'cash') {
            return back()->with('error', 'Hanya pembayaran cash yang bisa diverifikasi manual!');
        }

        if ($pesanan->status_pembayaran === 'verified') {
            return back()->with('error', 'Pembayaran sudah diverifikasi sebelumnya!');
        }

        $pesanan->update(['status_pembayaran' => 'verified']);

        return back()->with('success', '💵 Pembayaran cash berhasil diverifikasi!');
    }

    // ✅ ADMIN & DAPUR
    public function lanjutkanStatus(Request $request, Pesanan $pesanan)
    {
        if (!in_array(auth()->guard('admin')->user()->role, ['admin', 'dapur'])) {
            abort(403);
        }

        $status_lama  = $pesanan->status_pesanan;
        $status_bayar = $pesanan->status_pembayaran;

        if ($status_lama === 'pending' && $status_bayar === 'verified') {
            $pesanan->update(['status_pesanan' => 'diproses']);
            $message = '✅ Status pesanan berhasil dilanjutkan ke DIPROSES!';
        } elseif ($status_lama === 'diproses') {
            $pesanan->update([
                'status_pesanan'   => 'selesai',
                'tanggal_selesai' => now(),
            ]);
            $message = '✅ Status pesanan berhasil dilanjutkan ke SELESAI!';
        } else {
            return back()->with('error', '❌ Tidak dapat melanjutkan! Pastikan pembayaran sudah diverifikasi.');
        }

        return back()->with('success', $message);
    }

    // ✅ ADMIN & KASIR
    public function batalkan(Request $request, Pesanan $pesanan)
    {
        if (!in_array(auth()->guard('admin')->user()->role, ['admin', 'kasir'])) {
            abort(403);
        }

        if (in_array($pesanan->status_pesanan, ['selesai', 'dibatalkan'])) {
            return back()->with(
                'error',
                '❌ Pesanan sudah ' . strtoupper($pesanan->status_pesanan) . ', tidak dapat dibatalkan!'
            );
        }

        $statusBayarBaru = $pesanan->status_pembayaran === 'verified'
            ? 'refunded'
            : 'canceled';

        $pesanan->update([
            'status_pesanan'     => 'dibatalkan',
            'status_pembayaran' => $statusBayarBaru,
        ]);

        $message  = "✅ Pesanan berhasil dibatalkan!\n";
        $message .= "Status pembayaran: " . strtoupper($statusBayarBaru);

        return back()->with('success', $message);
    }

    // Midtrans Notification (tetap sama)
    public function notification(Request $request)
    {
        \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
        \Midtrans\Config::$isProduction = config('services.midtrans.is_production');

        $notification = new \Midtrans\Notification();

        $transactionStatus = $notification->transaction_status;
        $fraudStatus = $notification->fraud_status;
        $orderId = $notification->order_id;

        $pesanan = Pesanan::where('midtrans_order_id', $orderId)->first();

        if (!$pesanan) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        if ($transactionStatus == 'capture') {
            if ($fraudStatus == 'accept') {
                $pesanan->update(['status_pembayaran' => 'verified']);
            }
        } elseif ($transactionStatus == 'settlement') {
            $pesanan->update(['status_pembayaran' => 'verified']);
        } elseif ($transactionStatus == 'pending') {
            $pesanan->update(['status_pembayaran' => 'pending']);
        } elseif (in_array($transactionStatus, ['deny', 'expire', 'cancel'])) {
            $pesanan->update(['status_pembayaran' => 'failed']);
        }

        return response()->json(['message' => 'Notification handled']);
    }
}