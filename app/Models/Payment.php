<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'order_id',
        'admin_id',
        'method',
        'status',
        'finished_at',
        'canceled_at'
    ];
}
