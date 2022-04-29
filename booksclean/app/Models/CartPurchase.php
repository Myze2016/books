<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartPurchase extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'tblcart_purchase';
    protected $primaryKey = 'CartPurchaseID';

    public function user() {
        return $this->belongsTo('App\Models\Cart');
    }

    public function cart()
    {
        return $this->hasOne(Cart::class,'CartID','CartID');
    }
    

}
