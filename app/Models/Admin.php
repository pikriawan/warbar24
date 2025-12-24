<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'loginadmin';

    protected $fillable = [
        'username',
        'password',
        'role',
        'foto_profil',
        'riwayat_foto_profil',
        
    ];

    protected $hidden = [
        'password',
    ];

    // Override auth guard
    public function getAuthPassword()
    {
        return $this->password;
    }

    public function riwayatFotoProfil(): HasMany
    {
        return $this->hasMany(RiwayatFotoProfil::class);
    }
}