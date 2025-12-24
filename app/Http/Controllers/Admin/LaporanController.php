<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        $periode = $request->get('periode', 'hari_ini');
        $tanggal_awal = date('Y-m-d');
        $tanggal_akhir = date('Y-m-d');

        // Set periode berdasarkan pilihan
        switch ($periode) {
            case 'hari_ini':
                $tanggal_awal = date('Y-m-d');
                $tanggal_akhir = date('Y-m-d');
                break;
            case 'minggu_ini':
                $tanggal_awal = date('Y-m-d', strtotime('monday this week'));
                $tanggal_akhir = date('Y-m-d');
                break;
            case 'bulan_ini':
                $tanggal_awal = date('Y-m-01');
                $tanggal_akhir = date('Y-m-d');
                break;
            case 'tahun_ini':
                $tanggal_awal = date('Y-01-01');
                $tanggal_akhir = date('Y-m-d');
                break;
            case 'custom':
                $tanggal_awal = $request->get('tanggal_awal', date('Y-m-d'));
                $tanggal_akhir = $request->get('tanggal_akhir', date('Y-m-d'));
                break;
        }

        // Query statistik umum
        $stats = DB::table('pesanan')
            ->selectRaw('
                COUNT(*) as total_pesanan,
                SUM(CASE WHEN status_pesanan = "selesai" THEN 1 ELSE 0 END) as pesanan_selesai,
                SUM(CASE WHEN status_pesanan = "pending" THEN 1 ELSE 0 END) as pesanan_pending,
                SUM(CASE WHEN status_pesanan = "diproses" THEN 1 ELSE 0 END) as pesanan_diproses,
                SUM(CASE WHEN status_pesanan = "dibatalkan" THEN 1 ELSE 0 END) as pesanan_dibatalkan,
                SUM(CASE WHEN status_pesanan = "selesai" THEN total_harga ELSE 0 END) as total_pendapatan,
                SUM(CASE WHEN status_pembayaran = "pending" THEN total_harga ELSE 0 END) as pending_payment,
                SUM(CASE WHEN status_pembayaran = "verified" AND status_pesanan != "selesai" THEN total_harga ELSE 0 END) as verified_belum_selesai,
                SUM(CASE WHEN status_pembayaran = "refunded" THEN total_harga ELSE 0 END) as total_refund,
                SUM(CASE WHEN status_pembayaran = "canceled" THEN total_harga ELSE 0 END) as total_canceled
            ')
            ->whereDate('tanggal_pesanan', '>=', $tanggal_awal)
            ->whereDate('tanggal_pesanan', '<=', $tanggal_akhir)
            ->first();

        // Inisialisasi nilai default jika null
        $stats = [
            'total_pesanan' => $stats->total_pesanan ?? 0,
            'pesanan_selesai' => $stats->pesanan_selesai ?? 0,
            'pesanan_pending' => $stats->pesanan_pending ?? 0,
            'pesanan_diproses' => $stats->pesanan_diproses ?? 0,
            'pesanan_dibatalkan' => $stats->pesanan_dibatalkan ?? 0,
            'total_pendapatan' => $stats->total_pendapatan ?? 0,
            'pending_payment' => $stats->pending_payment ?? 0,
            'verified_belum_selesai' => $stats->verified_belum_selesai ?? 0,
            'total_refund' => $stats->total_refund ?? 0,
            'total_canceled' => $stats->total_canceled ?? 0,
        ];

        // Pendapatan harian (untuk grafik)
        $daily = DB::table('pesanan')
            ->selectRaw('
                DATE(tanggal_pesanan) as tanggal,
                COUNT(*) as jumlah_pesanan,
                SUM(CASE WHEN status_pesanan = "selesai" THEN total_harga ELSE 0 END) as pendapatan
            ')
            ->whereDate('tanggal_pesanan', '>=', $tanggal_awal)
            ->whereDate('tanggal_pesanan', '<=', $tanggal_akhir)
            ->groupBy(DB::raw('DATE(tanggal_pesanan)'))
            ->orderBy('tanggal', 'asc')
            ->get();

        $chart_labels = [];
        $chart_data = [];
        foreach ($daily as $d) {
            $chart_labels[] = date('d M', strtotime($d->tanggal));
            $chart_data[] = (float)($d->pendapatan ?? 0);
        }

        // Metode pembayaran
        $payment = DB::table('pesanan')
            ->selectRaw('
                metode_pembayaran,
                COUNT(*) as jumlah,
                SUM(CASE WHEN status_pesanan = "selesai" THEN total_harga ELSE 0 END) as total
            ')
            ->whereDate('tanggal_pesanan', '>=', $tanggal_awal)
            ->whereDate('tanggal_pesanan', '<=', $tanggal_akhir)
            ->where('status_pesanan', 'selesai')
            ->groupBy('metode_pembayaran')
            ->get();

        $payment_cash = ['jumlah' => 0, 'total' => 0];
        $payment_digital = ['jumlah' => 0, 'total' => 0];

        foreach ($payment as $p) {
            if ($p->metode_pembayaran === 'cash') {
                $payment_cash = ['jumlah' => $p->jumlah, 'total' => $p->total];
            } else {
                $payment_digital = ['jumlah' => $p->jumlah, 'total' => $p->total];
            }
        }

        return Inertia::render('Admin/Laporan', [
            'periode' => $periode,
            'tanggal_awal' => $tanggal_awal,
            'tanggal_akhir' => $tanggal_akhir,
            'stats' => $stats,
            'chart_labels' => $chart_labels,
            'chart_data' => $chart_data,
            'payment_cash' => $payment_cash,
            'payment_digital' => $payment_digital,
        ]);
    }
}