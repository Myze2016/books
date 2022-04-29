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
use App\Models\Profile as Profile;


//header('Access-Control-Allow-Credentials: true');

//header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token,authorization,Origin,x-csrf-token,csrf-token, accept');



class ApiController extends BaseController {
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getCartEQS(Request $request){

        if ($request->getMethod()=='OPTIONS') { return ; };
        $UserID = $request->input('UserID');
        $result = Cart::leftjoin('tblcart_purchase', 'tblcart_purchase.CartID','=','tblcart.CartID')->leftjoin('tblbooks', 'tblbooks.BookID','=','tblcart.BookID')->select('tblcart.CartID','tblbooks.Price','tblcart_purchase.Amount','tblbooks.Name','tblbooks.ApiID')->where('tblcart.UserID',$UserID)->get();
        return $result;
    
    }

    public function getLibraryEQS(Request $request){

        
        $UserID = $request->input('UserID');
        $books = Library::with('books.book')->where('tbllibrary.UserID', $UserID)->get();
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

    public function getPurchaseEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        
        // $result = \DB::connection()->select('select a.Amount,b.CartID,a.*,b.*,c.*,MONTH(a.xTimestamp) as Month,YEAR(a.xTimestamp) as Year,(if(a.Amount=c.Price OR a.Amount>c.Price,"done","pending")) as Purchase,(select sum(Amount) from tblcart_purchase) as total from tblcart_purchase a inner join tblcart b on a.CartID=b.CartID inner join tblbooks c on c.BookID=b.BookID');

        $result = CartPurchase::with('cart.cartBook','cart.cartUser')
        ->select('*')->selectRaw('MONTH(tblcart_purchase.xTimestamp) as Month,YEAR(tblcart_purchase.xTimestamp) as Year,(select sum(Amount) from tblcart_purchase ) as Total')->get();
        

        if (count($result)==0) {
            return 'no-results';
        }

        return $result;
    }

    public function searchPurchaseEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };

        $Month = $request->input('month');
        $Year = $request->input('year');

        $result = CartPurchase::with('cart.cartBook','cart.cartUser')->select('*')->selectRaw('MONTH(tblcart_purchase.xTimestamp) as Month,YEAR(tblcart_purchase.xTimestamp) as Year,(select sum(Amount) from tblcart_purchase where MONTH(xTimestamp)=? and Year(xTimestamp)=?) as Total')->whereRaw('MONTH(xTimestamp)=?')->whereRaw('Year(xTimestamp)=?')->setBindings([$Month,$Year,$Month,$Year])->get();

        if (count($result)==0) {
            return 'no-results';
        } else {
            return $result;
        }
    }

    public function getUserProfile(Request $request){

        //Done Refactor
      
        if ($request->getMethod()=='OPTIONS') { return; };

        //$UserID = $request->input('UserID');

        
        $user = Profile::where('UserID', $request->only('UserID'))->get();
        
       // $result = \DB::connection()->select('select * from tbluser where UserID=?',[$UserID]);
    
        return $user;
    
    }

    public function editProfile(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };

        $FirstName = $request->input('FirstName');
        $LastName = $request->input('LastName');
        $MobileNo = $request->input('MobileNo');
        $PhoneNo = $request->input('PhoneNo');
        $Email = $request->input('Email');
        $UserID = $request->input('UserID');

        

        $result = Profile::where('UserID',$UserID)->get();
        
        
        if ($result->count()==0) { 
            $Profile = new Profile;
            $Profile->UserID = $UserID;
            $Profile->save();
         
           
        }

 

        Profile::where('UserID', $UserID)
        ->update(['FirstName' => $FirstName ,'LastName'=>$LastName,'ContactNo' => $MobileNo ,'PhoneNo'=>$PhoneNo,
        'Email' => $Email]);
       
        return 'success';
    }

    public function editBookPriceEQS(Request $request){
       
        if ($request->getMethod()=='OPTIONS') { return; };
        
        $price = $request->input('Price');
        $apiID = $request->input('apiID');
       

        $result = \DB::connection()->update('update tblbooks set Price=? where ApiID=?',[$price,$apiID]);
        
        
        return $result;
    }

    public function getPriceEQS(Request $request) {

        if ($request->getMethod()=='OPTIONS') { return; };
        $apiID =  $request->input('apiID');
       
        $result = Book::where('ApiID', $apiID)->get();

        return $result[0];

    }

    public function getLibraryListEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $UserID = $request->input('UserID');
        $result = Library::where('tbllibrary.UserID',$UserID)->get();

        return $result;
    }

    public function addCartEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $apiID = $request->input('apiID');
        $UserID = $request->input('UserID');
        $BookCount = Book::where('tblbooks.ApiID',$apiID)->count();
    
        if ($BookCount==0) {
            return 'price_not_set';
        };

        $BookID = Book::where('tblbooks.ApiID',$apiID)->select('tblbooks.BookID')->get();

        $Cart = new Cart;
        $Cart->BookID = $BookID[0]->BookID;
        $Cart->Status = 'pending';
        $Cart->UserID = $UserID;
        $Cart->save();

        return 'success';
    }

}
