<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $sessionId = session()->getId();

        $orders = Order::whereSessionId($sessionId)
            ->where('status', '!=', null)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'orders' => $orders
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $sessionId = session()->getId();

        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        if ($order->session_id != $sessionId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'order' => $order
            ]
        ]);
    }
}
