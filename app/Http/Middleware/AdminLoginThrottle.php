<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Support\Facades\Log;

class AdminLoginThrottle extends ThrottleRequests
{
    public function handle(
        $request,
        Closure $next,
        $maxAttempts = 5,
        $decayMinutes = 1,
        $prefix = 'admin-login'
    ) {
        try {
            return parent::handle(
                $request,
                $next,
                $maxAttempts,
                $decayMinutes,
                $prefix
            );
        } catch (ThrottleRequestsException $e) {

            // 🔥 INI BARU PASTI KELOG
            Log::warning('Rate limit admin login terpicu', [
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'time' => now(),
            ]);

            DB::table('activity_logs')->insert([
                'type' => 'login_failed',
                'username' => $request->username,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'description' => 'Login admin gagal',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            throw $e;
        }
    }
}
