<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Models\User as User;
use App\Models\CartPurchase as CartPurchase;
use App\Models\Cart as Cart;
use App\Models\Book as Book;
use App\Models\Library as Library;
use App\Models\LibraryDetail as LibraryDetail;


//header('Access-Control-Allow-Credentials: true');

//header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token,authorization,Origin,x-csrf-token,csrf-token, accept');



class ApiController extends BaseController {
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getCartEQS(Request $request){

        if ($request->getMethod()=='OPTIONS') { return ; };
        $result = Cart::leftjoin('tblcart_purchase', 'tblcart_purchase.CartID','=','tblcart.CartID')->leftjoin('tblbooks', 'tblbooks.BookID','=','tblcart.BookID')->select('tblcart.CartID','tblbooks.Price','tblcart_purchase.Amount','tblbooks.Name','tblbooks.ApiID')->get();
        return $result;
    
    }

    public function getLibraryEQS(Request $request){

        $books = Library::with('books.book')->get();
        return $books;

    }

    public function deleteBookEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };

        $LibraryUserID = $request->input('LibraryUserID');

        $LibraryDetail = LibraryDetail::find($LibraryUserID);
        $LibraryDetail->delete();

        return 'success';
    }

    public function deleteLibraryEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $LibraryID = $request->input('LibraryID');

        $Library = Library::find($LibraryID);
        $Library->delete();

        $LibraryDetail = Library::where('LibraryID',$LibraryID)->delete();

        return 'success';
    }

    public function purchaseEQS(Request $request){
        //Done Refactor
        if ($request->getMethod()=='OPTIONS') { return; };

        $CartID = $request->input('CartID');
        $Amount = $request->input('Amount');
        
       
        $cartPurchase = new CartPurchase;
        $cartPurchase->CartID = $CartID;
        $cartPurchase->Amount = $Amount;
        $cartPurchase->save();

        return 'success';
    }


}
