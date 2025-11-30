<?php

namespace App\Http\Resources;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): ?array
    {
        try
        {
            if (session()->getId() === $this->session_id)
            {
                return parent::toArray($request);
            }

            return null;
        }
        catch (Exception $e)
        {
            return null;
        }
    }
}
