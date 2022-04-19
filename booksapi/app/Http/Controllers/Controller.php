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
}
