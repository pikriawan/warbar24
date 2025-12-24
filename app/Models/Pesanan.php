<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    use HasFactory;

    protected $table = 'pesanan';

    protected $fillable = [
        'nama_depan',
        'nama_belakang',
        'email',
        'telepon',
        'makan_ditempat',
        'minuman_gratis',
        'total_harga',
        'metode_pembayaran',
        'status_pembayaran',
        'status_pesanan',
        'tanggal_pesanan',
        'tanggal_selesai',
        'transaction_token',
        'midtrans_order_id',
    ];

    protected $casts = [
        'makan_ditempat' => 'boolean',
        'total_harga' => 'decimal:2',
        'tanggal_pesanan' => 'datetime',
        'tanggal_selesai' => 'datetime',
    ];

    // Relasi
    public function detailPesanan()
    {
        return $this->hasMany(DetailPesanan::class, 'pesanan_id');
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status_pesanan', 'pending');
    }

    public function scopeDiproses($query)
    {
        return $query->where('status_pesanan', 'diproses');
    }

    public function scopeSelesai($query)
    {
        return $query->where('status_pesanan', 'selesai');
    }

    public function scopeDibatalkan($query)
    {
        return $query->where('status_pesanan', 'dibatalkan');
    }

    public function scopePembayaranPending($query)
    {
        return $query->where('status_pembayaran', 'pending');
    }

    public function scopePembayaranVerified($query)
    {
        return $query->where('status_pembayaran', 'verified');
    }

    public function scopeHariIni($query)
    {
        return $query->whereDate('tanggal_pesanan', today());
    }

    public function scopeBulanIni($query)
    {
        return $query->whereMonth('tanggal_pesanan', now()->month)
                    ->whereYear('tanggal_pesanan', now()->year);
    }

    // Accessors
    public function getNamaLengkapAttribute()
    {
        return $this->nama_depan . ' ' . $this->nama_belakang;
    }

    public function getTotalHargaFormatAttribute()
    {
        return 'Rp. ' . number_format((float)$this->total_harga, 0, ',', '.') . ',-';
    }

    public function getNomorPesananAttribute()
    {
        return '#' . str_pad($this->id, 5, '0', STR_PAD_LEFT);
    }

    public function getStatusPesananBadgeAttribute()
    {
        $badges = [
            'pending' => '⏳ Pending',
            'diproses' => '🍳 Diproses',
            'selesai' => '✅ Selesai',
            'dibatalkan' => '❌ Dibatalkan',
        ];

        return $badges[$this->status_pesanan] ?? $this->status_pesanan;
    }

    public function getStatusPembayaranBadgeAttribute()
    {
        $badges = [
            'pending' => '⏳ Pending',
            'verified' => '✅ Verified',
            'failed' => '❌ Failed',
            'refunded' => '💸 Refunded',
            'canceled' => '❌ Canceled',
        ];

        return $badges[$this->status_pembayaran] ?? $this->status_pembayaran;
    }

    public function getMetodePembayaranBadgeAttribute()
    {
        return $this->metode_pembayaran === 'cash' ? '💵 Cash' : '📱 Digital';
    }
}