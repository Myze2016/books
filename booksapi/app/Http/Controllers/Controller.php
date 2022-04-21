<?php

namespace App\Http\Controllers;
header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization, Origin,x-csrf-token');
header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With');
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;



class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
    }

    public function getUser(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $result = \DB::connection()->select('select * from tbluser');
        return $result;
    }

    public function login(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $Username = $request->input('Username');
        $Password = $request->input('Password');
        $result = \DB::connection()->select('select * from tbluser where Username=? and Password=?',[$Username,$Password]);
        return $result;
    }

    public function searchBook(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $search = $request->input('search');
       
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
        // Note Error upon entry of space ex. Sherlock Holmes vs SherlockHolmes
        $apiKey = '01';
        $url = "https://www.googleapis.com/books/v1/volumes?q=$search&filter=free-ebooks&key=$apiKey&maxResults=5&startIndex=1";
 
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

    public function getLibraryList(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $result = \DB::connection()->select('select * from tbllibrary');
        return $result;
    }


    public function addBook(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $libraryID = $request->input('LibraryID');
        $publishDate = $request->input('PublishDate');
        $title = $request->input('Title');
        $apiID = $request->input('apiID');

        
        $result = \DB::connection()->select('select count(BookID) as count from tblbooks where ApiID=?',[$apiID]);
        if ($result[0]->count==0) {
            $result = \DB::connection()->insert('insert into tblbooks (Name, Description,Price,ApiID,RegisterFlag) values (?, ?, ?, ?, ?)', [$title, $publishDate, 0.00, $apiID,0]);    
        }

        $result = \DB::connection()->insert('insert into tbllibrary_detail (LibraryID, BookID) select ?,BookID
        from tblbooks where ApiID=?', [$libraryID, $apiID]);
        return  $result;
    }

    public function addBookPrice(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        
        $publishDate = $request->input('PublishDate');
        $title = $request->input('Title');
        $apiID = $request->input('apiID');

        
        $result = \DB::connection()->select('select count(BookID) as count from tblbooks where ApiID=?',[$apiID]);
        if ($result[0]->count==0) {
            $result = \DB::connection()->insert('insert into tblbooks (Name, Description,Price,ApiID,RegisterFlag) values (?, ?, ?, ?, ?)', [$title, $publishDate, 0.00, $apiID,0]);    
        }

        return $result;

        
    }

    public function addCart(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $apiID = $request->input('apiID');

        $result = \DB::connection()->insert('insert into tblcart (BookID, Status) select BookID,"Pending" from tblbooks where ApiID=?', [$apiID]);
        #return $users;
        return $result;
   }

   public function getCart(Request $request){

    //Done Refactor
    if ($request->getMethod()=='OPTIONS') { return; };
    $result = \DB::connection()->select('select a.CartID,b.ApiID,b.Name,b.Price,(if(c.Amount=b.Price OR c.Amount>b.Price,"done","pending")) as Purchase from tblcart a inner join tblbooks b on a.BookID=b.BookID left join tblcart_purchase c on c.CartID=a.CartID;');

    return $result;

}

}
