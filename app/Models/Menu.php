<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $table = 'menu';

    protected $fillable = [
        'nama',
        'harga',
        'kategori',
        'stok',
        'gambar',
    ];

    protected $casts = [
        'harga' => 'decimal:2',
        'stok' => 'integer',
    ];

    // Relasi
    public function keranjang()
    {
        return $this->hasMany(Keranjang::class);
    }

    public function detailPesanan()
    {
        return $this->hasMany(DetailPesanan::class, 'menu_id');
    }

    public function isAvailable()
    {
        return $this->stok > 0;
    }

    // Scopes
    public function scopeTersedia($query)
    {
        return $query->where('stok', '>', 0);
    }

    public function scopeHabis($query)
    {
        return $query->where('stok', '<=', 0);
    }

    public function scopeMakanan($query)
    {
        return $query->where('kategori', 'makanan');
    }

    public function scopeMinuman($query)
    {
        return $query->where('kategori', 'minuman');
    }

    // Accessors
    public function getGambarUrlAttribute()
    {
        if ($this->gambar) {
            return asset('uploads/' . $this->gambar);
        }
        return asset('uploads/placeholder.png');
    }

    public function getHargaFormatAttribute()
    {
        return 'Rp. ' . number_format((float)$this->harga, 0, ',', '.') . ',-';
    }

    public function getStatusStokAttribute()
    {
        return $this->stok > 0 ? 'Tersedia' : 'Habis';
    }
}