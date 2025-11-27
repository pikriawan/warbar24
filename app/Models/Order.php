<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_id',
        'admin_id',
        'table_number',
        'status',
        'notes',
        'processed_at',
        'finished_at',
        'canceled_at'
    ];
}
