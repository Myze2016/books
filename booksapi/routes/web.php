<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::any('user','App\Http\Controllers\Controller@getUser');
Route::any('login','App\Http\Controllers\Controller@login');
Route::any('cart', 'App\Http\Controllers\Main\MainController@getCart'); 
Route::any('addBook', 'App\Http\Controllers\Main\MainController@addBook'); 
Route::any('addBookPrice', 'App\Http\Controllers\Main\MainController@addBookPrice'); 
Route::any('addCart', 'App\Http\Controllers\Main\MainController@addCart'); 
Route::any('libraryList', 'App\Http\Controllers\Main\MainController@getLibraryList'); 