<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->post('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->any('/cartEQS', [Apicontroller::class, 'getCartEQS']);
Route::middleware('auth:sanctum')->any('/libraryEQS', [Apicontroller::class, 'getLibraryEQS']);
Route::middleware('auth:sanctum')->any('/deleteBookEQS', [Apicontroller::class, 'deleteBookEQS']);
Route::middleware('auth:sanctum')->any('/deleteLibraryEQS', [Apicontroller::class, 'deleteLibraryEQS']);
Route::middleware('auth:sanctum')->any('/purchaseEQS', [Apicontroller::class, 'purchaseEQS']);

