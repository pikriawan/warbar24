<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use Illuminate\Http\Request;

class MidtransController extends Controller
{
    public function callback(Request $request)
    {
        $pesanan = Pesanan::where('midtrans_order_id', $request->order_id)->first();

        if ($pesanan) {
            if ($request->transaction_status == 'capture' || $request->transaction_status == 'settlement') {
                $pesanan->status_pembayaran = 'verified';
                $pesanan->save();
            } else if ($request->transaction_status == 'cancel') {
                $pesanan->transaction_status = 'canceled';
            } else if ($request->transaction_status == 'refund') {
                $pesanan->transaction_status = 'refunded';
            } else {
                $pesanan->transaction_status = 'failed';
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Payment updated successfully'
        ]);
    }
}
