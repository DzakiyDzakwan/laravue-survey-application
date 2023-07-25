<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
    public function register(Request $request) {
        $data = $request->validate([
            'email' => 'required|unique:users',
            'full_name' => 'required|string',
            'password' => [
                'required',
                Password::min(8)->mixedCase()->numbers()
            ]
        ]);

        $user = User::create([
            'email' => $data['email'],
            'name' => $data['full_name'],
            'password' => Hash::make($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;


        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request) {
        $data = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        
        if (Auth::attempt($data)) {

            $user = Auth::user();

            $token = $user->createToken('main')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        } else {
            return response()->json([
                'error' => "Your provided credentials are not correct"
            ], 422);
        }
    }

    public function logout(Request $request) {
        $user = Auth::user();
        //Revoke the token that was used to authenticate the current request....
        $user->currentAccessToken()->delete();

        return response()->json([
            'message' => "You've been successfully log out"
        ], 200);
    }

}
