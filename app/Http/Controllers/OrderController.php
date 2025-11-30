<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderController extends Controller
{
    public function showAll(Request $request): JsonResource
    {
        try
        {
            return OrderResource::collection(Order::whereSessionId(session()->getId())->get());
        }
        catch (Exception $e)
        {
            return new JsonResource([]);
        }
    }

    public function show(Request $request, string $id): JsonResource
    {
        return new OrderResource(Order::find($id));
    }

    public function store(Request $request): JsonResource
    {
        $order = new Order(['session_id' => session()->getId()]);
        $order->save();

        return new JsonResource([
            'status' => true,
            'message' => 'Order created',
            'data' => [
                'order' => $order
            ]
        ]);
    }
}
