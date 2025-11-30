<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = [
        'admin_id',
        'name',
        'category',
        'stock',
        'price',
        'image'
    ];

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
