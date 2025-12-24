<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Keranjang extends Model
{
    protected $table = 'keranjang';

    protected $fillable = [
        'menu_id',
        'session_id',
        'jumlah'
    ];

    protected $casts = [
        'jumlah' => 'integer'
    ];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }

    public function getTotalAttribute()
    {
        return $this->menu->harga * $this->jumlah;
    }
}
