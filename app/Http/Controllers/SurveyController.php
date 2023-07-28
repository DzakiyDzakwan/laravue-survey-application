<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SurveyController extends Controller
{

    public function create(Request $request) {
        //Create Here
        return response()->json([
            "message" => "create success"
        ], 200);
    }

    public function destroy(Request $request) {
        //Delete Here
        return response()->json([
            "message" => "delete success"
        ], 200);
    }
}
