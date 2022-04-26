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
Route::any('cart', 'App\Http\Controllers\Controller@getCart'); 
Route::any('addBook', 'App\Http\Controllers\Controller@addBook'); 
Route::any('addBookPrice', 'App\Http\Controllers\Controller@addBookPrice'); 
Route::any('editBookPrice', 'App\Http\Controllers\Controller@editBookPrice'); 
Route::any('addCart', 'App\Http\Controllers\Controller@addCart'); 
Route::any('libraryList', 'App\Http\Controllers\Controller@getLibraryList'); 
Route::any('library', 'App\Http\Controllers\Controller@getLibrary');
Route::any('deleteBook', 'App\Http\Controllers\Controller@deleteBook');
Route::any('deleteLibrary', 'App\Http\Controllers\Controller@deleteLibrary'); 
Route::any('addLibrary', 'App\Http\Controllers\Controller@addLibrary');
Route::any('editLibrary', 'App\Http\Controllers\Controller@editLibrary'); 
Route::any('cartItem', 'App\Http\Controllers\Controller@getCartItem'); 
Route::any('purchase', 'App\Http\Controllers\Controller@purchase'); 
Route::any('getLibraryItem', 'App\Http\Controllers\Controller@getLibraryItem'); 
Route::any('getPurchase', 'App\Http\Controllers\Controller@getPurchase'); 
Route::any('searchBook', 'App\Http\Controllers\Controller@searchBook'); 
Route::any('searchPurchase', 'App\Http\Controllers\Controller@searchPurchase');
Route::any('books', 'App\Http\Controllers\Controller@getBooks');  
Route::any('book', 'App\Http\Controllers\Controller@getBook');
Route::any('price', 'App\Http\Controllers\Controller@getPrice'); 
Route::any('profile', 'App\Http\Controllers\Controller@getProfile');
Route::any('editProfile', 'App\Http\Controllers\Controller@editProfile');