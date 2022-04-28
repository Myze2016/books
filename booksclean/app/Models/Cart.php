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
        return $this->hasOne(CartPurchase::class);
    }
}
