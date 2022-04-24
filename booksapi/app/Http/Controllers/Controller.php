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

        $url = "https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=$apiKey_2&maxResults=5&startIndex=1";
        
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

    public function getLibraryItem(Request $request){
        $LibraryID = $request->input('LibraryID');
        $result = \DB::connection()->select('select * from tbllibrary where LibraryID=?',[$LibraryID]);
      
        #return $users;
        return $result;
    }

    public function editBookPrice(Request $request){
       
        if ($request->getMethod()=='OPTIONS') { return; };
        
        $price = $request->input('Price');
        $apiID = $request->input('apiID');
       

        $result = \DB::connection()->update('update tblbooks set Price=? where ApiID=?',[$price,$apiID]);
        
        
        return $result;
    }

    public function getPrice(Request $request) {

        if ($request->getMethod()=='OPTIONS') { return; };
        $apiID =  $request->input('apiID');
        $bookInformation = \DB::connection()->select('select * from tblbooks where ApiID=?',[$apiID]);
        

        return $bookInformation;
    }


   

    public function getBook(Request $request) {
        if ($request->getMethod()=='OPTIONS') { return; };
        // $apiID =  $request->input('apiID');
        // $bookInformation = [
        //     'apiID' => $apiID,
        //     'Title' => 'Flowers and their associations',
        //     'PublishDate' =>  '1840',
        //     'Authors' =>  ["Anne Pratt"]
        // ];
        
        // $book_json = json_decode(json_encode($bookInformation));

        // return $book_json;

        $apiID =  $request->input('apiID');
        
     
        $url = "https://www.googleapis.com/books/v1/volumes/$apiID?key=$apiKey_2&maxResults=1&startIndex=1";
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
            'Authors' =>  $response_json->volumeInfo->authors
        ];
        



        return $bookInformation;
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

    public function getPurchase(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $result = \DB::connection()->select('select a.Amount,b.CartID,a.*,b.*,c.*,MONTH(a.xTimestamp) as Month,YEAR(a.xTimestamp) as Year,(if(a.Amount=c.Price OR a.Amount>c.Price,"done","pending")) as Purchase,(select sum(Amount) from tblcart_purchase) as total from tblcart_purchase a inner join tblcart b on a.CartID=b.CartID inner join tblbooks c on c.BookID=b.BookID');
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
        $url = "https://www.googleapis.com/books/v1/volumes?q=$search&filter=free-ebooks&key=$apiKey_2&maxResults=5&startIndex=1";
 
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

    public function editLibrary(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $LibraryID = $request->input('LibraryID');
        $Title = $request->input('Title');
        $Description = $request->input('Description');

     
        $result = \DB::connection()->select('update tbllibrary set Title=?,Description=? where LibraryID=?',[$Title,$Description,$LibraryID]);

        return $result;
    }

    public function addLibrary(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $Title = $request->input('Title');
        $Description = $request->input('Description');
     
        $result = \DB::connection()->insert('insert into tbllibrary (Title, Description) values (?, ?)', [$Title, $Description]);
        #return $users;
        return $result;
    }

    public function purchase(Request $request){
        //Done Refactor
        if ($request->getMethod()=='OPTIONS') { return; };

        $CartID = $request->input('CartID');
        $Amount = $request->input('Amount');
        $library = \DB::connection()->update('insert into tblcart_purchase (CartID, Amount) values (?,?)', [$CartID,$Amount]);
        return $library;
    }

    public function searchPurchase(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $Month = $request->input('month');
        $Year = $request->input('year');

        $Month = '05';
        $Year = '2022';
      
        $result = \DB::connection()->select('select a.Amount,b.CartID,a.*,b.*,c.*,MONTH(a.xTimestamp) as Month,YEAR(a.xTimestamp) as Year,(if(a.Amount=c.Price OR a.Amount>c.Price,"done","pending")) as Purchase,(select sum(Amount) from tblcart_purchase f where MONTH(f.xTimestamp)=? and Year(f.xTimestamp)=?) as total from tblcart_purchase a inner join tblcart b on a.CartID=b.CartID inner join tblbooks c on c.BookID=b.BookID where MONTH(a.xTimestamp)=? and Year(a.xTimestamp)=?',[$Month,$Year,$Month,$Year]);

        if (count($result)==0) {
            return 'no-results';
        }else {
            return $result;
        }
        
    }

    public function getCartItem(Request $request){

        //Done Refactor
        if ($request->getMethod()=='OPTIONS') { return; };
        $CartID = $request->input('CartID');
        $result = \DB::connection()->select('select * from tblcart a inner join tblbooks b on a.BookID=b.BookID where CartID=?',[$CartID]);
        return $result;
     }

    public function getLibrary(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $response_array = array();
        $result = \DB::connection()->select('select * from tbllibrary');
        $libraries = json_decode(json_encode($result), true);

        
        //temporary
        // $book_array = array();
        // $book_object = [
        //     'Name' => 'Flowers and their associations',
        //     'LibraryUserID' => 1,
        //     'apiID' => 'ktkDAAAAQAAJ',
        //     'Title' => 'Flowers and their associations',
        //     'PublishDate' => '1840'
        // ];
        // array_push($book_array,$book_object);
        // $library_object =[
        //     'LibraryID' => 1,
        //     'Title' => 'Republic',
        //     'Description' => 'Republic Testing',
        //     'Books' => $book_array
        // ];
        // array_push($response_array,$library_object);
        
        // $response = json_decode(json_encode($response_array));
        // return $response;
        
        foreach($libraries as $library) {
            $result = \DB::connection()->select('select * from tbllibrary_detail a inner join tblbooks b on a.BookID=b.BookID where LibraryID=?',[$library['LibraryID']]);
            $books = json_decode(json_encode($result), true);
            
            $book_array = array();
            foreach($books as $book) {
                $ApiID = $book['ApiID'];
                $url = "https://www.googleapis.com/books/v1/volumes/$ApiID?key=$apiKey_2&maxResults=1&startIndex=1";
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
                $response = curl_exec($ch);
                curl_close($ch);
                $response_a = json_decode($response);
                
                $book_object = [
                    'Name' => $book['Name'],
                    'LibraryUserID' => $book['LibraryUserID'],
                    'apiID' => $response_a->id,
                    'Title' => $response_a->volumeInfo->title,
                    'PublishDate' => $response_a->volumeInfo->publishedDate
                ];

               

                array_push($book_array,$book_object);
            }

            $library_object =[
                'LibraryID' => $library['LibraryID'],
                'Title' => $library['Title'],
                'Description' => $library['Description'],
                'Books' => $book_array
            ];
            array_push($response_array,$library_object);
           
            
        }


        $response = json_decode(json_encode($response_array));
        return $response;

    }

    public function deleteBook(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $LibraryUserID = $request->input('LibraryUserID');
        
        $result = \DB::connection()->select('delete from tbllibrary_detail where LibraryUserID=?',[$LibraryUserID]);
        return $result;
    }

    public function deleteLibrary(Request $request){
        if ($request->getMethod()=='OPTIONS') { return; };
        $LibraryID = $request->input('LibraryID');

        $result = \DB::connection()->select('delete from tbllibrary_detail where LibraryID=?',[$LibraryID]);
        $result = \DB::connection()->select('delete from tbllibrary where LibraryID=?',[$LibraryID]);

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



        $result = \DB::connection()->select('select count(BookID) as count from tblbooks where ApiID=?',[$apiID]);
        if ($result[0]->count==0) {
            return 'price_not_set';
                
        };

        $result = \DB::connection()->insert('insert into tblcart (BookID, Status) select BookID,"Pending" from tblbooks where ApiID=?', [$apiID]);
        #return $users;
        return 'success';
   }

   public function getCart(Request $request){

    //Done Refactor
    if ($request->getMethod()=='OPTIONS') { return; };
    $result = \DB::connection()->select('select a.CartID,b.ApiID,b.Name,b.Price,(if(c.Amount=b.Price OR c.Amount>b.Price,"done","pending")) as Purchase from tblcart a inner join tblbooks b on a.BookID=b.BookID left join tblcart_purchase c on c.CartID=a.CartID;');

    return $result;

    }

    public function getProfile(Request $request){

        //Done Refactor
      
        if ($request->getMethod()=='OPTIONS') { return; };

        $UserID = $request->input('UserID');
        
        $result = \DB::connection()->select('select * from tbluser where UserID=?',[$UserID]);
    
        return $result;
    
    }

}
