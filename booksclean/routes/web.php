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

Route::middleware(['cors'])->group(function () {});

//Register and Login
Route::any('/registerEQS', 'App\Http\Controllers\Controller@registerEQS');
Route::any('/loginEQS', 'App\Http\Controllers\Controller@loginEQS');

//Menu and Profile
Route::any('profileEQS', 'App\Http\Controllers\Controller@getProfileEQS');

Route::any('userProfile', 'App\Http\Controllers\Controller@getUserProfile');
Route::any('editProfile', 'App\Http\Controllers\Controller@editProfile');

//Get Book from API
Route::any('books', 'App\Http\Controllers\Controller@getBooks');  
Route::any('book', 'App\Http\Controllers\Controller@getBook');
Route::any('searchBook', 'App\Http\Controllers\Controller@searchBook');

//Book To Locat Storage
Route::any('addBookEQS', 'App\Http\Controllers\Controller@addBookEQS');

// Cart to Purchase
Route::any('addCartEQS', 'App\Http\Controllers\Controller@addCartEQS'); 
Route::any('cartItemEQS', 'App\Http\Controllers\Controller@getCartItemEQS'); 
Route::any('purchaseEQS', 'App\Http\Controllers\Controller@purchaseEQS'); 

//Libraries
Route::any('libraryListEQS', 'App\Http\Controllers\Controller@getLibraryListEQS');
Route::any('libraryEQS', 'App\Http\Controllers\Controller@getLibraryEQS');
Route::any('getLibraryItemEQS', 'App\Http\Controllers\Controller@getLibraryItemEQS'); 

//Library Actions
Route::any('addLibraryEQS', 'App\Http\Controllers\Controller@addLibraryEQS');
Route::any('editLibraryEQS', 'App\Http\Controllers\Controller@editLibraryEQS'); 
Route::any('deleteBookEQS', 'App\Http\Controllers\Controller@deleteBookEQS');
Route::any('deleteLibraryEQS', 'App\Http\Controllers\Controller@deleteLibraryEQS'); 

//BookPrice
Route::any('editBookPriceEQS', 'App\Http\Controllers\Controller@editBookPriceEQS'); 
Route::any('priceEQS', 'App\Http\Controllers\Controller@getPriceEQS'); 

//Reports
Route::any('getPurchaseEQS', 'App\Http\Controllers\Controller@getPurchaseEQS'); 
Route::any('searchPurchaseEQS', 'App\Http\Controllers\Controller@searchPurchaseEQS');

//Testing
Route::get('token', 'App\Http\Controllers\Controller@getToken');
//Don use this
Route::any('test', 'App\Http\Controllers\Controller@ModelTesting');
Route::any('loginEQ', 'App\Http\Controllers\Controller@loginEQ');
Route::any('errorwentwrong', 'App\Http\Controllers\Controller@errorwentwrong');


