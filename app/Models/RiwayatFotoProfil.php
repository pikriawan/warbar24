<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RiwayatFotoProfil extends Model
{
    protected $table = 'riwayat_foto_profil';

    protected $fillable = [
        'admin_id',
        'url',
    ];

    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class);
    }
}
