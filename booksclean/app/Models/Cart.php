<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'tblcart';
    protected $primaryKey = 'CartID';

    public function cartPurchase()
    {
        return $this->hasOne(CartPurchase::class,'CartID','CartID');
    }

    public function cartBook()
    {
        return $this->hasOne(Book::class, 'BookID', 'BookID');
    }

    public function cartUser()
    {
        return $this->hasOne(User::class, 'id', 'UserID');
    }
}
