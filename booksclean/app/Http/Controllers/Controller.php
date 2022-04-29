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

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token,authorization,Origin,x-csrf-token,csrf-token, accept');


class Controller extends BaseController {
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function loginEQS(Request $request) {
        if ($request->getMethod()=='OPTIONS') { return; };
        if (!Auth::attempt($request->only('email', 'password'))) { return '401'; } 

        $user = User::where('email', $request->only('email'))->first();
        $token = $user->createToken('auth_token')->plainTextToken;
        
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'UserID' => $user->id
        ]);
    }

    public function registerEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        
        $Username = $request->input('Username');
        $Password = $request->input('Password');
        $Email = $request->input('Email');

        $user = User::create([
            'name' => $Username,
            'password' => Hash::make($Password),
            'email' => $Email
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    
    

    


    

    public function getBooks(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        
        // $book_array = array();
        // $book_object = [
        //     'Name' => 'Flowers and their associations',
        //     'LibraryUserID' => 1,
        //     'apiID' => 'ktkDAAAAQAAJ',
        //     'Title' => 'Flowers and their associations',
        //     'PublishDate' => '1840'
        // ];
        // array_push($book_array,$book_object);
        
        // $book_json = json_decode(json_encode($book_array));
        // return $book_json;

        $url = "https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=AIzaSyDQgUAR7b4eukfyzx5bgEn774CGCp7aNT0&maxResults=12&startIndex=1";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response = curl_exec($ch);
        curl_close($ch);
        $response_a = json_decode($response);

      

        return $response_a->items;
    }

  

    public function getLibraryItemEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $LibraryID = $request->input('LibraryID');
    
        $Library = Library::where('LibraryID',$LibraryID)->get();
      
        return $Library[0];
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

    public function getProfileEQS(Request $request){

        //Done Refactor
      
        if ($request->getMethod()=='OPTIONS') { return; };

        //$UserID = $request->input('UserID');

        
        $user = User::where('id', $request->only('UserID'))->get();
        
       // $result = \DB::connection()->select('select * from tbluser where UserID=?',[$UserID]);
    
        return $user[0];
    
    }

    public function getUserProfile(Request $request){

        //Done Refactor
      
        if ($request->getMethod()=='OPTIONS') { return; };

        //$UserID = $request->input('UserID');

        
        $user = Profile::where('UserID', $request->only('UserID'))->get();
        
       // $result = \DB::connection()->select('select * from tbluser where UserID=?',[$UserID]);
    
        return $user;
    
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
   

    public function getBook(Request $request) {
        if ($request->getMethod()=='OPTIONS') { return; };
        
        $apiID =  $request->input('apiID');
    
        $url = "https://www.googleapis.com/books/v1/volumes/$apiID?key=AIzaSyDQgUAR7b4eukfyzx5bgEn774CGCp7aNT0&maxResults=1&startIndex=1";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response = curl_exec($ch);
        curl_close($ch);
        $response_json = json_decode($response);
 
        $bookInformation = [
            'apiID' => $response_json->id,
            'Title' => $response_json->volumeInfo->title,
            'PublishDate' =>  $response_json->volumeInfo->publishedDate,
            'Authors' =>  $response_json->volumeInfo->authors,
            'img' =>  $response_json->volumeInfo->imageLinks->thumbnail
        ];
        
         return $bookInformation;
    }


    public function getCartItemEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };

        $CartID = $request->input('CartID');

        $result = Cart::leftjoin('tblcart_purchase', 'tblcart_purchase.CartID','=','tblcart.CartID')->leftjoin('tblbooks', 'tblbooks.BookID','=','tblcart.BookID')->where('tblcart.CartID','=',$CartID)->select('tblcart.CartID','tblbooks.Price','tblcart_purchase.Amount','tblbooks.Name','tblbooks.ApiID','tblbooks.Description')->get();

        return $result[0];
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

    public function searchBook(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $search = $request->input('search');
       
        // Note Error upon entry of space ex. Sherlock Holmes vs SherlockHolmes

        $url = "https://www.googleapis.com/books/v1/volumes?q=$search&filter=free-ebooks&key=AIzaSyDQgUAR7b4eukfyzx5bgEn774CGCp7aNT0&maxResults=12&startIndex=1";
 
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response = curl_exec($ch);
        curl_close($ch);
        $response_a = json_decode($response);
        
        return $response_a->items; 
    }


    public function getLibraryListEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $UserID = $request->input('UserID');
        $result = Library::where('tbllibrary.UserID',$UserID)->get();

        return $result;
    }


    public function editLibraryEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };

        $LibraryID = $request->input('LibraryID');
        $Title = $request->input('Title');
        $Description = $request->input('Description');

        Library::where('LibraryID', $LibraryID)
        ->update(['Title' => $Title ,'Description'=>$Description]);

        return 'success';
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

    public function addLibraryEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };

        $Title = $request->input('Title');
        $Description = $request->input('Description');
        $UserID = $request->input('UserID');

        $Library = new Library;
        $Library->Title = $Title;
        $Library->Description = $Description;
        $Library->UserID = $UserID;
        $Library->save();
     
        return 'success';
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

    

    public function addBookEQS(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };

        $libraryID = $request->input('LibraryID');
        $publishDate = $request->input('PublishDate');
        $title = $request->input('Title');
        $apiID = $request->input('apiID');
        $BookCount = Book::where('tblbooks.ApiID',$apiID)->count();

        if ($BookCount==0) { 
            $Book = new Book;
            $Book->Name = $title;
            $Book->Description = $publishDate;
            $Book->Price = 0.00;
            $Book->ApiID = $apiID;
            $Book->RegisterFlag = 0;
            $Book->save();
        }

        $BookID = Book::where('tblbooks.ApiID',$apiID)->select('tblbooks.BookID')->get();
        
        $LibraryDetail = new LibraryDetail;
        $LibraryDetail->LibraryID = $libraryID;
        $LibraryDetail->BookID = $BookID[0]->BookID;
        $LibraryDetail->save();

        return  'success';
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

   
    //Testing
    public function getToken(Request $request){
        $token = $request->session()->token();
        $token = csrf_token();
        return $token;
    }

    public function ModelTesting(Request $request){

        $Month = '4';
        $Year = '2022';
        $report = CartPurchase::with('cart.cartBook','cart.cartUser')->select('*')->selectRaw('MONTH(tblcart_purchase.xTimestamp) as Month,YEAR(tblcart_purchase.xTimestamp) as Year,(select sum(Amount) from tblcart_purchase where MONTH(xTimestamp)=? and Year(xTimestamp)=?) as Total')->whereRaw('MONTH(xTimestamp)=?')->whereRaw('Year(xTimestamp)=?')->setBindings([$Month,$Year,$Month,$Year])->get();

        
        return $report;
    }
    
    

}
