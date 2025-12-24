<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $admin = Admin::where('username', $request->string('username'))->first();

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Username not found',
            ], 404);
        }

        if ($admin->password === md5($request->string("password"))) {
            Auth::guard('admin')->login($admin);
            $token = $admin->createToken('token');
            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'token'   => $token->plainTextToken,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Incorrect password',
        ], 400);
    }

    public function show(Request $request)
    {
        $admin = $request->user();

        return response()->json([
            'success' => true,
            'data'    => $admin,
        ]);
    }

    public function showProfilePhoto(Request $request)
    {
        $admin = $request->user();

        if (!$admin->foto_profil) {
            abort(404);
        }

        $file = storage_path('app/public/uploads/' . $admin->foto_profil);

        if (!file_exists($file)) {
            abort(404);
        }

        return response()->file($file);
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logout successful',
        ]);
    }
}
