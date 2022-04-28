<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LibraryDetail extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'tbllibrary_detail';
    protected $primaryKey = 'LibraryUserID';
    public function library()
    {
        return $this->belongsTo(Library::class, 'LibraryID', 'LibraryID');
    }

    public function book()
    {
        return $this->hasOne(Book::class, 'BookID', 'BookID');
    }
}
